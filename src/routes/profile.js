const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const {
  validateProfileEditData,
  validatePassword,
} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// GET - User `profile` API
router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// PATCH - Update User `profile` API
router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const user = req.user;
    await User.findByIdAndUpdate(user._id, req.body);
    res.send(
      `${user.firstName} ${user.lastName} - Your Profile is Updated Successfully!`
    );
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// PATCH - Reset User `password` API
router.post("/profile/password", userAuth, async (req, res) => {
  try {
    const { oldPassword: password, newPassword } = req.body;
    const user = req.user;

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Old password doesn't match!");
    }

    // validate new password
    if (!validatePassword(newPassword)) {
      throw new Error("Please enter a strong new Password!");
    }

    // encrypt the new password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(user._id, { password: passwordHash });

    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });

    res.send("Password has been updated successfully. Please Login Again!");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = router;
