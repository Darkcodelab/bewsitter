const router = require("express").Router();

// Controllers
const { login__POST } = require("../../controllers/userAuthController");

// Route /login
// Method POST
router.post("/", login__POST);

module.exports = router;
