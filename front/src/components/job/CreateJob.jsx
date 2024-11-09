import { useFormik } from 'formik';
import { ArrowBigLeft, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ExperienceForm from './ExperienceForm';
import api from '../../axios/userInterceptor';
import { useSelector } from 'react-redux';
import { jobPostSchema } from '../../schema';
import { industries } from '../../../const/job';
import SelectOption from '../common/SelectOption';
import { Success } from '../../helpers/popup';
import { useLocation } from 'react-router-dom';

const CreateJob = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [start, setStart] = useState(true);
  const [skillInput, setSkillInput] = useState('');
  const [selected, setSelected] = useState([{}, {}, {}]);
  const user = useSelector(state => state.presisted.user);
  const location = useLocation()
  const job = location?.state?.job

  const openModal = async () => {
    const error = await validateForm()
    if(error.title) return 
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(()=>{
    if(job){
      setValues({
        title:job.title,
        description:job.description,
        location:job.location,
        company:job.company,
        experience:job.experience,
        workplaceType:job.workplaceType,
        immidiate:job.immidiate,
        experienceLevel:job.experience,
        skills:job.skills,
        industry:job.industry,
        deadline:job.deadline
      })
      setIsOpen(true)
    }

  },[])  


  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    handleSubmit,
    setValues,
    validateForm
  } = useFormik({
    initialValues: {
      title: '',
      company: '',
      location: '',
      experience: 1,
      workplaceType: 'On-site',
      jobType: 'Full-time',
      immidiate: false,
      experienceLevel:"Entry-level",
      skills: [],
      industry:'',
      deadline:"",
      description: ``,
    },
    validationSchema:jobPostSchema,
    onSubmit: async (values, action) => {
      try {
        const res = await api.post(`/job/post/${user.uid}`,{...values,selected:selected});
        Success('Posted');
        action.resetForm()
        closeModal()
        setStart(true)
        setSelected([{},{},{}]);
      } catch (err) {
        err;
      } finally {
      }
    },
  });

  const handleFocus = (e) => {
    e.target.select();
  };
  const addSkill = () => {
    setValues({
      ...values,
      skills: [...values.skills, skillInput],
    });
    setSkillInput('');
  };
  const removeSkill = (remove) => {
    setValues({
      ...values,
      skills: values.skills.filter((item) => item !== remove),
    });
  };

  const goToBack = ()=>{
    setStart(true)
  }

  const goToFront = async ()=>{
    const error = await validateForm()
    if(!error.company && !error.deadline && !error.description && !error.experience && !error.location && !error.title){
      setStart(false)
    }
  }

  return (
    <div className="h-[80vh]">
<div className="flex flex-col items-center p-6">
  <img src="https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/logo.png?alt=media&token=bc8fb861-d4b9-441d-8621-17b1e89a8628" alt="Company Logo" className="w-[40vw] mb-6" />
  <h1 className="text-2xl  mb-4">Post a Job in a Minute</h1>
  
  <div className="w-full max-w-md">
    <label htmlFor="job-title" className="block text-sm  text-gray-700 mb-2">
      Job Title
    </label>
    <input
      type="text"
      id="job-title"
      value={values.title}
      onChange={(e) => setValues({ ...values, title: e.target.value })}
      className="w-full p-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
      {errors.title &&  (
    <div className="text-red-500 text-sm">
      {errors.title}
    </div>
  )}
    <button
      className="bg-blue-500 text-white mt-6 py-2 w-full rounded-md hover:bg-blue-600 transition"
      onClick={openModal}
    >
      Create Now
    </button>
  </div>
</div>

      <Modal
        isOpen={isOpen}
        // onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50 "
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg   w-[50vw] mx-auto h-[90vh]">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-semibold">Job description</h2>
            {start ? <X onClick={closeModal} /> : <ArrowBigLeft onClick={goToBack}/>}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col h-[80vh] justify-between">
            <div className="overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-2 gap-4">
                {start ? (
                  < >
                  <div>
                <label className="block mb-2">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.title && touched.title && (
                  <div className="text-red-500 text-sm">
                    {errors.title}
                  </div>
                )}
              </div>
              <div>
                <label className="block mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={values.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.company  && (
                  <div className="text-red-500 text-sm">
                    {errors.company}
                  </div>
                )}
              </div>
              <div>
                <label className="block mb-2">Experience</label>
                <input
                  type="number"
                  name="experience"
                  value={values.experience}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.experience && touched.experience && (
                  <div className="text-red-500 text-sm">{errors.experience}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.location  && (
                  <div className="text-red-500 text-sm">{errors.location}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Workplace type</label>
                <select name='workplaceType' value={values.workplaceType}
                  onChange={handleChange}
                  onBlur={handleBlur} className="w-full p-2 border rounded">
                    <option value='On-site' label='On-site' />
                    <option value='Hybrid' label='Hybrid' />
                    <option value='Remote' label='Remote' />
                </select>
                {errors.workplaceType && touched.workplaceType && (
                  <div className="text-red-500 text-sm">{errors.workplaceType}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Experience level</label>
                <select name='experienceLevel' value={values.experienceLevel}
                  onChange={handleChange}
                  onBlur={handleBlur} className="w-full p-2 border rounded">
                    <option value='Entry-level' label='Entry-level' />
                    <option value='Mid-level' label='Mid-level' />
                    <option value='Senior' label='Senior' />
                    <option value='Executive' label='Executive' />
                </select>
                {errors.experienceLevel && touched.experienceLevel && (
                  <div className="text-red-500 text-sm">{errors.experienceLevel}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Job type</label>
                    <select name='jobType'
                     value={values.jobType}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     className="w-full p-2 border rounded">
                        <option value="Full-time" label='Full-time'></option>
                        <option value="Part-time" label='Part-time'></option>
                        <option value="Internship" label='Internship'></option>
                        <option value="Contract" label='Contract'></option>
                        <option value="Other" label='Other'></option>
                    </select>
                {errors.jobType && touched.jobType && (
                  <div className="text-red-500 text-sm">{errors.jobType}</div>
                )}
              </div>
              <div className='flex'>
                <label className=" m-2">Is an urgant hiring</label>
                <input
                  type="checkbox"
                  name='isOngoing'
                  value={values.immidiate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-8  border  rounded"
                />
                {errors.immidiate && touched.immidiate && (
                  <div className="text-red-500 text-sm">{errors.immidiate}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Min salary</label>
                <input
                  type="number"
                  name="salarymin"
                  value={values.salarymin}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.salarymin && touched.salarymin && (
                  <div className="text-red-500 text-sm">{errors.salarymin}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Max salary</label>
                <input
                  type="number"
                  name="salarymax"
                  value={values.salarymax}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.salarymax && touched.salarymax && (
                  <div className="text-red-500 text-sm">{errors.salarymax}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Application Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={values.deadline.split("T")[0]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.deadline && touched.deadline && (
                  <div className="text-red-500 text-sm">{errors.deadline}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Industry</label>
                    <select name='industry'
                     value={values.industry}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     className="w-full p-2 border rounded">
                              {industries.map((industry, index) => (
                              <SelectOption key={index} value={industry.value} label={industry.label} />
                              ))}
                    </select>
                {errors.industry && (
                  <div className="text-red-500 text-sm">{errors.industry}</div>
                )}
              </div>
              <div className=' col-span-2'>
                <label className="block mb-2">Discription</label>
                <textarea
                onClick={handleFocus}
                  type="text"
                  placeholder='Tips: Provide a summary of the role, what success in the position looks like, and how this role fits into the organization overall. Responsibilities
[Be specific when describing each of the responsibilities. Use gender-neutral, inclusive language.]

Example: Determine and develop user requirements for systems in production, to ensure maximum usability

Qualifications

[Some qualifications you may want to include are Skills, Education, Experience, or Certifications.]

Example: Excellent verbal and written communication skills'
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                  rows='8'
                />
                {errors.description  && (
                  <div className="text-red-500 text-sm">{errors.description}</div>
                )}
                </div> 
                  </>
                ) : (
                  <div className="col-span-2">
                    <div className="mb-4">
                      <label className="block mb-2">Skills (max 10)</label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="Enter a skill"
                        />
                        <button
                          type="button"
                          onClick={addSkill}
                          disabled={values.skills.length >= 10}
                          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                        >
                          Add
                        </button>
                      </div>
                      <div className="mt-2 flex flex-wrap">
                        {values.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gray-200 px-2 py-1 rounded m-1 flex items-center"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-2 text-red-500"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      {errors.skills && touched.skills && (
                        <div className="text-red-500 text-sm">{errors.skills}</div>
                      )}
                    </div>
                <ExperienceForm selected={selected} setSelected={setSelected} skills={values.skills} />
                  </div>
                )}
              </div>
            </div>
            <div className="flex m-6 justify-end space-x-2 ">
              <div onClick={closeModal} className="text-gray-500 hover:text-gray-900">
                Cancel
              </div>
              {start ? (
                <div
                  onClick={goToFront}
                  className="text-blue-500 hover:text-blue-900"
                >
                  Next
                </div>
              ) : (
                <button type="submit" className="text-blue-500 hover:text-blue-900">
                  Save
                </button>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateJob;
