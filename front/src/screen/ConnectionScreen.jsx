import React from 'react'
import Header_user from '../components/headers/Header_user'
import ConnectionInterface from '../components/Connections/ConnectionsInterface'

const ConnectionScreen = () => {
  return (
    <div className='flex-row'>
        <Header_user/>
        <div className='flex-grow'><ConnectionInterface /></div>
    </div>
  )
}

export default ConnectionScreen
