const express = require("express");
const router = express.Router();

// Controllers
const { register__POST } = require("../../controllers/userAuthController");

router.post("/", register__POST);

module.exports = router;
