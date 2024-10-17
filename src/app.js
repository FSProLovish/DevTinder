const express = require("express");
const { userAuth } = require("./middlewares/auth");

const app = express();

app.use("/user", userAuth);

app.get("/user", (req, res) => {
  try {
    // res.send({
    //   firstName: "John",
    //   lastName: "Doe",
    // });
    throw new Error("Error");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something Went Wrong");
  }
});

app.post("/user", (req, res) => {
  res.send("User has been created.");
});

app.delete("/user", (req, res) => {
  res.send("User has been deleted.");
});

app.use("/", (err, req, res, next) => {
  console.log("Error Middleware");
  if (err) {
    res.status(500).send("Something Went Wrong");
  }
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777!");
});
