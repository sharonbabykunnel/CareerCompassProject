import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { BASE_URL, aws_url } from '../../../../const/url';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';

const Posts = () => {
    const [posts,setPosts] = useState([]);
    const [totalPosts,setTotalPosts] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate()
    const postPerPage = 10

    const fetchPosts = async()=>{
        try {
            const result = await axios.get(`${BASE_URL}/admin/getAllPosts/${currentPage}`)
            setPosts(result.data.posts[1])
            setTotalPosts(result.data.posts[0])
        } catch (error) {
            toast.error(error.message);
        }
    }

    const navegateToPost = (index)=>{
      navigate('/admin/post',{state:{post:posts[index]}})
    }

    const paginate = (pageNumber)=> setCurrentPage(pageNumber)

    useEffect(()=>{
        fetchPosts();
    },[currentPage])
  
    const renderContent = (post) => {
      const { text, images, video } = post.content;
      const allContent = [...(images || []), ...(video || [])];
  
      return (
        <div className="mb-4">
          {allContent.length > 0 && (
            <Carousel showThumbs={false}>
              {allContent.map((item, index) => (
                <div key={index}>
                  {images && images.includes(item) ? (
                    <img src={item} alt={`Content ${index + 1}`} className="w-1/2 object-cover" />
                  ) : (
                    <video src={item} controls className="w-1/2  object-cover" />
                  )}
                </div>
              ))}
            </Carousel>
          )}
        </div>
      );
    };

  return (
    <div className="users-management bg-lavender-100 p-6 rounded-lg shadow-md  h-[80vh] flex flex-col ">
      <div className="header mb-6">
        <h1 className='text-2xl font-semibold text-gray-800'>Post Management</h1>
      </div>
      <div className="table-container bg-white rounded-lg scrollbar-hide flex-grow overflow-scroll">
        <table className='w-full '>
          <thead className="bg-lavender-200">
            <tr className='text-left'>
              <th className="py-3 px-4">Content</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Post date</th>
              <th className="py-3 px-4">status</th>
              <th className="py-3 px-4">Option</th>
            </tr>
          </thead>
          <tbody className=''>
            {Array.isArray(posts) && posts.map((post,index) => (
              <tr key={post._id}  className={`border-b ${post?.isBlocked ? 'bg-red-600' : post?.reported && post?.reported.length > 0 && 'bg-red-100'} border-lavender-100 hover:bg-lavender-50`}>
                <td className='py-3 px-4 flex items-center'>
                    {renderContent(post)}
                </td>
                <td className='py-3 px-4'>{post.user[0].name}</td>
                <td className='py-3 px-4'>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className='py-3 px-4'>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${post?.isBlocked ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'}`}>
                    {post.isBlocked ? 'Blocked' : 'Unblocked'}
                  </span>
                </td>
                <td className='py-3 px-4'>
                  <td
                    onClick={()=>navegateToPost(index)}
                    className="py-2 px-4 border-b text-center text-sm text-blue-600 cursor-pointer hover:text-blue-500"
                  >
                    View More
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="mt-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          New posts
        </button>
      </div> */}
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
              {[...Array(Math.ceil(totalPosts / postPerPage)).keys()].map(
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
                  currentPage === Math.ceil(totalPosts / postPerPage)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(totalPosts / postPerPage)
                }
              >
                Next
              </button>
            </div>
    </div>
  );
}

export default Posts
