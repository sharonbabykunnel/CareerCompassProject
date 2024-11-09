import React from 'react'
import Header_user from '../components/headers/Header_user'
import JobInterface from '../components/job/JobInterface'

const JobScreen = () => {
  return (
    <div className='flex-row'>
        <Header_user/>
        <div className='flex-grow'><JobInterface /></div>
    </div>
  )
}

export default JobScreen
