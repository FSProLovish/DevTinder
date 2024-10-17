const userAuth = (req, res, next) => {
  console.log("User Auth Middleware");
  const { token } = req.query;
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

module.exports = {
  userAuth,
};
