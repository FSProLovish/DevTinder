const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://NamasteNode:1k074JbjhVxhqDC6@namastenode.vbxon.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
