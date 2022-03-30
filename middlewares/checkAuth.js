const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const sendError = require("../../utils/sendError");

async function checkAuth(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    if (decoded && decoded.id) {
      let user = await User.findById(decoded.id).select("-password");
      if (user) {
        req.user = user;
        next();
        return;
      }
    }
  } else {
    sendError(401, "Invalid Token", req, res);
  }
}

module.exports = checkAuth;
