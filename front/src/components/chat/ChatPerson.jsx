import React from 'react'
import { aws_url } from '../../../const/url';
import { Image } from 'lucide-react';

const ChatPerson = ({ name,sender, lastMessage, time, avatar,contentType,isNotpresentInChat }) =>{
  if(!avatar?.startsWith("http")) {
    avatar = aws_url+avatar
  }
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    if(diffDays < 1){
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, })
    }else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      const options = { weekday: 'long' };
      return date.toLocaleDateString(undefined, options);
    } else if (date.getFullYear() === now.getFullYear()) {
      const options = { month: 'short', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    } else {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    }
  }
  if(!lastMessage) return 
  return (
    <div className="flex items-center p-3 hover:bg-gray-100">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4" />
      <div className="flex-grow">
        <h3 className="font-semibold">{name}</h3>
        {isNotpresentInChat ? <div>typing....</div> :
        (<>{ lastMessage &&  <div className="text-sm text-gray-500">{sender?.split(' ')[0]} : {contentType === 'text' ? lastMessage : '📸'}<span></span></div>}</>)} 
        
      </div>
      {time && <span className="text-xs text-gray-400">{formatTimestamp(time)}</span>}
    </div>
  );
}

export default ChatPerson
