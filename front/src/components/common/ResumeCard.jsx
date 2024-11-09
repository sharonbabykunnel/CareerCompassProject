import { Download } from 'lucide-react'
import React from 'react'

const ResumeCard = ({resume}) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl ">Resume</h1>
      
      {resume.map((res) => (
        <div key={res._id} className="flex items-center justify-between w-full  border rounded-lg shadow-sm">
          <div className="flex ">
            <div className="bg-gray-600 text-white px-4 py-1 rounded-l-lg font-semibold flex items-center">
              {res.resume?.split('name')[1].split('?')[0].split('.')[1]}
            </div>
            <div className="ml-4 my-4">
              <div className="text-lg font-medium">{res.resume?.split('name')[1].split('?')[0].replaceAll('%', ' ')}</div>
              <div className="text-gray-500 text-sm">
                Last used on {new Date(res?.updatedAt)?.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ResumeCard
