const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // ! Learn what they actually do?
    });

    console.log(`MongoDB is connected : ${conn.connection.host}`.green.bold);
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

module.exports = connectDB;
