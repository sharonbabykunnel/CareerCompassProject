import React from 'react'
import GroupChat from '../components/chat/GroupChat'
import Header_user from '../components/headers/Header_user'

const GroupScreen = () => {
  return (
    <div className='flex-row'>
        <Header_user/>
        <div className='flex-grow'><GroupChat /></div>
    </div>
  )
}

export default GroupScreen
