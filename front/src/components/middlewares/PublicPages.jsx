import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PublicPages = () => {
    const user = useSelector((state)=>state.presisted.user);
    if(user){
        return <Navigate to='/home' replace />
    }else{
        return <Outlet/>
    }
}

export default PublicPages
