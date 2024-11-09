import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import api from '../../axios/userInterceptor';
import { removeApost, updateComment, updateCommentLike, updatePostLike, updatePostSave } from '../../../utils/postSlice';

import { LucideOption, LucideRemoveFormatting, MoreHorizontal, Option, OptionIcon, RemoveFormatting, RemoveFormattingIcon, Search, X, XCircle } from 'lucide-react';
import  AvatarCirclesDemo  from '../common/AvatarCircles';
import Modal from 'react-modal'
import { Failed, Success } from '../../helpers/popup';
import SearchBar from '../common/SearchBar';
import Comment from '../post/Comment';

const PopupContent = ({post,user,currentUserId,updateQuerryLike,commentPost,userDetails,updatePostList,filter,removeRepost,closePopupModal}) => {
    const dispatch = useDispatch()
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(post?.likes?.some(item => item.uid === currentUserId));
    const [comment, setComment] = useState('');
    const [showComment,setShowComment] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [showOptions, setShowOptions] = useState(false);
    const [isSaved, setIsSaved] = useState(post?.saved?.some(item => item.uid === currentUserId));
    const [connections, setConnections] = useState([])
    const showOptionRef = useRef();
    const [search, setSearch] = useState('')
    const [selected,setSelected] = useState([]);
    const [caption, setCaption] = useState('')
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [reason,setReason] = useState('')
    const [isOpenLike, setIsOpenLike] = useState(false)
    const [likedUsers,setLikedUsers] = useState([])
    const showLikedUsers = async (id)=>{
        const response = await api.get(`/post/like/likedUsers/${id}`)
        setLikedUsers(response.data[0])
        setIsOpenLike(true)
    }
    
    const closeModalLike = ()=>{
        setIsOpenLike(false)
        setLikedUsers([])
    }

    useEffect(()=>{
        const handleOutSideClick = (e)=>{
            if(showOptionRef.current && !showOptionRef.current.contains(e.target)){
                setShowOptions(false)
            }
        }
        

        document.addEventListener('mousedown',handleOutSideClick);

        return ()=> document.addEventListener('mousedown',handleOutSideClick);
    });

    const handlePostReply = async(value,mention,post,cindex) => {
      
        const response  = await api.post('/comment/addReply',{text:value,post,user:user.uid,mention});
      }

    const closeModal = ()=>{
        setIsOpen(false)
    }

    const uploadComment = async()=>{
        try {
            await api.post('/comment/post',{text:comment,post:post?.uid,user:currentUserId});
            let currentComment = {post:post?.uid,text:comment,user:userDetails,likes:[],status:'active'}
            commentPost(currentComment)
            setComment('')
        } catch (error) {
            console.error(error);
        }
    }

    const likeComment = useCallback(async(comment,ind)=>{
        try {
            await api.post('/comment/like',{user:userDetails?.uid,comment});
            
        } catch (error) {
            console.error(error);
        }
    },[user?.uid,post]);

    const handleCommentChange = (e) => {
        setComment(e)
    }

    const giveOptions = ()=>{
        setShowOptions(true)
    }

    const deletePost = async ()=>{
        try {
            const response = await api.delete('/post/delete?post='+post?.uid)
              Success('Poste deleted')
            if(pindex != undefined) updatePostList(pindex,index);
              else dispatch(removeApost(response.data.deleted))
        } catch (error) {
          Failed(error.response.data.message ? error.response.data.message : error.message)
        }
    }

    const hidePost = async ()=>{
        try {
            const response = await api.patch('/post/hide?post='+post?.uid)
            if(pindex != undefined) updatePostList(pindex,index)
              else dispatch(removeApost(response.data.hided))
        } catch (error) {
          Failed(error.response.data.message ? error.response.data.message : error.message)
        }
    }

    const reportPost = async ()=>{
        try {
            const response = await api.patch(`/post/reportPost/${post.uid}`,{reason,user:currentUserId})
            if(response.data.modified){
              updatePostList(pindex,index)
              Success('Reported')
            } else Failed('Allready Reported')
            closeReportModal()
            setReason('');
        } catch (error) {
            Failed(error.message)
        }
    }

    const handleReport =  ()=>{
      try {
        setIsReportOpen(true)
        setShowOptions(false);
      } catch (error) {
        Failed(error.message)
      }
    }

    const handleNotIntrested = async ()=>{
        try {
            const response = await api.patch(`/post/notInterest/${post.uid}/${currentUserId}`)
            if(response.data.modifiedCount) {
                updatePostList(pindex,index)
            Success('Removed')
            }
        } catch (error) {
            Failed(error.message)
        }
    }
    
    const handleClick = async ()=>{
        setIsLikedByCurrentUser(!isLikedByCurrentUser)
        try {
            await api.post('/post/like',{postId:post?._id, userId: currentUserId});
            if(pindex != undefined){
                updateQuerryLike(pindex,index,currentUserId,isLikedByCurrentUser)
            }else dispatch(updatePostLike({index,userId:currentUserId,isLiked:isLikedByCurrentUser}))
        } catch (error) {
          Failed(error.response.data.message ? error.response.data.message : error.message)
            setIsLikedByCurrentUser(!isLikedByCurrentUser)
        }
    }

    const handleShareClick = async ()=>{
        setIsOpen(true)
        const response = await api.get('/connection/'+currentUserId);
        setConnections(response.data);

    }

    const handleShare = async()=>{
        const response = await api.post(`/chat/post/share/${currentUserId}`,{selected,post:post._id,caption})
        if(response.data){
            Success('Shared post')
            setCaption('');
            closeModal()
        }

    }

    const handleRepost = async ()=>{
        const response = await api.post(`/post/repost/${currentUserId}`,{post:post._id})
        if (response.data?.modified) Success("Reposted")
            else Failed('Allready Posted')
    }

    const searchConnection = async()=>{
        const response = await api.get(`/connection/connection/search/${currentUserId}?value=${search}`);
        setConnections(response.data);
      }

    const closeReportModal = ()=>{
      
        setIsReportOpen(false)
    }

    const handleSave = async()=>{
        try {
            setIsSaved(!isSaved);
            await api.post('/post/save',{user:currentUserId,post:post?.uid});
            if(filter) filter(post._id)
            if(pindex != undefined){
                updateQuerrySave(pindex,index,isSaved,currentUserId)
            }else{
                dispatch(updatePostSave({index,user:currentUserId,isSaved}))

            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleComment = async ()=>{
        const response = await api.get(`/comment/getComments/${post.uid}`);
        setShowComment(!showComment)
    }
    const selecteUser= (choosedUser)=>{
        const check = selected.includes(choosedUser)
        if(check) setSelected(selected.filter(item => item != choosedUser))
        else setSelected([...selected,choosedUser])
    }
  return (
    <div className={` col-start-2 col-end-4   rounded-xl ${post?.isBlocked ? 'bg-red-100' : 'bg-white'} max-h-[80vh] overflow-scroll scrollbar-hide`}>
        <div></div>
        <div>
            <div className='flex items-center justify-between m-4'>
                <div className='flex items-center gap-4 relative'>
                <img src={user?.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'} alt="" className='w-10 h-10 rounded-full' />
                <div>
                    <h1 className='text-xl'>{user?.name}</h1>
                    <p className=' text-xs'>{user?.position}</p>
                </div>
                </div>
                  <button onClick={closePopupModal} className="focus:outline-none">
                    <X />
                  </button>
            </div>
            <p className="text-gray-600 mb-2 ml-4 ">
                      {isExpanded
                        ? post.content.text
                        : `${post?.content.text?.slice(0, 100)}`}
                      {post.content.text?.length > 50 && (
                        <button
                          onClick={()=>setIsExpanded(!isExpanded)}
                          className="text-blue-500 ml-2 text-sm"
                        >
                          {isExpanded ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </p>
            <div className="relative">
            <div>
                    {post?.files?.[currentImageIndex].split('/')?.[7]?.includes('.mp4') ? (
                        <video 
                            src={post?.files?.[currentImageIndex]} 
                            controls 
                            className="w-full h-auto"
                        />
                    ) : (
                        <img 
                            src={post?.files?.[currentImageIndex]} 
                            alt="" 
                            className="w-full h-auto"
                        />
                    )}
                </div>
                <div className="flex justify-center mt-2">
                    {post?.files?.map((_, index) => (
                        <div 
                            key={index} 
                            className={`h-2 w-2 rounded-full mx-1 ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                            onClick={() => setCurrentImageIndex(index)}
                        ></div>
                    ))}
                </div>
                {post?.files?.length > 1 && (
                    <>
                        <button 
                            onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + post?.files?.length) % post?.files?.length)} 
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r"
                        >
                            &lt;
                        </button>
                        <button 
                            onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % post?.files?.length)} 
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l"
                        >
                            &gt;
                        </button>
                    </>
                )}
            </div>
        </div>
        <div className='flex justify-between m-4 mb-2'>
        <div className='flex flex-col items-center gap-2'>
            <img onClick={()=>handleClick()} 
                src={isLikedByCurrentUser 
                ? "https://cdn-icons-png.flaticon.com/128/739/739231.png"  // Filled heart icon
                : "https://cdn-icons-png.flaticon.com/128/126/126473.png"   // Empty heart icon
                } 
                alt="likes"  
                className='h-6'
            />
            <div onClick={()=>showLikedUsers(post.uid)}>
            <AvatarCirclesDemo   numPeople={post.likes.length} avatar={post.likedBy} />
            </div>
            
      <Modal
        isOpen={isOpenLike}
        className="fixed inset-0 flex items-center justify-center z-20 mt-[80px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg  shadow-lg w-full z-30 max-w-lg mx-auto h-[80vh] overflow-auto scrollbar-hide">
        <div className="flex justify-between   ">
          <h2 className="text-2xl font-semibold mb-4">
            Liked by
          </h2>
          <X onClick={closeModalLike}/>
          </div>
          <div>
          </div>
          <div className='h-[50vh] my-2 overflow-auto scrollbar-hide rounded-t-lg '>
          <div className='rounded shadow'>
          {likedUsers.users?.map((user,index) => (
          <div key={user._id} className={`flex items-center justify-between 'bg-lite_user'  p-4 `}>
            <div className="flex items-center">
              <img src={user.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'} alt='' className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h2 className="font-bold">{user.name}</h2>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span>{user?.about}</span>
                </div>
              </div>
            </div>
          </div>))}
        </div>
        </div>
        </div>
        </Modal>
        </div >
            <div><img onClick={handleComment}
                        src="https://cdn-icons-png.flaticon.com/128/1380/1380338.png" alt="" className='h-6'/>{post?.comments?.length}</div>
            <div>
            {removeRepost ? 
            <XCircle onClick={()=>removeRepost(post.uid)}/> :    <img
            onClick={handleRepost}
             src="https://cdn-icons-png.flaticon.com/128/2734/2734827.png" alt="" className='h-6'/>}
             </div>
            <div><img 
            onClick={handleShareClick}
            src="https://cdn-icons-png.flaticon.com/128/3024/3024593.png" alt="" className='h-6'/></div>
            <div>
                <img onClick={handleSave}
                src={isSaved 
                ? 'https://cdn-icons-png.flaticon.com/128/102/102279.png'
                : 'https://cdn-icons-png.flaticon.com/128/5662/5662990.png'
            } alt="" className='h-6'/>{post?.saved?.length || 0}</div>
        </div>
        {showComment && <Comment showLikedUsers={showLikedUsers} src={userDetails?.profilePhoto} value={comment} setValue={(e)=>handleCommentChange(e)} post={uploadComment} comment={post?.comments} likeComment={likeComment} handlePostReply={handlePostReply}/>}
        <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50 mt-[80px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto h-[80vh] overflow-auto scrollbar-hide">
        <div className="flex justify-between   ">
          <h2 className="text-2xl font-semibold mb-4">
            Share
          </h2>
          <X onClick={closeModal}/>
          </div>
          <div>
            <SearchBar searchFun={searchConnection} search={search} setSearch={setSearch} />
          </div>
          <div className='h-[50vh] my-2 overflow-auto scrollbar-hide rounded-t-lg '>
          <div className='rounded shadow'>
          {connections?.map((connection) => (
          <div key={connection._id} className={`flex items-center justify-between ${selected.includes(connection.otherUser.uid) ? 'bg-lite_user' :"bg-white " } p-4 `}>
            <div className="flex items-center">
              <img src={connection.otherUser.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'} alt={connection.name} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h2 className="font-bold">{connection.otherUser.name}</h2>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span>{connection.otheruser?.about}</span>
                </div>
              </div>
            </div>
            <input type="checkbox"
            onChange={()=>selecteUser(connection.otherUser.uid)} />
          </div>))}
        </div>
        </div>
        <div className='mb-l-4 flex'>
            <input
            class="flex  w-full rounded-l-full bg-violet-100 text-xl border-2 border-lite_user p-4 placeholder-lite_user text-black focus:lite_user focus:outline-none focus:ring-2 focus:lite_user"
            placeholder="Enter anything..."
            value={caption}
            onChange={(e)=>setCaption(e.target.value)}
            />
        <div className='flex justify-end'>
            <button
            disabled= {!selected.length }
            onClick={handleShare}
                className="py-2.5 px-5 ml-l-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-r-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >Send </button>
        </div>
        </div>
        </div>
        </Modal>
        <Modal
        isOpen={isReportOpen}
        onRequestClose={closeReportModal}
        className="fixed inset-0 flex items-center justify-center z-50 mt-[80px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto  overflow-auto scrollbar-hide">
        <div className="flex justify-between   ">
          <h2 className="text-2xl font-semibold mb-4">
            Report
          </h2>
          <X onClick={closeReportModal}/>
          </div>
          <div>
            <h4>Select a reason that applies</h4>
            <div>
                <label className="block mb-2"></label>
                <select
                  name="employmentType"
                  value={reason}
                  onChange={(e)=> setReason(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="" label="Select" />
                  <option value="Harassment" label="Harassment" />
                  <option value="Spam" label="Spam" />
                  <option value="Hateful speech" label="Hatefull" />
                  <option value="Sexual content" label="Sexual content" />
                  <option value="Fake account" label="Fake account" />
                  <option value="Child exploitation" label="Child exploitation" />
                  <option value="Other" label="Other" />
                </select>
              </div>
              <button
              onClick={reportPost}
                className="text-blue-500 hover:text-blue-900 p-4 bg"
              >
                Submit
              </button>
          </div>
        </div>
        </Modal>
    </div>
  )
}

export default PopupContent
