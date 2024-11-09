import React, { useEffect, useState } from 'react';
import { Briefcase, Clock, Building, Phone, Mail, X, ArrowLeft, FileText } from 'lucide-react';
import api from '../../axios/userInterceptor';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import JobApplicationOverview from './JobApplicationOverview';
import Modal from 'react-modal'
import { Success } from '../../helpers/popup';

const Applications = ({ jobs }) => {
  const [applications, setApplications] = useState([]);
  const user = useSelector(state => state.presisted.user);
  const location = useLocation();
  const [applicationData,setApplicationData] = useState(null)
  const {id} = location.state || {}
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [acceptOpen,setAcceptOpen] = useState(false);
  const [newShedule, setNewShedule] = useState(true);
  const [email,setEmail] = useState('');
  const [date,setDate] = useState();
  const [time,setTime] = useState('')

  useEffect(()=>{
    const getApplications = async ()=>{
      const response = await api.get(`/job/applications/get/${id}`);
      setApplications(response.data)
    }
    getApplications();
  },[])

  const getApplication = async (id) =>{
    const response = await api.get(`/job/application/get/${id}`);
    if(response.data[0].details) {
      setEmail(response.data[0].details.email);
      setDate(response.data[0].details.time)
      setTime(response.data[0].details.time)
      setNewShedule(false)
    }
    setApplicationData(response.data[0])
    setIsModalOpen(true)
  }

  const closeModal = ()=>{
    setIsModalOpen(false)
  }

  const reject = async ()=>{
    const response = await api.patch(`/job/application/reject/${applicationData._id}`)
    if (response.data){
      Success('Rejected');
      setIsModalOpen(false)
      setAcceptOpen(false)
      setApplications(state => state.filter(item => item._id !=applicationData._id ));
      setApplicationData(null)
    }
  }

  const acceptAndShedule = async()=>{

    const response = await api.patch(`/job/application/accept/${applicationData._id}`,{date,time,email});
    if(response.data){
        Success('Scheduled');
        setIsModalOpen(false)
        setAcceptOpen(false)
        setApplicationData(null)
    }
  }

  const accept = ()=>{
    setEmail(user?.email)
    setAcceptOpen(true)
  }

  const closeAcceptModal = ()=>{
    setAcceptOpen(false)
  }

  if(applications.length < 1){
    return(
      <div className="p-4 max-w-4xl mx-auto">
      <div className="flex items-center mb-6 gap-2">
        <Link to='/job/posted-jobs'><ArrowLeft className='hover:text-blue-600'/> </Link>
        <h1 className="text-3xl font-bold text-gray-800">No applications yet</h1>
      </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Applications</h2>
      <div className="space-y-4 overflow-scroll scrollbar-hide">
        {applications.map((job) => (
          <div key={job._id}  className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{job.name}</h3>
                <p className="text-gray-600 flex items-center mt-1">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {job.position}
                <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium  ${job.status === 'accept' ?'text-green-800 bg-green-100' : 'text-blue-800 bg-blue-100' } `}>
                  {job.status}
                </span>
                </p>
              </div>
              <div>
                <button onClick={()=>getApplication(job._id)} className='p-4 rounded  bg-blue-500'>{job.status === 'accept' ? 'Reschedule' : 'Take application'}</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center flex-wrap ">
                    <FileText className="mr-2" />
                    <a
                      href={job.resume.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {job.resume.resume.split('name')[1].split('?')[0].replaceAll('%', ' ') || `Resume ${index + 1}`}
                    </a>
                    </div>
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
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50 "
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white m-4 p-6 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between   ">
          <X onClick={closeModal}/>
          </div>
          <div className='overflow-scroll scrollbar-hide'>
            {applicationData && <JobApplicationOverview user={applicationData?.user} experiences={applicationData?.experience} education={applicationData?.education} resume={[applicationData?.resume]} />}
            {applicationData?.details && applicationData?.status === 'accepted' &&
            <div>
            <div className='mt-6'>
              <div className='flex flex-col'>
                <p>scheduled for <span className='text-green-600'>{new Date(applicationData.details.date).toLocaleDateString()}</span></p>
                <p>time : {applicationData.details.time}</p>
                <p>If any doubts regardign interview contact on {applicationData.details.email}</p>
              </div>
            </div>
            </div>
            }
            <div className='flex justify-end my-4'>
              <button type='button' className='text-blue-500  px-4 hover:bg-blue-200 mr-4' onClick={reject}>{applicationData?.status === 'accepted' ? 'leave' : 'Reject' }</button>
              <button type='submit' className='bg-blue-500 px-4 py-2 hover:bg-blue-600 rounded' onClick={accept}>Accept and shedule interview</button>
              </div>
            </div>
        </div>
        </Modal>
        <Modal
  isOpen={acceptOpen}
  onRequestClose={closeAcceptModal}
  className="fixed inset-0 flex items-center justify-center z-50 mt-[80px]"
  overlayClassName="fixed inset-0 bg-black bg-opacity-75"
>
  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto h overflow-y-auto">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold">
        {!newShedule ? "Edit" : "Schedule"} Interview
      </h2>
      <X className="cursor-pointer" onClick={closeAcceptModal} />
    </div>

    <div className="space-y-4">
      <div>
        <label htmlFor="interview-date" className="block text-sm font-medium text-gray-700">
          Interview Date
        </label>
        <input
          type="date"
          id="interview-date"
          value={date}
          onChange={(e)=> setDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="interview-time" className="block text-sm font-medium text-gray-700">
          Interview Time
        </label>
        <input
          type="time"
          id="interview-time"
          value={time}
          onChange={(e)=>setTime(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Contact Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Enter contact email"
          onChange={(e)=> setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="text-gray-500 px-4 py-2 rounded-md hover:bg-gray-200 mr-2"
          onClick={closeAcceptModal}
        >
          Cancel
        </button>
        <button
            onClick={acceptAndShedule}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {newShedule ? "Add" : "Save"} Confrim
        </button>
      </div>
    </div>
  </div>
</Modal>

    </div>
  );
};

export default Applications;