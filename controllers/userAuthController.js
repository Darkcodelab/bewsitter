const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const sendError = require("../utils/sendError");
const jwt = require("jsonwebtoken");

// @route /auth/login
// @method POST
// @access public
const login__POST = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;
  email = email && email.trim();
  password = email && password.trim();
  if (!email || !password) {
    sendError(400, "Please provide email and password", req, res);
  }
  let user = await User.findOne({ email: email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET_TOKEN, {
          expiresIn: "30d",
        }),
      },
    });
  } else {
    sendError(400, "Invalid Credentials", req, res);
  }
});

// @route /auth/register
// @method POST
// @access public
const register__POST = asyncHandler(async (req, res, next) => {
  let { name, email, password } = req.body;
  name = name && name.trim();
  email = email && email.trim();
  password = password && password.trim();
  if (!email || !password || !name) {
    sendError(
      400,
      "Please provide all these fields: name, email and password",
      req,
      res
    );
  }
  // Check - if user already exists
  let userExists = await User.findOne({ email: email });
  if (userExists) {
    sendError(422, "User already exists", req, res);
  }
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);
  let userObj = {
    name,
    email,
    password: hashedPassword,
  };

  let newUser = await User.create(userObj);
  if (newUser) {
    res.status(200);
    res.json({
      success: true,
      user: {
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
      },
    });
  } else {
    sendError(500, "User not registered", req, res);
  }
});

module.exports = {
  login__POST,
  register__POST,
};
