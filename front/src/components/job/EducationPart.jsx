import React, { useState } from 'react'
import EducationCard from '../common/EducationCard'
import EducationModal from '../profile/EducationModal'

const EducationPart = ({education,moveToSubmit,moveBack,removeEdu,setEducation}) => {
  const [isOpen,setIsOpen] = useState(false);
  const [newEdu,setNweEdu] = useState(true);
  const showAdd = ()=>{
    setIsOpen(true)
  }
  const closeEditModal = ()=>{
    setIsOpen(false)
  }
  return (
    <div>
        <EducationCard education={education} removeEdu={removeEdu} />
        <div className='text-blue-500 mt-4' onClick={showAdd}>Add+</div>
        <EducationModal closeEditModal={closeEditModal} isEditModalOpen={isOpen} newEdu={newEdu} setEducation={setEducation}  />
    <div className="flex justify-end space-x-2 mt-4">
    <button type='button' className='text-blue-500  px-4 hover:bg-blue-200 mr-4' onClick={moveBack} >Back</button>

        <button
          onClick={moveToSubmit}
          type='button'
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default EducationPart
