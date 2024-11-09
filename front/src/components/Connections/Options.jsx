import { Plus } from 'lucide-react'
import React from 'react'

const Options = ({which, navigateto}) => {

  return (
    <div className="flex items-center" onClick={navigateto}>
    <span className="text-gray-700">{which}</span>
  </div>
  )
}

export default Options
