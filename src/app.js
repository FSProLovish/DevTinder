const express = require("express");
const { userAuth } = require("./middlewares/auth");

const app = express();

app.use("/user", userAuth);

app.get("/user", (req, res) => {
  res.send({
    firstName: "John",
    lastName: "Doe",
  });
});

app.post("/user", (req, res) => {
  res.send("User has been created.");
});

app.delete("/user", (req, res) => {
  res.send("User has been deleted.");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777!");
});
