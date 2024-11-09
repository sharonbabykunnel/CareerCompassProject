import React from 'react'
import NotificationInterface from '../components/Notification/NotificationInterface'
import Header_user from '../components/headers/Header_user'

const NotificationScreen = () => {
  return (
    <div className='flex-row'>
        <Header_user/>
        <div className='flex-grow'><NotificationInterface /></div>
    </div>
  )
}

export default NotificationScreen
