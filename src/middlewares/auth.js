const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secretKey = "DEV@TINDER786";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid!!");
    }

    const decodeObj = await jwt.verify(token, secretKey);
    const { _id } = decodeObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

module.exports = {
  userAuth,
};
