import React from 'react'

const UserCard = ({user}) => {
  return (
    <div>
            <div className="mb-4 text-sm text-gray-700">
                <span className=" ">Name*</span>
                <div className='font-medium'>{user.name}</div>
            </div>
            <div className="mb-4">
              <label className="block">Phone Number*</label>
              <div className='font-medium'>{user.number}</div>
            </div>
            <div className="mb-4 text-sm text-gray-700">
              <label className="block ">Position*</label>
              <div className='font-medium'>{user?.postion}</div>
            </div>
            <div className="mb-4 text-sm text-gray-700">
              <label className="block ">Email*</label>
              <div className='font-medium'>{user.email}</div>
            </div>
    </div>
  )
}

export default UserCard
