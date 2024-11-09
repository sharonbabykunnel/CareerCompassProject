import { Check, X } from 'lucide-react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const List = ({ list }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split('/')[2]
    const handleClick = (path) => {
        navigate(path); 
    }
    return (
        <div 
            onClick={() => handleClick(list.path)}
            className={`flex-1 gap-5 flex p-4 b ${path === list.path ? 'bg-blue-500' : 'bg-white'} hover:bg-blue-200`}
            // Change 'bg-blue-500' to your desired selected background color
        >
          {path === list.path ?
          <Check/>:
          <X/>}
            <div>{list.path}</div>
        </div>
    );
}

export default List;
