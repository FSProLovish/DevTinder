const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://NamasteNode:LhF9QZVf5wGgrsfo@namastenode.vbxon.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
