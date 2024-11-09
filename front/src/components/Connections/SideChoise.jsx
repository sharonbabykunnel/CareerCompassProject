import React from 'react';
import Options from './Options';
import { useNavigate } from 'react-router-dom';

const SideChoise = ({menu,title}) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 pb-2 border-b">{title}</h2>
      
      <div className="space-y-4">
        {menu.map(item=> <Options key={item.name} which={item.name} navigateto={()=> navigate(item.path)} /> )}
           </div>
    </div>
  );
};

export default SideChoise;