import { MoreHorizontal } from 'lucide-react'
import React from 'react'

const PostNotificationBubble = ({notification,onClick}) => {
  return (
    <div onClick={onClick} key={notification._id} className="bg-white p-4 rounded-lg shadow flex items-start">
    <img src={notification.recipient?.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'} alt={notification.recipient.name} className="h-12 w-12 rounded-full mr-4" />
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{notification.recipient.name}</h3>
          <p className="text-sm text-gray-600">{notification.content}</p>
          <p>{notification?.relatedItem?.content}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500">{new Date(notification?.relatedItem?.createdAt).toDateString()}</span>
          <p className="text-xs text-gray-500">{new Date(notification.relatedItem?.createdAt).toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
    <MoreHorizontal className="text-gray-400 ml-2" size={20} />
  </div>
  )
}

export default PostNotificationBubble
