import React from 'react'
import { useNavigate } from 'react-router-dom'

const OptionButton = ({btnName,navigateTo}) => {
  const navigate = useNavigate();
  const handleNavigate = ()=>{
    navigate(navigateTo)
  }
  return (
    <div onClick={handleNavigate}>
      <button className='bg-blue-500 text-white py-2 px-4  w-96'>{btnName}</button>
    </div>
  )
}

export default OptionButton
