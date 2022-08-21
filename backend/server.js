const express = require("express");
const chats = require("./data/data");
const app = express();
const colors = require("colors");
const userRoutes = require("./Routes/userRoutes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

app.use(express.json());

dotenv.config();
connectDB();

// ! If you want colorful terminal install
// ! npm i colors
// ! and you can apply by using . notation

const Port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is Running");
});

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   const singleChat = chats.find((c) => c._id == req.params.id);
//   res.send(singleChat);
// });

app.use("/api/user", userRoutes);

app.listen(Port, console.log(`Server is Running on Port ${Port}`.yellow.bold));
