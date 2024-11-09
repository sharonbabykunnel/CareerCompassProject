import React from 'react'
import ChatInterface from '../components/chat/ChatInterface'
import Header_user from '../components/headers/Header_user'

const ChatScreen = () => {
  return (
    <div className='flex-row'>
        <Header_user/>
        <div className='flex-grow'><ChatInterface /></div>
    </div>
  )
}

export default ChatScreen
