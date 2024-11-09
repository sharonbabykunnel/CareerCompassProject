import asyncHandler from 'express-async-handler';
import Notification from './../service/notificationService.js';

const uploadChat = asyncHandler(async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        const response = await Notification.uploadChat(uid,data);
        res.status(200).json(response)
    } catch (error) {
        throw error
    }
});

const getNotification = asyncHandler(async (req, res) => {
    try {
        const { uid } = req.params;
        const response = await Notification.getNotification(uid);
        res.status(200).json(response)
    } catch (error) {
        throw error
    }
});

const getUnreadedNotification = asyncHandler(async (req, res) => {
    try {
        const { uid } = req.params;
        const response = await Notification.getUnreadedNotification(uid);
        res.status(200).json(response)
    } catch (error) {
        throw error
    }
});

export default {
  uploadChat,
  getNotification,
  getUnreadedNotification,
};