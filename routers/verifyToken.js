const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("acces denied");

  try {
    const verifed = jwt.verify(token, "secret");
    req.user = verifed;
    next();
  } catch (error) {
    res.status(401).send("invalid token");
  }
};
