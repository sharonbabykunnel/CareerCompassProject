import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../axios/userInterceptor';
import { BriefcaseBusiness, X, Search, MapPin, Clock, Users, Download } from 'lucide-react';
import Modal from 'react-modal';
import { move, useFormik } from 'formik';
import { userSchema } from '../../schema';
import ResumePart from './ResumePart';
import ExperiencePart from './ExperiencePart';
import EducationPart from './EducationPart';
import ProfilePart from './ProfilePart';
import JobApplicationOverview from './JobApplicationOverview';
import { Failed, Success } from '../../helpers/popup';
import useUploadFile from '../../hooks/useUploadFile';

const MyJobs = () => {
  const user = useSelector(state => state.presisted.user);
  const [jobs, setJobs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [where, setwhere] = useState(0);
  const [resume, setResume] = useState([])
  const [experiences , setExperiences] = useState([])
  const [education,setEducation] = useState([]);
  const [chosenResumeId, setChosenResumeId] = useState();
  const [uploadedResume, setUploadedResume] = useState(null);
  const {uploadFile} = useUploadFile()
  const [perSec,setPerSec] = useState()

  useEffect(() => {
    const getJobPosts = async () => {
      try {
        const response = await api.get(`/job/getMyJobs/${user.uid}`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    getJobPosts();
  }, [user.uid]);

  const formik = useFormik({
    initialValues: {
      name: user.name || '',
      position: user.position || '',
      number: user.number || '',
      email: user.email || '',
      resume: '',
      education: [],
      experience: [],
    },
    validationSchema:userSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          education: education.map(edu => edu._id),
          experience: experiences.map(exp => exp._id),
        };
        if(values.resume == 'uploaded'){
          const url = await uploadFile(uploadedResume,'resume', setPerSec)
          const res = await api.post(`/profile/resume/add/${user.uid}`,{resume:url['resume']})
          payload.resume = res.data._id
        }else{
          payload.resume = chosenResumeId
        }
        const response = await api.post(`/job/apply/${user.uid}/${selectedJob._id}`, {payload});
        if(!response?.data) throw new Error('Allready applied');
        closeModal();
        Success('Application updated successfully');
        setJobs(state => state.filter(job => job._id !== selectedJob._id))
      } catch (error) {
        Failed(error.response ? error.response.data.message : error.message)
      }
    },
  });

  const deletePost = async (id) => {
    try {
      await api.delete(`/job/remove/${id}/${user.uid}`);
      setJobs(state => state.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const openJobDetails = (job) => {
    setIsOpen(true);
    setSelectedJob(job);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const close =()=>{
    setIsOpen(false)
  }

  const applyJob = () => {
    close()
    setIsModalOpen(true)
    setwhere(1)
  };
  
  const setValue = (value)=>{
    formik.setFieldValue('resume',value)
  }

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const move = async ()=>{
    const errors = await formik.validateForm();
    if(errors.name || errors.number || errors.position || errors.email) return 
    const res = await api.get(`/profile/resume/get/${user.uid}`)
    setResume(res?.data)
    setChosenResumeId(res?.data[0]?._id)
    setwhere(2)
  }

  const moveToExperience = async ()=>{
    const res = await api.get(`/profile/experience/get/${user.uid}`)
    setExperiences(res.data)
    setwhere(3)
  }

  const moveToEducation = async ()=>{
    await formik.setFieldValue('experience',experiences)
    const res = await api.get(`/education/get/${user.uid}`)
    setEducation(res.data)
    setwhere(4)
  }

  const moveToSubmit  = async ()=>{
    await formik.setFieldValue('education',education)
    setwhere(5)
  }

  const moveBack = ()=>{
    setwhere(prev => prev-1)
  }

  const removeClick = (index)=>{
    setExperiences(state => state.filter((_,ind)=> ind != index))
  }

  const removeEdu= (index)=>{
    setEducation(state => state.filter((_,ind)=> ind != index))
  }

  if(jobs.length < 1){
    return(
      <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Currently no Jobs for You, complete your profile! And wait </h1>
      </div>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Jobs ({jobs.length})</h1>
      </div>
      
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search jobs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center p-6">
              <div className="flex-grow cursor-pointer" onClick={() => openJobDetails(job)}>
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <MapPin size={12} className="mr-1" /> {job.location}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {job.jobType}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Created at {new Date(job.createdAt).toLocaleDateString([], {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <button 
                onClick={() => deletePost(job._id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Job Details</h2>
                <button onClick={close} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
              <h3 className="text-2xl font-bold mb-2">{selectedJob.title}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  <MapPin size={12} className="mr-1" /> {selectedJob.location}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {selectedJob.jobType}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {selectedJob.experienceLevel}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{selectedJob.company}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <BriefcaseBusiness size={16} />
                <span>{selectedJob.workplaceType}</span>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">About the Job</h4>
                <p className="text-gray-700">{selectedJob.description}</p>
              </div>
              <button 
                onClick={applyJob}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50 "
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white m-4 p-6 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between   ">
          <h2 className="text-2xl font-semibold mb-4">
             Apply to {selectedJob.title}
          </h2>
          <X onClick={closeModal}/>
          </div>
          <div className='overflow-scroll scrollbar-hide'>
            {where === 1 && <div>
              <h6>Contact info</h6>
              <img src={user.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'} alt="" className='rounded-full w-20'/>
              <h4>{user.name}</h4>
              <p>{user.about}</p>
            </div>}
            <form onSubmit={formik.handleSubmit}>
            { where === 1 ?
            <ProfilePart formik={formik} move={move} />
            : where === 2 ?
            <ResumePart setValue={setValue} resume={resume} moveToExperience={moveToExperience} chosenResumeId={chosenResumeId} setChosenResumeId={setChosenResumeId} moveBack={moveBack} setUploadedResume={setUploadedResume} uploadedResume={uploadedResume} />
            : where === 3 ?
            <ExperiencePart experiences={experiences} setExperiences={setExperiences} moveToEducation={moveToEducation} moveToExperience={moveToExperience} moveBack={moveBack} removeClick={removeClick} /> 
            : where === 4 ?
            <EducationPart education={education} setEducation={setEducation} moveToSubmit={moveToSubmit} moveBack={moveBack} removeEdu={removeEdu}/>
            : where === 5 &&
            <div>
              <JobApplicationOverview user={user}  education={education} experiences={experiences} resume={chosenResumeId != 'uploaded' ? [resume.find(res => res._id === chosenResumeId)] : [uploadedResume]} moveBack={moveBack} />
              <div className='flex justify-end my-4'>
              <button type='button' className='text-blue-500  px-4 hover:bg-blue-200 mr-4' onClick={moveBack}>Back</button>
              <button type='submit' className='bg-blue-500 px-4 py-2 hover:bg-blue-600 rounded'>Submit application</button>
              </div>
            </div>
            }
          </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyJobs;