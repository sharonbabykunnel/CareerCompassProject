import { User } from 'lucide-react';
import React from 'react'

const MessageBubble = ({ content, time, isUser }) => (

    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser &&<User/>}
      <div className={`max-w-xs ${isUser ? 'bg-purple-100' : 'bg-gray-100'} rounded-lg p-3`}>
        <p className="text-sm break-words ">{content}</p>
        <p className="text-xs text-gray-500 mt-1">{new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, })}</p>
      </div>
    </div>
  );

export default MessageBubble
