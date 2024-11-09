import React from 'react'
import ExperiencePart from './ExperiencePart'
import EducationPart from './EducationPart'
import EducationCard from '../common/EducationCard'
import ExperienceCard from '../common/ExperienceCard'
import ResumeCard from '../common/ResumeCard'
import ProfilePart from './ProfilePart'
import UserCard from '../common/UserCard'
import NormalResume from './NormalResume'

const JobApplicationOverview = ({user,experiences,education,resume}) => {
  return (
    <div>
        <div>
        <h6>Contact info</h6>
        <div className='flex gap-4 mt-4'>
            <img src={user?.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'} alt="" className='rounded-full w-20'/>
            <div>
            <h4>{user?.name}</h4>
            <p>{user?.about}</p>
            </div>
        </div>
        </div>
      <div>
        <div className='mt-4'>
        <UserCard user={user} />
        {resume.length > 0 && resume[0]?._id ?<ResumeCard resume={resume} /> : <NormalResume res={resume[0] }/>}
        <ExperienceCard experiences={experiences}/>
        <EducationCard education={education} />
        </div> 
      </div>
    </div>
  )
}

export default JobApplicationOverview
