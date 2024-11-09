import React from 'react'

const UploadFromcomputer = ({setValue}) => {
  return (
    <div>
        <h1 className='m-4'>Select Files to begin</h1>
        <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
            Upload From Computer
            <input type="file" className="hidden" onChange={(e)=>setValue(e)} multiple />
        </label>
    </div>
  )
}

export default UploadFromcomputer
