import React from 'react'

const ConnectionList = () => {
  return (
    <div className='rounded-xl bg-white mt-4 mr-10 ml-5 overflow-hidden p-4'>
      <div className='flex justify-between'><h1 className='text-xl font-bold'>Connections</h1><span>See All</span></div>
      <div className='flex'>
        <div><img src="https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/login.png?alt=media&token=9dd55b7d-3cf1-46e1-8c92-f447e8630b08" className='w-10 h-10 rounded-full m-2' alt="" /></div>
        <div><h1 className='text-xl'>Sunder Pichai</h1><p className=' text-xs'>CEO at Google</p></div>
      </div>
    </div>
  )
}

export default ConnectionList
