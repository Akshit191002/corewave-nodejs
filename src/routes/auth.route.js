const express = require('express')
const AuthRepository = require('../repositories/auth.repositories.js')
const AuthService = require('../services/auth.service.js')
const AuthController = require('../controllers/auth.controller.js')
const userValidator = require('../validators/user.validator.js')
const router = express.Router();

const authRepository = new AuthRepository()
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);
router.post("/send-otp", userValidator.sendOtp, authController.sendOtp);
router.post("/verify-otp", userValidator.verifyOtp, authController.verifyOtp);

router.post("/profile", userValidator.register, authController.register);

module.exports = router;
