import express from 'express';
import Notification from './../Controllers/notificationController.js'

const router = express.Router();

router.post('/post/chat/:uid', Notification.uploadChat);
router.get('/get/:uid', Notification.getNotification);
router.get('/get/unreaded/:uid',Notification.getUnreadedNotification)

export default router