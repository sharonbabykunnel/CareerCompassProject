import { MoreVertical, Search, Video } from 'lucide-react'
import React from 'react'

const ChatHeader = ({receiver,call,serachInMessage}) => {
  return (
  <div className="bg-lite_user text-white p-4 flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <img 
        src={receiver?.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'} 
        alt="Profile" 
        className="w-10 h-10 rounded-full object-cover"
      />
      <span className="font-semibold text-lg">{receiver?.name}</span>
    </div>
    <div className="flex items-center space-x-4">
      <button className="text-gray-400 hover:text-white">
        <Video size={20} onClick={()=>call()} />
      </button>
      <button className="text-gray-400 hover:text-white" onClick={serachInMessage}>
        <Search size={20} />
      </button>
      <button className="text-gray-400 hover:text-white">
        <MoreVertical size={20} />
      </button>
    </div>
  </div>
  )
}

export default ChatHeader
