import React, { useEffect, useRef, useState } from 'react'
import api from '../../axios/userInterceptor'
import { useSelector } from 'react-redux'
import { Clock, MoreHorizontal, Thermometer } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const PostedJob = () => {
    const user = useSelector(state => state.presisted.user);
    const [jobs,setJobs] = useState([]);
    const [showOptions, setShowOptions] = useState(-1)
    const showOptionRef = useRef();
    const navigate = useNavigate()
    useEffect(()=>{
        const getJobPosts = async ()=>{
            const response = await api.get(`/job/getPostedJobs/${user.uid}`)
            setJobs(response.data)
        }
        getJobPosts()

        const handleOutSideClick = (e)=>{
            if(showOptionRef.current && !showOptionRef.current.contains(e.target)){
                setShowOptions(-1)
            }
        }
        document.addEventListener('mousedown',handleOutSideClick);
        return ()=> document.removeEventListener('mousedown',handleOutSideClick);
    },[]);
    const showMoreOptions = (ind)=>{
        setShowOptions(ind)
    }
    const deletePost = async (id)=>{
        const response = await api.delete(`/job/delete/${id}`)
        setJobs(state => state.filter(item => item._id !== id))
    }
    const navigateToJob = (index,id)=>{
      navigate(`/job/view-application/${id}`,{state:{job:jobs[index]}})
    }

    if(jobs.length < 1){
      return(
        <div className="p-4 max-w-4xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">No Job posted yet ,<Link to='/job/create-job' >post one in a minute</Link></h1>
        </div>
        </div>
      )
    }
  return (
    <div className='p-6'>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Posted jobs({jobs.length})</h1>
        {/* <div className="text-purple-600 cursor-pointer">Sort by newly added</div> */}
      </div>
      
      {/* <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 pl-10 border border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
        //   onChange={handleSearch}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div> */}

      <div className="space-y-4">
        {jobs?.map((job,ind) => (
          <div key={job._id}  className="flex  justify-between bg-white p-4 rounded-lg shadow">
            <div className="flex items-center" onClick={()=>navigateToJob(ind,job._id)}>
              {/* <img src={`https://placekitten.com/100/100?image=${connection.id}`} alt={connection.name} className="w-16 h-16 rounded-full mr-4" /> */}
              <div>
                <h2 className="font-bold">{job.title}</h2>
                <p className="text-sm text-gray-600">{job.company}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                    
                  <span>Location: {job.location}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock size={12} className="mr-1" />
                    <span>Created at {new Date(job.createdAt).toLocaleDateString([],{year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}</span>
                </div>
              </div>
            </div>
            <div className='flex '>
                <MoreHorizontal onClick={()=>showMoreOptions(ind)}/>
            </div>
            {showOptions === ind && (
                <div ref={showOptionRef} className='absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                    <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
                        <>
                        {/* <button onClick={managePost} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left' role='menuitem'>Hide Post</button> */}
                        <button onClick={()=>deletePost(job._id)} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left' role='menuitem'>Delete Post</button>
                        </>
                    </div>
                </div>
                )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostedJob
