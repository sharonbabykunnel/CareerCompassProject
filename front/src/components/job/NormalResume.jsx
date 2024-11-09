import React from 'react'

const NormalResume = ({res}) => {
  return (
    <div  className="flex items-center justify-between w-full  border rounded-lg shadow-sm">
    <div className="flex ">
      <div className="bg-gray-600 text-white px-4 py-1 rounded-l-lg font-semibold flex items-center">
        {res.name.split('.')[1]}
      </div>
      <div className="ml-4 my-4">
        <div className="text-lg font-medium">{res.name}</div>
        <div className="text-gray-500 text-sm">
          Last used on {new Date()?.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })}
        </div>
      </div>
    </div>
  </div>
  )
}

export default NormalResume
