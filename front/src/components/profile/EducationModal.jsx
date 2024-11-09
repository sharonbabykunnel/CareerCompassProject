import { useFormik } from 'formik';
import { X } from 'lucide-react'
import React, { useEffect } from 'react'
import Modal from 'react-modal'
import { educationSchema } from '../../schema';
import { addEducation, editEducation } from '../../api/educationService';
import { addUserEducation, updateEducation } from '../../../utils/profileSlice';
import { useDispatch, useSelector } from 'react-redux';

const EducationModal = ({closeEditModal,isEditModalOpen,newEdu,selectedEducation,setEducation}) => {
    const user = useSelector(state => state.presisted.user)
    const dispatch = useDispatch()
    const initialValues = {
        institution: "",
        course: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        grade:'',
        activity:'',
        description:'',
        isOngoing:false,
      };
    const {
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        handleSubmit,
        setValues,
      } = useFormik({
        initialValues,
        validationSchema: educationSchema,
        onSubmit: async (values, action) => {
          try {
            closeEditModal();
            let res;
            if (!newEdu) {
              res = await editEducation(
                selectedEducation._id,
                values
              );
              if(setEducation) setEducation(state => [...state,res.data])
              else dispatch(updateEducation(res.data));
            } else {
              res = await addEducation(user.uid, values);
              if(setEducation) setEducation(state => [...state,res.data])
                else dispatch(addUserEducation(res.data))
            }
            const data = res.data;
    
            Success(data.message);
            action.resetForm();
          } catch (err) {
            err;
          }finally{
          }
        },
      });
    
      useEffect(() => {
        if (selectedEducation) {
          setValues({
            institution: selectedEducation.institution,
            course: selectedEducation.course,
            fieldOfStudy: selectedEducation.fieldOfStudy,
            startDate: selectedEducation.startDate,
            endDate: selectedEducation.endDate,
            activity:selectedEducation.activiry,
            description:selectedEducation.description,
            isOngoing:selectedEducation.isOngoing,
            grade:selectedEducation.grade,
          });
        } else {
          setValues({
            institution: "",
            course: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: "",
            grade:'',
            activity:'',
            description:'',
            isOngoing:false,
          });
        }
      }, [selectedEducation, setValues]);
  return (
    <div>
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        className="fixed inset-0 flex items-center justify-center z-50 mt-[80px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto h-[80vh] overflow-auto scrollbar-hide">
        <div className='flex justify-between'>
          <h2 className="text-2xl font-semibold mb-4">
            {!newEdu ? "Edit" : "Add"} Education
          </h2>
          <X onClick={closeEditModal}/>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Course</label>
                <input
                  type="text"
                  name="course"
                  value={values.course}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.course && touched.course && (
                  <div className="text-red-500 text-sm">
                    {errors.course}
                  </div>
                )}
              </div>
              <div>
                <label className="block mb-2">Institution</label>
                <input
                  type="text"
                  name="institution"
                  value={values.institution}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.institution && touched.institution && (
                  <div className="text-red-500 text-sm">
                    {errors.institution}
                  </div>
                )}
              </div>
              <div>
                <label className="block mb-2">Grade</label>
                <input
                  type="text"
                  name="grade"
                  value={values.grade}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.grade && touched.grade && (
                  <div className="text-red-500 text-sm">{errors.grade}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Field of Study</label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={values.fieldOfStudy}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.fieldOfStudy && touched.fieldOfStudy && (
                  <div className="text-red-500 text-sm">{errors.fieldOfStudy}</div>
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
                  value={values.endDate.split("T")[0]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.endDate && touched.endDate && (
                  <div className="text-red-500 text-sm">{errors.endDate}</div>
                )}
              </div>
              <div className='flex'>
                <label className=" m-2">Is Ongoin </label>
                <input
                  type="checkbox"
                  name='isOngoing'
                  value={values.isOngoing}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-8  border  rounded"
                />
                {errors.isOngoing && touched.isOngoing && (
                  <div className="text-red-500 text-sm">{errors.isOngoing}</div>
                )}
              </div>
              <div className=' col-span-2'>
                <label className="block mb-2">Activity</label>
                <input
                  type="text"
                  name="activity"
                  value={values.activity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.activity && touched.activity && (
                  <div className="text-red-500 text-sm">{errors.activity}</div>
                )}
              </div>
              <div className=' col-span-2'>
                <label className="block mb-2">Discription</label>
                <input
                  type="text"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-sm">{errors.description}</div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={closeEditModal}
                className="text-gray-500 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-blue-500 hover:text-blue-900"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default EducationModal
