import express from 'express';
import auth from "./Routes/authRouter.js";
import user from "./Routes/userRouter.js";
import admin from "./Routes/adminRouter.js";
import comment from "./Routes/commentRouter.js";
import post from "./Routes/postRouter.js";
import chat from "./Routes/chatRouter.js";
import connection from "./Routes/connection.js";
import education from "./Routes/educationRouter.js"
import profile from './Routes/profileResume.js'
import job from './Routes/jobRouter.js';
import notification from './Routes/notification.js'
import access from "./middleware/accessToken.js"


const router = express.Router();

router.use("/", auth);
router.use("/admin", admin);
router.use("/",access, user);
router.use("/chat",access, chat);
router.use("/post",access, post);
router.use("/comment",access, comment);
router.use("/connection",access, connection);
router.use('/education',access, education);
router.use('/profile',access, profile);
router.use('/job',access, job);
router.use("/notification", access, notification);

export default router;
