import React, { useState } from 'react'
import ExperienceCard from '../common/ExperienceCard'
import ExperienceModal from '../profile/ExperienceModal'

const ExperiencePart = ({experiences,moveToEducation,moveBack,moveToExperience,removeClick,setExperiences}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [newExp,setNewExp] = useState(true)
  const [loading,setLoding] = useState(false)
  const showAdd = ()=>{
    setIsOpen(true)
  }
  const closeModal = ()=>{
    setIsOpen(false)
    moveToExperience()
  }
  return (
    <div>
        <ExperienceCard experiences={experiences} removeClick={removeClick} />
        <div className='text-blue-500 mt-4' onClick={showAdd}>Add+</div>
      <ExperienceModal closeEditModal={closeModal} isEditModalOpen={isOpen} newExp={newExp} setExpLoading={setLoding} setExperiences={setExperiences} />
          <div className="flex justify-end space-x-2 mt-4">
          <button type='button' className='text-blue-500  px-4 hover:bg-blue-200 mr-4' onClick={moveBack} >Back</button>
        <button
          onClick={moveToEducation}
          type='button'
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ExperiencePart
