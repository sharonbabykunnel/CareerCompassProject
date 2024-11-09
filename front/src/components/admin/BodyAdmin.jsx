import React, { useState } from 'react'
import SideManu from './SideManu'
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import MainBody from '../home/MainBody';
import PostPopup from '../post/PostPopup';
import menuItems from '../../../const/menuItems';

const BodyAdmin = () => {
    const navigate = useNavigate();
    const location = useLocation();
  return (
    <div className='grid grid-cols-5  bg-admin_lite h-[90%]'>
      <div className='col-span-1 bg-white justify-between flex flex-col m-10 rounded'>
        {menuItems.map((items)=>(
            <SideManu
                key={items.name}
                src={items.src}
                name={items.name}
                navigateSideMenu={()=>navigate(`${items.path}`)}
                isSelected={location.pathname === items.path}
            />
        ))}
    </div>
      <div className='col-span-4 bg-white m-10 rounded'>
        <Outlet/>
      </div>
    </div>
  )
}

export default BodyAdmin
