import express from 'express'
import auth from './../Controllers/authController.js'
import authMiddleware from './../middleware/authMiddleware.js'
const rout = express.Router();

rout.post("/signin", auth.signin);
rout.post("/signup", auth.signup);
rout.post("/verify", auth.verify);
rout.post("/resendOTP", auth.resendOTP);
rout.post("/googleSignin", auth.googleAuth);
rout.post("/googleSignup", auth.googleAuth);
rout.get("/refreshToken", authMiddleware, auth.refreshToken);
rout.post("/logout", auth.logout);

export default rout
