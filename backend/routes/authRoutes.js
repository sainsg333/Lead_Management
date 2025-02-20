const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authMiddleware,authController.login);
router.post("/verify-otp", authController.verifyOTP); // Add this line

module.exports = router;
