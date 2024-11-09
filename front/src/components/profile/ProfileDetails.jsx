import React, { useRef, useState, useEffect } from 'react'
import { Pencil, X } from 'lucide-react'
import ReactModal from 'react-modal'
import useUploadFile from '../../hooks/useUploadFile'
import api from '../../axios/userInterceptor'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../../utils/userSlice'
import { Failed, Success } from '../../helpers/popup'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { industries } from '../../../const/job'
import SelectOption from '../common/SelectOption'

const ProfileDetails = ({ user }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileModelOpen, setIsProfileModelOpen] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [straighten, setStraighten] = useState(0);
  const [photo, setPhoto] = useState()
  const [perSec, setPerSec] = useState(0)
  const inputRef = useRef()
  const {uploadFile} = useUploadFile()
  const dispatch = useDispatch()

  const openModal = () => setIsEditModalOpen(true)
  const closeModal = () => setIsEditModalOpen(false)
  const openProfileModal = () => setIsProfileModelOpen(true)
  const closeProfileModal = () => setIsProfileModelOpen(false)

  const changePhoto = () => inputRef.current.click()
  const handelPhoto = (e) => setPhoto(e.target.files[0])

  const savePhoto = async () => {
    try {
      const url = await uploadFile(photo, 'photo', setPerSec)
      const response = await api.patch(`/user/coverPhoto/update/${user.uid}`, {url});
      dispatch(setCredentials(response.data));
      closeModal();
    } catch (error) {
      Failed(error.response ? error.response.data.message : error.message)
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    pronouns: Yup.string(),
    position: Yup.string(),
    about: Yup.string(),
  })

  const formik = useFormik({
    initialValues: {
      name: user.name || '',
      pronouns: user.pronouns || '',
      position: user.position || '',
      about: user.about || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await api.patch(`/user/userDetails/update/${user.uid}`, values);
        dispatch(setCredentials(response.data));
        closeProfileModal();
        Success('Profile updated successfully');
      } catch (error) {
        Failed(error.response ? error.response.data.message : error.message)
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      name: user.name || '',
      pronouns: user.pronouns || '',
      position: user.position || '',
      about: user.about || '',
      industry:user.industry || '',
    });
  }, [user]);

  return (
    <div className='bg-white rounded-xl overflow-hidden shadow-md'>
      <div className='relative h-32'>
        <img 
          src={user.coverPhoto || 'https://via.placeholder.com/800x200.png?text=Cover+Photo'} 
          alt="Cover" 
          className='w-full h-full object-cover'
        />
        <button onClick={openModal} className='absolute top-2 right-2 p-2 bg-white rounded-full shadow-md'>
          <Pencil size={16} />
        </button>
      </div>
      
      <div className='relative px-4 pb-4'>
        <img 
          src={user.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'} 
          className='absolute -top-16 left-4 w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg' 
          alt="Profile"
        />
        <button onClick={openProfileModal} className='absolute top-2 right-2 p-2 bg-white rounded-full shadow-md'>
          <Pencil size={16} />
        </button>
        <div className='pt-20'>
          <h1 className='text-xl font-semibold'>{user.name}<span className=' text-sm p-2 text-slate-700'>{user.pronouns}</span></h1>
          <p className='text-sm text-gray-600 mt-1'>{user.position}</p>
          <p className='text-sm text-gray-500 mt-2'>{user.about }</p>
        </div>
      </div>

      {/* Cover Photo Modal */}
      <ReactModal
        isOpen={isEditModalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50 mt-[80px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
 <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto  overflow-auto scrollbar-hide">
          <div className='flex justify-between'>
          <h2 className="text-2xl font-semibold mb-4">
            Change Cover Photo
          </h2>
          <X onClick={closeModal}/>
          </div>
          {/* Image Preview Area */}
          <div className="relative bg-black h-64 flex justify-center items-center mb-4">
                {/* Image Placeholder */}
                <img 
                    src={ photo ? URL.createObjectURL(photo) : user.coverPhoto || 'https://via.placeholder.com/800x200.png?text=Cover+Photo'}
                    alt="Background" 
                    className={`object-cover transform ${straighten ? `rotate(${straighten}deg)` : ''}`}
                    style={{ transform: `scale(${1 + zoom / 100}) rotate(${straighten}deg)` }}
                />
            </div>
            
            {/* Sliders Section */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <label>Zoom</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={zoom} 
                        onChange={(e) => setZoom(e.target.value)}
                        className="w-2/3"
                    />
                </div>
                <div className="flex justify-between items-center mb-2">
                    <label>Straighten</label>
                    <input 
                        type="range" 
                        min="-45" 
                        max="45" 
                        value={straighten} 
                        onChange={(e) => setStraighten(e.target.value)}
                        className="w-2/3"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
                <button className="text-gray-500 hover:bg-red-800 p-2 rounded">Delete photo</button>
                <div>
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2" onClick={changePhoto}>Change photo</button>
                    <input type="file" ref={inputRef} style={{display:'none'}} onChange={handelPhoto}/>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={savePhoto}>Save</button>
                </div>
            </div>
        </div>
      </ReactModal>

      {/* Profile Edit Modal */}
      <ReactModal
        isOpen={isProfileModelOpen}
        onRequestClose={closeProfileModal}
        className="fixed inset-0 flex items-center justify-center z-50 mt-[80px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto h-[80vh] overflow-auto scrollbar-hide">
          <div className='flex justify-between'>
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            <X onClick={closeProfileModal}/>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                {...formik.getFieldProps('name')}
                className="w-full p-2 border rounded"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Pronouns</label>
                <select
                  name="employmentType"
                  {...formik.getFieldProps('pronouns')}
                  className="w-full p-2 border rounded"
                >
                  <option value="" label="Select Pronoun" />
                  <option value="He/Him" label="He/Him" />
                  <option value="She/Her" label="She/She" />
                  <option value="They/Them" label="They/Them" />
                </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Position</label>
              <input
                type="text"
                name="position"
                {...formik.getFieldProps('position')}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Industry</label>
              <select name='industry'
                      {...formik.getFieldProps('industry')}
                     className="w-full p-2 border rounded">
                              {industries.map((industry, index) => (
                              <SelectOption key={index} value={industry.value} label={industry.label} />
                              ))}
                    </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">About</label>
              <textarea
                name="about"
                {...formik.getFieldProps('about')}
                className="w-full p-2 border rounded"
                rows="4"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </ReactModal>
    </div>
  )
}

export default ProfileDetails