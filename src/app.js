const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "John",
    lastName: "Doe",
    emailId: "john.doe@yopmail.com",
    password: "Temp#12345678",
    age: 18,
    gender: "male",
  };
  try {
    const user = new User(userObj);
    await user.save();
    res.status(201).send("User is created successfully!");
  } catch (error) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777!");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected.");
  });
