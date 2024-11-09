import React from 'react'

const ImageCard = ({url, name, toggleFunction}) => {
  return (
      <div className='flex'><img src={url} alt={name} onClick={toggleFunction} /><span className='pl-3'>{name}</span></div>
  )
}

export default ImageCard
