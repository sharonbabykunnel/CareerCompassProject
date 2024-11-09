import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeaderIcon = ({Icon, pageToNavigate}) => {
    const navigate = useNavigate();
    const handleNavigate = ()=>{
        navigate(pageToNavigate);
    }
    return (
      <div className="cursor-pointer" onClick={handleNavigate}>
        <Icon className="w-6 h-6 text-gray-600 hover:text-blue-500 transition-colors" />
      </div>
    );
}

export default HeaderIcon
