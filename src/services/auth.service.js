const conflictError = require("../errors/conflict.error");
const badRequest = require("../errors/badRequest.error");
const notFoundError = require('../errors/notFound.error')
const commonHelper = require("../utils/commonHelper")
const { JWT_TOKEN_SALT } = require('../config/server.config');
const { JWT_EXPIRES } = require('../config/server.config');
const jwt = require("jsonwebtoken");

class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async sendOtp(mobile) {
    try {
      const otp = commonHelper.generateOtp();
      const existing = await this.authRepository.alreadyExists({ mobile: mobile });
      if (!existing) {
        await this.authRepository.createUser({ mobile: mobile, otp: otp });
      }
      await this.authRepository.updateUser({ mobile: mobile }, { otp: otp });
      return otp;
    } catch (err) {
      throw new badRequest(err.message);
    }
  }

  async verifyOtp(mobile, otp) {
    try {
      const user = await this.authRepository.findUserByMobile({ mobile: mobile });
      if (!user) {
        throw new notFoundError('User not found')
      }
      const createToken = jwt.sign({ userId: user._id, mobile: mobile }, JWT_TOKEN_SALT, {
        expiresIn: JWT_EXPIRES
      })
      if (user.isProfileVerified === false && otp === user.otp) {
        await this.authRepository.updateUser({ mobile: mobile }, { isVerified: true })
        return { token: createToken };
      }
      if ((user.isProfileVerified === true && user.isVerified === true) && otp === user.otp) {
        await this.authRepository.updateUser({ mobile: mobile }, { token: createToken });
        return { token: createToken };
      }
      else {
        throw new badRequest("Invalid OTP")
      }
    } catch (err) {
      throw err;
    }
  }

  async register(userData) {
    try {
      const existing = await this.authRepository.alreadyExists({ mobile: userData.mobile, isProfileVerified: true, isVerified: true });
      if (existing) throw new conflictError("User already created");
      const user = await this.authRepository.updateUser({ mobile: userData.mobile }, { email: userData.email, name: userData.name, isProfileVerified: true });
      const createToken = jwt.sign({ userId: user._id }, JWT_TOKEN_SALT, {
        expiresIn: JWT_EXPIRES
      })
      await this.authRepository.updateUser({ mobile: userData.mobile }, { token: createToken })
      
    } catch (err) {
      throw err
    }
  }

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SALT);
      return decoded;
    } catch (err) {
      throw new badRequest(err.message);
            // throw new badRequest("Invalid or expired token");
    }
  }
}
module.exports = AuthService;