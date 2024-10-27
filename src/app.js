const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

// POST - User `signup` API
app.post("/signup", async (req, res) => {
  try {
    // validating the data
    validateSignUpData(req);

    // request body
    const { firstName, lastName, emailId, password } = req.body;

    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating a new instance of the `user` model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    // saving the user
    await user.save();

    res.status(201).send("User is created successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

// POST - User `login` API
app.post("/login", async (req, res) => {
  try {
    // request body
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      res.status(404).send("Invalid Credentials!");
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).send("Invalid Credentials!");
      } else {
        res.status(200).send("Login Successful!");
      }
    }
  } catch (err) {
    res.status(400).send("Error login the user:" + err.message);
  }
});

// GET - get user by email
app.get("/user", async (req, res) => {
  const email = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: email });
    res.send(user);
  } catch (err) {
    res.status(400).send("Error getting the user by email:" + err.message);
  }
});

// GET - get all the users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Error getting the users:" + err.message);
  }
});

// DELETE - delete the user
app.delete("/user/:id", async (req, res) => {
  const { id: userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting the user:" + err.message);
  }
});

// PATCH - update the user
app.patch("/user/:id", async (req, res) => {
  const { id: userId } = req.params;
  try {
    await User.findByIdAndUpdate(userId, req.body, {
      runValidators: true,
    });
    res.send("User updated successfully.");
  } catch (err) {
    res.status(400).send("Error updating the user:" + err.message);
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
