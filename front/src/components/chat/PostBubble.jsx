import { User, X } from 'lucide-react';
import React, { useState } from 'react'
import Content from '../post/Content';
import api from '../../axios/userInterceptor';
import { useSelector } from 'react-redux';
import Modal from 'react-modal'
import PopupContent from '../common/PopupContent';

const PostBubble = ({chat,isUser}) => {
    const [post, setPost] = useState(null)
    const [isExpanded,setIsExpanded] = useState(false);
    const [popup, setPopup] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const user = useSelector(state => state.presisted.user)
    const handlePostClick = async ()=>{
        const response = await api.get(`/post/get/${chat.contentData.uid}`);
        setPost(response.data[0]);
        setPopup(true)
    }

    const closePopupModal = ()=>{
        setPopup(false)
    }

    const likePost = ()=>{
        setPost(state => state.likes.includes(user) ? state.likes.filter(item => item != user.uid) : state.likes.push(user.uid))
    }
    const commentPost = (comment)=>{
        setPost(state => ({...state,comments:[comment,...state.comments]}))
    }
  return (<>
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`} onClick={handlePostClick}>
      {!isUser &&<User/>}
      <div className={`max-w-xs ${isUser ? 'bg-purple-100' : 'bg-gray-100'} rounded-lg p-3`}>
    <div className=' col-start-2 col-end-4 mt-4 p-4 rounded-xl bg-white'>
        <div></div>
        <div>
            <div className='flex items-center justify-between m-4'>
                <div className='flex items-center gap-4 relative'>
                <img src={chat.postedUser[0]?.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'} alt="" className='w-10 h-10 rounded-full' />
                <div>
                    <h1 className='text-xl'>{chat.postedUser[0]?.name}</h1>
                    <p className=' text-xs'>{chat.postedUser[0]?.position}</p>
                </div>
                </div>
            </div>
            <div className='py-4 flex pr-20'><p className={` overflow-hidden break-words  ${isExpanded ? 'max-h-full' : 'max-h-6'}`} >{chat.contentData?.text}</p>
            <button onClick={()=>setIsExpanded(!isExpanded)} className='text-blue-500 text-xs w-full'>{isExpanded ? 'Read Less' : 'Read More'}</button>
            </div>
            <div className="relative">
            <div>
                    {chat?.contentData.files?.[currentImageIndex].split('/')?.[7]?.includes('.mp4') ? (
                        <video 
                            src={chat?.contentData?.files?.[currentImageIndex]} 
                            controls 
                            className="w-full h-auto"
                        />
                    ) : (
                        <img 
                            src={chat?.contentData?.files?.[currentImageIndex]} 
                            alt="" 
                            className="w-full h-auto"
                        />
                    )}
                </div>
                <div className="flex justify-center mt-2">
                    {chat?.contentData?.files?.map((_, index) => (
                        <div 
                            key={index} 
                            className={`h-2 w-2 rounded-full mx-1 ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                            onClick={() => setCurrentImageIndex(index)}
                        ></div>
                    ))}
                </div>
                {chat?.contentData?.files?.length > 1 && (
                    <>
                        <button 
                            onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + chat?.contentData?.files?.length) % chat?.contentData?.files?.length)} 
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r"
                        >
                            &lt;
                        </button>
                        <button 
                            onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % chat?.contentData?.files?.length)} 
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l"
                        >
                            &gt;
                        </button>
                    </>
                )}
            </div>
        </div>
    </div>
    <p className="text-sm">{chat.caption}</p>
    <p className="text-xs text-gray-500 mt-1">{new Date(chat.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, })}</p>
    </div>
    </div>
    <Modal
        isOpen={popup}
        className="fixed inset-0 flex items-center justify-center z-50 "
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white  rounded-lg shadow-lg w-full max-w-lg mx-auto h-  ">

          <PopupContent post={post} user={chat.postedUser[0]} userDetails={user} currentUserId={user.uid} commentPost={commentPost} closePopupModal={closePopupModal} />
        </div>
    </Modal>
    </>
  )
}

export default PostBubble
