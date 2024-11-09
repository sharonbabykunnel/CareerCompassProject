import React, { useEffect, useState } from 'react';
import ProfileDetails from './ProfileDetails';
import Content from './../post/Content';
import EditOptions from './EditOptions';
import ConnectionList from './ConnectionList';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Outlet, useLocation } from 'react-router-dom';


const ProfileBody = () => {
  const location = useLocation()
  const [user,setUser] = useState(null)
  const data = useSelector(state=>state.presisted.user)
  useEffect(()=>{
    if(location?.state?.user){
      setUser(location?.state?.user)
    }else{
      setUser(data)
    }

  },[useSelector])

  return (
    <div className='grid grid-cols-3  h-[90vh]  bg-lite_user'>
      <div>
      <EditOptions />

      </div>
      <div className='col-span-2 h-full overflow-scroll scrollbar-hide'>
      <div className='m-10 ml-0 rounded-xl'>
        {user && <ProfileDetails user={user}/>}
        <Outlet />
      </div>
      </div>
    </div>
  );
}

export default ProfileBody;