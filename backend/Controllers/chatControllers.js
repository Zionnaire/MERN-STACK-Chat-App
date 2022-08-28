const expressAsync = require("express-async-handler");
const Chat = require("../Models/chatModel");
const User = require("../Models/userModel");

const accessChat = expressAsync(async (req, res) => {
  // this route is responsible for fetching or creating one on one chat

  //   we are passing for trying user
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId params not sent with request");
    res.status(400);
  }

  // In MongoDB, find() method is used to select documents in a collection and return a cursor to the selected documents. Cursor means a pointer that points to a document, when we use find() method it returns a pointer on the selected documents and returns one by one.

  let isChat = Chat.find({
    // if this gonna  be single chat its gonna be groupChat
    isGroupChat: false,
    $and: [
      // user who is logged in The $elemMatch operator matches documents that contain an array field with at least one element that matches all the specified query criteria.
      { users: { $elemMatch: { $eq: req.user._id } } },
      // user for which we are passing userId MongoDB provides different types of comparison operators and an equality operator($eq) is one of them.
      // The equality operator( $eq ) is used to match the documents where the value of the field is equal to the specified value. In other words, the $eq operator is used to specify the equality condition.
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat);
  }
  //   If Chat is not available new Chat will be created
  else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200);
      res.send(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChat = expressAsync(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      //   -1 -> sort descending
      //   1 sort ascending
      .sort({ updateAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });

        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { accessChat, fetchChat };
