import React from 'react'
import SideChoise from '../Connections/SideChoise'
import jobList from '../../../const/job'
import { Outlet } from 'react-router-dom'

const JobInterface = () => {
  return (
    <div className='flex '>
      <div className='m-4 w-[20vw]'>
      <SideChoise menu={jobList} title='Job'/>
      </div>
    <div className='m-4 bg-lite_user w-[80vw] h-[86vh] rounded'>
      <Outlet />
    </div>
    </div>
  )
}

export default JobInterface
