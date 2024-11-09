import JWT from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "./../repository/userRepository.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    const { uid } = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByUid(uid);
    next();
  } catch (error) {
    throw error;
  }
});

export default verifyToken;
