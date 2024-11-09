import React from 'react'

const Button = ({name}) => {
  return (
    <div>
        <button className="bg-purple-700 text-white px-4 py-2 rounded-full">{name}</button>
    </div>
  )
}

export default Button
