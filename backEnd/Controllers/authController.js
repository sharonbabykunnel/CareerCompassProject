// Import statements
import asyncHandler from 'express-async-handler';
import User from './../repository/userRepository.js';
import sendOtp from './../config/nodemailer.js';
import generateOtp from './../config/otp.js';
import generateToken from './../utils/jwt.js';
import verifyCaptcha from './../utils/verifyCaptcha.js';
import accessToken from './../utils/access_token.js';
import JWT from 'jsonwebtoken';
import config from './../../config.js';
import handleError from './../middleware/errorHandler.js';

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if(user?.isBlocked) return handleError(res,403,'Account Block')
  if (!user) return handleError(res, 404, "User not found");

  const isPasswordValid = await User.verifyPassword(password, user.password);
  if (!isPasswordValid) return handleError(res, 401, "Incorrect password");

  generateToken(res, user.uid);
  res.status(200).json({ user, accessToken: accessToken(user.uid) });
});

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findByEmail(email);
  if (existingUser) return handleError(res, 409, "User already exists");

  const user = await User.createUser(email, password, name);
  if (!user) return handleError(res, 500, "Failed to create user");

  const otp = generateOtp();
  await sendOtp(email, otp);
  res.status(201).json({ user, otp });
});

const verify = asyncHandler(async (req, res) => {
  const { isVerified, captcha, uid } = req.body;
  const isCaptchaValid = await verifyCaptcha(captcha);
  if (!isCaptchaValid) return handleError(res, 400, "Invalid captcha");

  const user = await User.verifyUser(isVerified, uid);
  if (!user) return handleError(res, 500, "User verification failed");

  generateToken(res, user.uid);
  res.status(200).json({ user, accessToken: accessToken(user.uid) });
});

const googleAuth = asyncHandler(async (req, res) => {
  const { displayName, email, emailVerified, photoURL, uid } = req.body;
  let user = await User.findByUid(uid);
  if (user?.isBlocked) return handleError(res, 403, "Account Block");
  if (!user) {
    user = await User.createUserForGoogle(displayName, email, emailVerified, photoURL, uid);
    if (!user) return handleError(res, 500, "Failed to create user");
  }

  generateToken(res, user.uid);
  res.status(200).json({ user, accessToken: accessToken(user.uid) });
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "User logged out" });
});

const resendOTP = asyncHandler(async (req, res) => {
  const { uid } = req.body;
  const user = await User.findByUid(uid);
  if (!user) return handleError(res, 404, "User not found");
  if (user.isVerified) return handleError(res, 409, "User already verified");

  const otp = generateOtp();
  await sendOtp(user.email, otp);
  res.status(200).json({ message: "OTP sent to your email", otp });
});

const refreshToken = asyncHandler(async (req, res) => {
  try {
    res.status(200).json({ success: true, accessToken: accessToken(req.user.uid) });
  } catch (error) {
    throw error;
  }
});

export default {
  signup,
  signin,
  googleAuth,
  verify,
  resendOTP,
  refreshToken,
  logout,
};
