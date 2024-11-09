import React from 'react'

const SideManu = ({src, name, navigateSideMenu}) => {
return (
    <div className='flex sm:ml-6   w-10 h-10 p-2 m-2 ' onClick={navigateSideMenu}>
      <img src={src} alt="" />
      <div className='pl-8 sm:hidden md:block '><span>{name}</span></div>
    </div>
  )
}

export default SideManu
