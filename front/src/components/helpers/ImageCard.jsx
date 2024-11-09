import React from 'react'

const ImageCard = ({ url, index}) => {
  return (
    <div key={index} className='flex flex-col items-center justify-center w-[60%]'>
        <img src={url} alt="Selected Image" className='max-h-96 max-w-96 object-contain' />
    </div>
  )
}

export default ImageCard
