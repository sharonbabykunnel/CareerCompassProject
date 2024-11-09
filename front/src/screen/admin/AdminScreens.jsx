import React from 'react'
import BodyAdmin from '../../components/admin/BodyAdmin'
import HeaderAdmin from '../../components/admin/HeaderAdmin'

const AdminScreens = () => {
  return (
    <div className='bg-admin_lite h-screen'>
      <HeaderAdmin/>
      <BodyAdmin/>
    </div>
  )
}

export default AdminScreens
