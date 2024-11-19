import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ThumbsUp, MessageCircle, Share2, Flag, AlertTriangle, UserX, UserCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import adminApi from '../../../axios/adminInterceptor';
import { Success } from '../../../helpers/popup';

const AdminPostDetail = ({  onBlockPost }) => {
    const [user, setUser] = useState(null)
    const location = useLocation()
  const [isBlocked, setIsBlocked] = useState();
  const [post, setPost] = useState(null);

  useEffect(()=>{
    setIsBlocked(location?.state?.post?.isBlocked)
    const fetchUser = async ()=>{
        const response = await adminApi.get(`/post/get/${location.state.post.uid}`)
        if(response.data){
            setUser(response.data[0].user)
            setPost(response.data[0])
        } 
    }
fetchUser();
  },[])


  const handleBlockPost = async () => {
    const response = await adminApi.patch(`/post/${post.uid}/block`);
    setIsBlocked(true)
    Success('Post Blocked')
  };

  const handleUbBlockPost = async () => {
    const response = await adminApi.patch(`/post/${post.uid}/unblock`);
    setIsBlocked(false)
    Success('Post UnBlocked')
  };

  const renderContent = () => {
    const { text, images, video } = post.content;
    const allContent = [...(images || []), ...(video || [])];

    return (
      <div className="mb-4">
        {text && <p className="text-gray-700 mb-2">{text}</p>}
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
      <div className="bg-white shadow-lg h-[80vh] rounded-lg overflow-scroll scrollbar-hide">
      {post && user && <>
                <div>
        <div className="flex items-center m-4 mb-0 gap-2"> 
        <Link to='/admin/posts'>
        <img className="w-8" src='https://cdn-icons-png.flaticon.com/128/3114/3114883.png'/> 
        </Link>
        <div>Go back</div> 
      </div>
    </div>
      <div className="p-4 pt-0 shadow h-full  ">
      <div className='flex items-center justify-between m-4'>
                <div className='flex items-center gap-4 relative'>
                <img src={user?.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'} alt="" className='w-10 h-10 rounded-full' />
                <div>
                    <h1 className='text-xl'>{user?.name}</h1>
                    <p className=' text-xs'>{user?.position}</p>
                </div>
                </div>
                <div>
                <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleString()}
                </span>
                </div>
            </div>

        {renderContent()}

        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <span className="flex items-center">
              <ThumbsUp className="w-5 h-5 mr-1" /> {post.likes.length}
            </span>
            <span className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-1" /> {post.comments.length}
            </span>
            <span className="flex items-center">
              <Share2 className="w-5 h-5 mr-1" /> {post.shares.length}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            Visibility: {post.visibility}
          </span>
        </div>

        {post.tags.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Tags:</h3>
            <div className="flex flex-wrap">
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {Array.isArray(post?.reported) && post?.reported?.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <strong className="font-bold">Post Reported</strong>
            </div>
            <span className="block sm:inline">This post has been reported {post.reported.length} times.</span>
          </div>
        )}

        {!isBlocked && post?.reported && post.reported.length > 0 && (
          <button 
            onClick={handleBlockPost} 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center"
          >
            <UserX className="w-5 h-5 mr-2" />
            Block Post
          </button>
        )}

        {isBlocked && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <strong className="font-bold">Post Blocked</strong>
          </div>
          <span className="block sm:inline">This post has been blocked due to reports.</span>
        </div>
        )}

        {isBlocked && post?.reported && post.reported.length > 0 && (
          <button 
            onClick={handleUbBlockPost} 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-4 rounded w-full flex items-center justify-center"
          >
            <UserCheck className="w-5 h-5 mr-2" />
            Unblock Post
          </button>
        )}
      </div>
      </>}
    </div>
  );
};

export default AdminPostDetail;