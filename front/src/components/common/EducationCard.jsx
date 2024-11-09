import React from 'react'

const EducationCard = ({education,removeEdu}) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl ">Education</h1>
      {education.map((edu,ind) => 
      <div key={edu._id} className=" p-4 bg-white border rounded-lg shadow-sm mb-4">
      <div className="">
        <div className="space-y-2">
          <div className="flex ">
            <span className="">School *</span>
            <span className='ml-3 font-medium'>{edu.institute || '--'}</span>
          </div>
          <div className="flex justify-">
            <span className="">City</span>
            <span className='ml-3 font-medium'>{edu.location || '--' }</span>
          </div>
          <div className="flex ">
            <span className="">Degree</span>
            <span className='ml-3 font-medium'>{edu.course || '--'}</span>
          </div>
          <div className="flex ">
            <span className="">Major / Field of study</span>
            <span className='ml-3 font-medium'>{edu.fieldOfStudy}</span>
          </div>
          <div className="flex">
            <span className="">Dates attended *</span>
            <span className='ml-3 font-medium'>{new Date(edu.startDate).toLocaleDateString([],{year:'numeric',month:'short',day:'numeric'})} – {new Date(edu.endDate).toLocaleDateString([],{year:'numeric',month:'short',day:'numeric'})}</span>
          </div>
        </div>
      </div>
      {removeEdu && <div className=" flex justify-end items-end">
          <button className="text-blue-600 mr-4" onClick={()=>removeEdu(ind)}>Remove</button>
          {/* <button className="text-blue-600 ">Edit</button> */}
      </div>}
    </div>  
    )}
    </div>
  )
}

export default EducationCard
