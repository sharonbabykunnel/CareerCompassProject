import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import OptionButton from './OptionButton';
import Premium from '../common/Premium';
import ProfileBox from './ProfileBox';
import api from '../../axios/userInterceptor';

const Side = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0)
  const { profilePhoto, name, coverPhoto,position,about,uid } = useSelector(state => state.presisted.user);
  
  const navigateToProfile = () => {
    navigate('/profile/')
  }

  useEffect(()=>{
    const fetchData = async()=>{
      const res = await api.get(`/user/get/porfileData/${uid}`);
      setCount(res.data[0].fieldCount - 5)
    }
    fetchData(); 
  },[])

  return (
    <div className=' m-4 rounded-xl h-auto overflow-hidden -md'>
      <div className='relative h-32'>
        <img 
          src={coverPhoto || 'https://via.placeholder.com/800x200.png?text=Cover+Photo'} 
          alt="Cover" 
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-black opacity-20'></div>
      </div>
      
      <div className='relative px-4 pb-4 bg-white rounded-b-3xl'>
        <img 
          src={profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'} 
          className='absolute -top-16 left-4 w-32 h-32 rounded-full border-4 bg-white border-white shadow-lg' 
          alt="Profile"
        />
        
        <div className='pt-20'>
          <h1 className='text-xl font-semibold'>{name}</h1>
          <p className='text-sm text-gray-600 mt-1'>{position}
          </p>
          <p className='text-sm text-gray-500 mt-2'>{about }</p>

        </div>
        <ProfileBox count={count} />
        <div className='  flex flex-col rounded items-center'>
          <OptionButton btnName='View Profile' navigateTo='/profile/post' />
          <OptionButton btnName='Applied jobs' navigateTo='/job/applied-jobs'/>
        {/* <Premium/> */}
        </div>
      </div>
    </div>
  )
}

export default Side