const express = require("express");
const chats = require("./data/data");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const Port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (res, req) => {
  //   console.log(req.params.id);
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

app.listen(Port, console.log(`Server is Running on Port ${Port}`));
