import Notification from './../models/notificationModel.js'

class NotificationRepository{
    async uploadChat(obj) {
        return await Notification.create(obj)
    }

    async getNotificationByUid(uid) {
        return await Notification.aggregate([
            {
                $match: { sender: uid }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'recipient',
                    foreignField: 'uid',
                    as:'recipient'
                }
            },
            {
                $unwind:'$recipient'
            }
        ])
    }
}

export default new NotificationRepository()