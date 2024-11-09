import React, { useEffect, useState } from 'react'
import JobApplicationOverview from '../../job/JobApplicationOverview';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ArrowBigLeft, BriefcaseBusiness, MapPin, X } from 'lucide-react';

const UniqueJob = () => {
    const [data, setData] = useState(null)
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false)
    const job = location.state.job

    useEffect(()=>{
        const fetchUser = async ()=>{
            // const response = await axios.get(`http://localhost:5000/admin/job/get/${job._id}`)
            // if(response.data) setUser(response.data)
        }
    fetchUser();
    },[])
    const toggleDescription = ()=>{
      setIsExpanded(isExpanded)
    }
  return (
    <div className="bg-white rounded-lg shadow-xl h-full w-full flex flex-col  overflow-y-auto">
      <div className="p-6 flex flex-col flex-grow ">
          <div className='flex-grow'>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Job Details</h2>
          <Link to='/admin/jobs'  className="text-gray-400 hover:text-gray-600">
            <ArrowBigLeft size={24} />
          </Link>
        </div>
        <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <MapPin size={12} className="mr-1" /> {job.location}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {job.jobType}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {job.experienceLevel}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4">at {job.company || '--'}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <BriefcaseBusiness size={16} />
          <span>{job.workplaceType}</span>
        </div>
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">About the Job</h4>
          <p className="text-gray-600 mb-2 ">
                {isExpanded
                  ? job.description
                  : `${job?.description?.slice(0, 100)}`}
                {job.description?.length > 100 && (
                  <button
                    onClick={toggleDescription}
                    className="text-blue-500 ml-2 text-sm"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                )}
              </p>
        </div>
        <div >
                <p className='mb-2'>Skills</p>
              <div className="flex flex-wrap space-x-2 ">
                {job?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-3 py-1 rounded-md  text-gray-700"
                  >
                    {skill.toUpperCase()}
                  </span>
                ))}
              </div>
              </div>
              <div className="flex flex-col  text-sm text-gray-600 mb-4 mt-4">
                <p>Application Starts: {job.createdAt.split("T")[0]}</p>
                <p>Application Ends: {job?.deadline?.split("T")[0]}</p>
                <p>Total applicants: {job?.applications?.length || 0}</p>
              </div>
              </div>
              {/* <div className="mt-auto pt-4 flex justify-end space-x-4">
                <button
                  onClick={() => {
                      navigateToApplications(job._id)
                  }}
                  className="bg-white text-black border border-black py-1 px-7 text-sm rounded-full hover:bg-blue-500 hover:text-white"
                >
                  Show Applicants
                </button>
                    <button
                      onClick={editOption}
                      className="bg-white text-black border border-black py-1 px-7 text-sm rounded-full hover:bg-blue-500 hover:text-white"
                    >
                      Edit 
                    </button>
              </div> */}
      </div>
    </div>
  )
}

export default UniqueJob
