const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastenode:lVEX96TH3dN4OSIU@namastenode.vbxon.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
