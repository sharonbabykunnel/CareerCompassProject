import React, { useEffect, useRef, useState } from 'react';
import LogOut from '../helpers/LogOut';
import HeaderIcon from '../helpers/HeaderIcon';
import { Search, Home, User, Briefcase, Share2, MessageSquare, Bell, UsersIcon, LogOutIcon, BriefcaseBusiness, } from 'lucide-react';
import { useSelector } from 'react-redux';
import WithNotification from '../helpers/WithNotification';
import { Link, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import api from '../../axios/userInterceptor';

const Header_user = () => {
  const {profilePhoto,uid} = useSelector((state) => state.presisted.user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const logoutRef = useRef(null);

  useEffect(() => {
    // const handleClickOutside = (event) => {
    //   if (logoutRef.current && !logoutRef.current.contains(event.target)) {
    //     setOpen(false);
    //   }
    // };

    // document.addEventListener('mousedown', handleClickOutside);
    // return () => {
    //   document.removeEventListener('mousedown', handleClickOutside);
    // };
  }, []);

  useEffect(()=>{
    const fetchUncountedNot = async ()=>{
      // const res = await api.get(`/notification/get/unreaded/${uid}`)
    }
    fetchUncountedNot()
  },[])

  const profile = () => {
    navigate('/profile/Post');
  };

  const toggleLogout = () => {
    setOpen(prevOpen => !prevOpen);
  };

  return (
    <div className='border grid grid-cols-2 items-center'>
      <div className='col-span-1 flex items-center'>
        <Link to='/home' >
        <img src='https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/logo2.png?alt=media&token=9dd55b7d-3cf1-46e1-8c92-f447e8630b08' className='m-4 w-60' alt="Logo" />
        </Link>
        {/* <div className='relative mr-10 flex-1'>
          <input className='border w-full flex-1 rounded-md pl-10 py-2' />
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
        </div> */}
      </div>
      <div className='flex justify-evenly items-center col-span-1'>
        <div>
          <div className='grid grid-cols-6 gap-x-8 items-end h-full justify-around'>
            <HeaderIcon Icon={Home} pageToNavigate='/home' />
            <HeaderIcon Icon={Share2} pageToNavigate='/connection' />
            <HeaderIcon Icon={BriefcaseBusiness} pageToNavigate='/job' />
            <HeaderIcon Icon={MessageSquare} pageToNavigate='/message' />
            <WithNotification Icon={Bell} pageToNavigate='/notification' />
            {/* <HeaderIcon Icon={UsersIcon} pageToNavigate='/group' /> */}
          </div>
        </div>
        <div className='ml-8 flex items-center gap-4'>
          <div ref={logoutRef}>
            <LogOutIcon color='red' onClick={toggleLogout} />
              <ReactModal
        className="fixed inset-0  flex items-center justify-center z-50 mt-[80px]"
              isOpen={open}>
                <LogOut setOpen={setOpen}/>
              </ReactModal>
          </div>
          <div onClick={profile}>
            {profilePhoto ? (
              <img src={ profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png' } alt="User Profile Pic" className='rounded-full  max-w-16' />
            ) : (
              <User />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header_user;