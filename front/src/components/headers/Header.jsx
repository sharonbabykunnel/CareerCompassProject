import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();

  const navigateSignIn = ()=>{
    navigate('/auth/signin');
  }

  const navigateSignUp = ()=>{
    navigate('/auth/signup');
  }
  return (
    <div className=' flex bg-user'>
        <div className=' flex-grow p-6 grid  ' >
          <img className=' w-60' src='https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/logo.png?alt=media&token=9dd55b7d-3cf1-46e1-8c92-f447e8630b08' />
          </div>
        <div className='grid-cols-6  p-6 flex items-center space-x-4'>
          <button onClick={navigateSignIn}  className='bg-white text-user px-4 py-2 rounded w-40'>Sign In</button>
          <button onClick={navigateSignUp} className='bg-user_lite text-white px-4 py-2 rounded w-40'>Sign Up</button>
        </div>
    </div>
  )
}

export default Header
