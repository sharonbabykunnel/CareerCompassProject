import React, { useEffect, useState } from 'react';
import SideChoise from './SideChoise';
import Connections from './Connections';
import api from '../../axios/userInterceptor';
import Requests from './Requests';
import { Outlet } from 'react-router-dom';
import menu from './../../../const/connectionMenu';


const ConnectionInterface = () => {


  return (
    <div className='flex'>
      <SideChoise menu={menu} title='Manege My Connection'/>
    <div className='m-4 bg-lite_user w-[80vw]'>
      <Outlet />
    </div>
    </div>
  );
};

export default ConnectionInterface;