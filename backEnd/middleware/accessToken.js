import JWT from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import config from "./../../config.js";

const checkAccessToken = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
    const token = authHeader.split(" ")[1];
    JWT.verify(token, config.access_secret, async (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    throw error;
  }
});

export default checkAccessToken;
