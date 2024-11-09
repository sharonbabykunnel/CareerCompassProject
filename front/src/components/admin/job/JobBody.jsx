import React, { useEffect, useState } from 'react'
import api from '../../../axios/userInterceptor'
import { useNavigate } from 'react-router-dom'

const JobBody = () => {
    const navigate = useNavigate()
    const [jobs,setJobs] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await api.get(`/job/getJobs`);
            setJobs(response.data)
        }
        fetchData();
    },[])

    const navigateToJob = (index)=>{
      navigate('/admin/job',{state:{job:jobs[index]}})
    }
  return (
    <div className="users-management bg-lavender-100 p-6 rounded-lg shadow-md  h-[80vh] flex flex-col ">
      <div className="header mb-6">
        <h1 className='text-2xl font-semibold text-gray-800'>Job Management</h1>
      </div>
      <div className="table-container bg-white rounded-lg scrollbar-hide flex-grow overflow-scroll">
        <table className='w-full '>
          <thead className="bg-lavender-200">
            <tr className='text-left'>
              <th className="py-3 px-4">Position</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Post date</th>
              <th className="py-3 px-4">status</th>
              <th className="py-3 px-4">Option</th>
            </tr>
          </thead>
          <tbody className=''>
            {Array.isArray(jobs) && jobs.map((job,index) => (
              <tr key={job._id} onClick={()=>navigateToJob(index)} className='border-b border-lavender-100 hover:bg-lavender-50'>
                <td className='py-3 px-4 flex items-center'>
                    <div>{job.title}</div>
                </td>
                <td className='py-3 px-4'>{job.user.name}</td>
                <td className='py-3 px-4'>{new Date(job.createdAt).toLocaleDateString()}</td>
                <td className='py-3 px-4'>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${job?.role === 'Candidate' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                    Unblocked
                  </span>
                </td>
                <td className='py-3 px-4'>
                  <button className="text-gray-500 hover:text-gray-700">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="mt-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          New posts
        </button>
      </div> */}
    </div>
  )
}

export default JobBody
