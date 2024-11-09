import React from 'react'

const ProfilePart = ({formik,move}) => {
  return (
    <div>
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                {...formik.getFieldProps('name')}
                className="w-full p-2 border rounded"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Phone Number*</label>
              <input
                type="number"
                name="name"
                {...formik.getFieldProps('number')}
                className="w-full p-2 border rounded appearance-none"
              />
              {formik.touched.number && formik.errors.number && (
                <div className="text-red-500 text-sm">{formik.errors.number}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Position*</label>
              <input 
                type="text"
                name="position"
                {...formik.getFieldProps('position')}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email*</label>
              <input
                type="string"
                name="email"
                {...formik.getFieldProps('email')}
                className="w-full p-2 border rounded"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button type='button'
              onClick={move}
                className="bg-blue-500 text-white px-4 hover:bg-blue-600 py-2 rounded"
              >
                Next 
              </button>
            </div>
            </div>
  )
}

export default ProfilePart
