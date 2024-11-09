import mongoose from "mongoose";
import NotificationRepository from "../repository/notificationRepository.js";

class NotiService{
    async uploadChat(uid, data) {
        const obj = {
          sender: uid,
          recipient: data.response.sender,
          type: "chat",
          content: 'send you a message',
          itemModel: "message",
          relatedItem: data.response._id,
        };
        const response = await NotificationRepository.uploadChat(obj);
        return response
    }

    async getNotification(uid) {
        const notifications = await NotificationRepository.getNotificationByUid(uid);
        for (let notification of notifications) {
            if (notification.itemModel) {
                const relatedItem = await mongoose.model(notification.itemModel).findById(notification.relatedItem);
                notification.relatedItem = relatedItem;
            }
        }
        return notifications
    }

    async getUnreadedNotification(uid) {
        const notifications = await NotificationRepository.getUnreadedNot(uid);
        return notifications
    }
}

export default new NotiService();