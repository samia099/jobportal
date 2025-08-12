const {
  signup,
  signin,
  getUserById,
  getCurrentUser
} = require("../Controllers/AuthController");
const {
  signupValidation,
  signinValidation,
} = require("../Middlewares/AuthValidation");
const ensureAuthenticated = require("../Middlewares/Auth");
const checkRole = require("../Middlewares/RoleCheck");

const router = require("express").Router();

router.post("/signin", signinValidation, signin);
router.post("/signup", signupValidation, signup);
router.get("/user/:id", ensureAuthenticated, getUserById);
router.get('/current-user', ensureAuthenticated, getCurrentUser);

module.exports = router;