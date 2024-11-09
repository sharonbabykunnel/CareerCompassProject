import React from 'react'
import Header from '../components/headers/Header'
import { useNavigate } from 'react-router-dom'

const Wellcome = () => {
  const navigate = useNavigate();
  const navigatetoSignUp = ()=>{
    navigate('/auth/signup');
  }

  const navigatetoSignIn = ()=>{
    navigate('/auth/signin');
  }
  return (
    <div>
      <Header/>
      <h1 className='p-20 text-6xl'>How We Will Helpful For You?!</h1>
      <div className=' flex items-center justify-around'>
        <div className=' p-4'><img   src='https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/wellcome1.png?alt=media&token=9dd55b7d-3cf1-46e1-8c92-f447e8630b08'/></div>
        <h1 className=' p-4 text-4xl'>To Find the Right Job For You!</h1>
      </div>\
      <div className=' flex items-center justify-around'>
        <h1 className=' p-4 text-4xl'>To Help To Updated With Socity!</h1>
        <div className=' p-4'><img   src='https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/wellcome2.png?alt=media&token=9dd55b7d-3cf1-46e1-8c92-f447e8630b08'/></div>
      </div>
      <div className=' flex items-center justify-around'>
        <div className=' p-4'><img   src='https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/wellcome3.png?alt=media&token=9dd55b7d-3cf1-46e1-8c92-f447e8630b08'/></div>
        <h1 className=' p-4 text-4xl'>To Get The Right People For You!</h1>
      </div>
      <div className=' flex items-center justify-around'>
        <h1 className=' p-4 text-4xl'>To Connect With Right People!</h1>
        <div className=' p-4'><img   src='https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/wellcome4.png?alt=media&token=9dd55b7d-3cf1-46e1-8c92-f447e8630b08'/></div>
      </div>
      <div className='flex justify-center'>
      <div className='grid-cols-6  p-6 flex items-center space-x-4'>
        <button onClick={navigatetoSignIn} className='bg-white text-user px-4 py-2 rounded w-40 border-user border'>Sign In</button>
        <button onClick={navigatetoSignUp} className='bg-user text-white px-4 py-2 rounded w-40'>Sign Up</button></div>
      </div>
    </div>
  )
}

export default Wellcome
