import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../const/url';

const UsersList = () => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const userPerPage = 5; 
    const navigate = useNavigate();
  
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const result = await axios.get(`${BASE_URL}/admin/getAllUsers/${currentPage}`);
        setUsers(result.data.users[1]);
        setTotalUsers(result.data.users[0])
      } catch (error) {
        console.error('Error fetching users:', error);
      }finally{
        setLoading(false)
      }
    };
  
    const uniqueUser = async(index)=>{
      try {
        navigate('/admin/user',{state:{user:users[index]}});
      } catch (error) {
        console.error(error)
      }
    }
   
    useEffect(() => {
      fetchUsers();
    }, [currentPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full max-w-6xl   overflow-auto">
    <div className="flex justify-between items-center  mb-4">
      <h2 className="text-2xl font-semibold">
        Users list {totalUsers}
      </h2>
    </div>
    {loading ? (
      <div className="flex items-center justify-center h-[200px]">
        <ThreeCircles />
      </div>
    ) : (
      <>
        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <svg
              className="w-12 h-12 mb-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16h8M8 12h8M9 20h6a2 2 0 002-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <p className="text-gray-600 text-center">No Users yet</p>
          </div>
        ) : (
          <>
            <div className="overflow-auto max-h-[60vh] scrollbar-hide">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Photo</th>
                    <th className="py-2 px-4 border-b">Role</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Started In</th>
                    <th className="py-2 px-4 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className=''>
                      <td className="py-8 px-2 border-b text-center">
                        {user.name}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <img
                          src={user.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'}
                          alt="Developer"
                          className="w-10 h-10 object-cover rounded-full m-auto"
                        />
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {user.position}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {user.email}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                      {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user?.isBlocked  ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {user?.isBlocked ? 'blocked' : 'unblocked'}
                  </span>
                      </td>
                      <td
                        onClick={()=>uniqueUser(index)}
                        className="py-2 px-4 border-b text-center text-sm text-blue-600 cursor-pointer hover:text-blue-500"
                      >
                        View More
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-1">
              <button
                className={`px-4 py-2 border rounded-l-lg ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {[...Array(Math.ceil(totalUsers / userPerPage)).keys()].map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`px-4 py-2 border ${
                      currentPage === pageNumber + 1
                        ? "bg-gray-300"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => paginate(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </button>
                )
              )}
              <button
                className={`px-4 py-2 border rounded-r-lg ${
                  currentPage === Math.ceil(totalUsers / userPerPage)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(totalUsers / userPerPage)
                }
              >
                Next
              </button>
            </div>
          </>
        )}
      </>
    )}
  </div>
  )
}

export default UsersList
