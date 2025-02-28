const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    `mongodb+srv://namastenode:${process.env.DB_CONNECTION_SECRET}@namastenode.vbxon.mongodb.net/devTinder`
  );
};

module.exports = connectDB;
