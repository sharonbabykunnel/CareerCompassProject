import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const AdminPrivatePages = () => {
    const admin  = useSelector(state=>state?.presisted?.admin);
    
    if(admin){
        return <Outlet/>
    }else{
       return  <Navigate to='/admin/login'/>
    }
}

export default AdminPrivatePages
