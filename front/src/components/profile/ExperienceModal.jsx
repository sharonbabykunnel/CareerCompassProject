import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { experienceSchema } from '../../schema';
import { useFormik } from 'formik';
import { pushExperienceSuccess, updateExperience } from '../../../utils/profileSlice';
import { Success } from '../../helpers/popup';
import { editExperience, postExperience } from '../../api/profileService';
import { useDispatch, useSelector } from 'react-redux';

const ExperienceModal = ({closeEditModal,isEditModalOpen,newExp,selectedExperience,setExpLoading,setExperiences}) => {
    const user = useSelector(state=> state.presisted.user)
    const dispatch = useDispatch()
  const [skillInput, setSkillInput] = useState('');
    const initialValues = {
        position: "",
        company: "",
        startDate: "",
        endDate: null,
        currentJob:false,
        description:"",
        achievments:'',
        city:"",
        state:"",
        country:"",
        employmentType:"",
        skills:[]
      };
      const {
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          handleSubmit,
          setValues,
          setFieldValue
        } = useFormik({
          initialValues,
          validationSchema: experienceSchema,
          onSubmit: async (values, action) => {
            try {
              closeEditModal();
              setExpLoading(true)
              let res;
              if (!newExp) {
                res = await editExperience(
                  selectedExperience._id,
                  selectedExperience.userId,
                  values
                );
                dispatch(updateExperience(res.data))
              } else {
                res = await postExperience(user.uid, values);
                const data = res.data;
                if(setExperiences) setExperiences(state => [...state,data])
                dispatch(pushExperienceSuccess(data));
                Success('Experience added');
              }
              action.resetForm();
            } catch (error) {
              Failed(error.response.data.message ? error.response.data.message : error.message);
            } finally{
              setExpLoading(false)
            }
          },
        });
    useEffect(() => {
        if (selectedExperience) {
          setValues({
            position: selectedExperience.position,
            company: selectedExperience.company,
            startDate: selectedExperience.startDate,
            endDate: selectedExperience.endDate,
            currentJob:selectedExperience.currentJob,
            description:selectedExperience.description,
            achievments:selectedExperience.achievments,
            employmentType:selectedExperience.employmentType,
            city:selectedExperience.city,
            state:selectedExperience.state,
            country:selectedExperience.country,
            skills:selectedExperience.skills
          });
        } else {
          setValues({
            position: "",
            company: "",
            startDate: "",
            endDate: null,
            currentJob:false,
            description:"",
            achievments:"",
            employmentType:"",
            city:"",
            state:"",
            country:"",
            skills:[]
          });
        }
      }, [selectedExperience, setValues]);
      useEffect(() => {
        if (values.currentJob) {
          setFieldValue('endDate', null)
        }
      }, [values.currentJob, setFieldValue]);
      const addSkill = () => {
        if (values.skills.length < 5 && skillInput.trim() !== '') {
          setValues({
            ...values,
            skills: [...values.skills, skillInput.trim()]
          });
          setSkillInput('');
        }
      };
      
      const removeSkill = (skillToRemove) => {
        setValues({
          ...values,
          skills: values.skills.filter(skill => skill !== skillToRemove)
        });
      };
  return (
    <div>
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        className="fixed inset-0 flex items-center justify-center z-50 mt-[80px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto h-[80vh]  ">
          <div className="flex justify-between   ">
          <h2 className="text-2xl font-semibold mb-4">
            {!newExp ? "Edit" : "Add"} Experience
          </h2>
          <X onClick={closeEditModal}/>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mt-10 h-[60vh] overflow-auto scrollbar-hide">
              <div>
                <label className="block mb-2">Position</label>
                <input
                  type="text"
                  name="position"
                  value={values.position}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.position && touched.position && (
                  <div className="text-red-500 text-sm">{errors.position}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={values.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.company && touched.company && (
                  <div className="text-red-500 text-sm">{errors.company}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.city && touched.city && (
                  <div className="text-red-500 text-sm">{errors.city}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.state && touched.state && (
                  <div className="text-red-500 text-sm">{errors.state}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.country && touched.country && (
                  <div className="text-red-500 text-sm">{errors.country}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={values.startDate.split("T")[0]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.startDate && touched.startDate && (
                  <div className="text-red-500 text-sm">{errors.startDate}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={values.endDate ? values.endDate.split("T")[0] : ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-2 border rounded ${values.currentJob ? 'bg-gray-200' : ''}`}
                  disabled={values.currentJob}
                />
                {errors.endDate && touched.endDate && (
                  <div className="text-red-500 text-sm">{errors.endDate}</div>
                )}
              </div>
              <div className='flex items-center'>
                <label className="">Current Job</label>
                <input
                  type="checkbox"
                  name='currentJob'
                  checked={values.currentJob}
                  value={values.currentJob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-10  border  rounded"
                />
                {errors.currentJob && touched.currentJob && (
                  <div className="text-red-500 text-sm">{errors.currentJob}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Achievements</label>
                <textarea
                  type="text"
                  name="achievments"
                  value={values.achievments}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.achievments && touched.achievments && (
                  <div className="text-red-500 text-sm">{errors.achievments}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Employment Type</label>
                <select
                  name="employmentType"
                  value={values.employmentType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                >
                  <option value="" label="Select employment type" />
                  <option value="Full-time" label="Full-time" />
                  <option value="Part-time" label="Part-time" />
                  <option value="Contract" label="Contract" />
                  <option value="Internship" label="Internship" />
                  <option value="Freelance" label="Freelance" />
                </select>
                {errors.employmentType && touched.employmentType && (
                  <div className="text-red-500 text-sm">{errors.employmentType}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Description</label>
                <textarea
                  type="text"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded h-40"
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-sm">{errors.description}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Skills (max 5)</label>
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
                    disabled={values.skills.length >= 5}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap">
                  {values.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-200 px-2 py-1 rounded m-1 flex items-center">
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
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="submit"
                className="text-blue-500 m-4 hover:text-blue-900"
              >
                Save
              </button>
            </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default ExperienceModal
