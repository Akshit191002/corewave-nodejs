const badRequest = require('../errors/badRequest.error');

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  sendOtp = async (req, res) => {
    try {
      const { mobile } = req.body;
      const otp = await this.authService.sendOtp(mobile);
      res.status(200).json({ success: true, message: "OTP sent successfully", otp: otp });
    } catch (err) {
      const status = err.code;
      res.status(status).json({
        success: false,
        message: err.message
      });
    }
  }

  verifyOtp = async (req, res) => {
    try {
      const { mobile, otp } = req.body;
      const result = await this.authService.verifyOtp(mobile, otp);
      res.status(200).json({ success: true, message: "OTP verified successfully", result });
    } catch (err) {
      const status = err.code;
      res.status(status).json({
        success: false,
        message: err.message
      });
    }
  }

  register = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) throw new badRequest("Authorization header missing");

      const token = authHeader.split(" ")[1];

      const decoded = this.authService.verifyToken(token);
      const mobile = decoded.mobile;
      const { email, name } = req.body
      const newtoken = await this.authService.register({ mobile, email, name });
      res.status(201).json({ success: true, message: "successfully created", newtoken });
    } catch (err) {
      const status = err.code;
      res.status(status).json({
        success: false,
        message: err.message
      });
    }
  };

}
module.exports = AuthController;