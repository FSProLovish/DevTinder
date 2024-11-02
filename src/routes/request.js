const express = require("express");
const { userAuth } = require("../middlewares/auth");
const router = express.Router();

router.post("/sendConnectionRequest", userAuth, async (req, res) => {});

module.exports = router;
