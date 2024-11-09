import React, { useEffect, useState } from 'react';
import { Briefcase, Clock, Building, Phone, Mail } from 'lucide-react';
import api from '../../axios/userInterceptor';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AppliedJobsList = ({ jobs }) => {
  const [applications, setApplications] = useState([]);
  const user = useSelector(state => state.presisted.user)

  useEffect(()=>{
    const getApplication = async ()=>{
      const response = await api.get(`/job/applied/get/${user.uid}`);
      setApplications(response.data)
    }
    getApplication();
  },[])


  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'under review':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if(applications.length < 1){
    return(
      <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">No application found! <Link className='hover:text-blue-500' to='/job'>Apply for quick placement</Link> </h1>
      </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 overflow-scroll scrollbar-hide">
      <h2 className="text-2xl font-bold mb-6">Applied Jobs</h2>
      <div className="space-y-4 ">
        {applications.map((job) => (
          <div key={job._id} className={`${job.status === 'rejected' ? 'bg-red-100' : job.status === 'accepted' ? 'bg-green-100' : 'bg-white' } shadow-md rounded-lg p-6`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{job.job.title}</h3>
                <p className="text-gray-600 flex items-center mt-1">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {job.job.company}
                </p>
              </div>
              {/* <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                View
              </span> */}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p className="flex items-center text-gray-600">
                <Building className="w-4 h-4 mr-2" />
                Status:               
                <span className={`px-3 py-1 ml-2 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                {job.status === 'rejected' ? 'rejected' : job.status === 'active' ? 'waiting' : job.status === 'accepted' && 'scheduled'}
              </span>
              </p>
              <p className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                Applied: {new Date(job.createdAt).toLocaleDateString()} {/* Replace with actual date */}
              </p>
              <p className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {job.email}
              </p>
              <p className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {job.number}
              </p>
            </div>
            {job.status === 'accepted' && job.details &&
            <div className='mt-6'>
              <div className='flex flex-col'>
                <p>scheduled for <span className='text-green-600'>{new Date(job.details.date).toLocaleDateString()}</span></p>
                <p>time : {job.details.time}</p>
                <a href={`https://${job.details.email}`}>If any doubts regardign interview contact on {job.details.email}</a>
              </div>
            </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobsList;