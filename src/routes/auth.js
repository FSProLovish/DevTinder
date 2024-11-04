const express = require("express");
const router = express.Router();
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

// POST - User `signup` API
router.post("/signup", async (req, res) => {
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
router.post("/login", async (req, res) => {
  try {
    // request body
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      res.status(404).send("Invalid Credentials!");
    } else {
      const isPasswordValid = await user.validatePassword(password);
      if (isPasswordValid) {
        // create a JWT token
        const token = await user.getJWT();

        // add the token to the cookie
        res.cookie("token", token);
        res.status(200).send("Login Successful!");
      } else {
        res.status(400).send("Invalid Credentials!");
      }
    }
  } catch (err) {
    res.status(400).send("Error login the user:" + err.message);
  }
});

// POST - User `logout` API
router.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!");
});

module.exports = router;
