import React from 'react'

const ExperienceCard = ({experiences,removeClick}) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl ">Experience</h1>
      {experiences.map((exp,ind)=>
      <div key={exp._id} className="p-4 bg-white border rounded-lg shadow-sm mb-4">
      <div className="mt-2">
        <div className="text-sm flex text-gray-700">
          <span className="">Your title :-</span>
          <div className="mt-1 font-medium ml-2">{exp.position}</div>
        </div>
        <div className="text-sm flex text-gray-700 mt-3">
          <span className="">Company :- </span>
          <div className="mt-1 font-medium ml-2">{exp.company}</div>
        </div>
        <div className="text-sm flex text-gray-700 mt-3">
          <span className="">Dates of employment :-</span>
          <div className="mt-1 font-medium ml-2">{new Date(exp.startDate).toLocaleDateString([],{year:'numeric',month:'short',day:'numeric'})}</div>
        </div>
        <div className="text-sm flex text-gray-700 mt-3">
          <span className="">City :-</span>
          <div className="mt-1 font-medium ml-2">{exp.city},{exp.state}</div>
        </div>
        <div className="text-sm flex text-gray-700 mt-3">
          <span className="">Description :-</span>
          <div className="mt-1 font-medium ml-2">{exp.description}</div>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-4 text-sm">
        {removeClick && <button className="text-blue-600 hover:underline" onClick={()=>removeClick(ind)}>Remove</button>}
        {/* <button className="text-blue-600 hover:underline">Edit</button> */}
      </div>
        </div>
)}
    </div>
  )
}

export default ExperienceCard
