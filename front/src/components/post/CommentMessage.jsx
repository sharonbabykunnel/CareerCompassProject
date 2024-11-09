import React, { useState } from 'react'
import api from '../../axios/userInterceptor'

const CommentMessage = ({comment, likeComment, ind, src,handlePostReply,cindex}) => {
    const [showReply, setShowReply] = useState(false)
    const [value, setValue] = useState('')

    const handleReplyComment = () => {
        setShowReply(!showReply);
    }

    const postReply = ()=>{
      handlePostReply(value,comment.user.uid,comment._id,cindex);
      setValue('')
    }

    return (
        <div className='border mb-2'>
            <div className='flex px-4 justify-items-center items-center'>
                <img src={comment.user?.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png' } className='w-10 h-10 rounded-full m-4' alt="User Pic" />
                <p>{comment.user.name}</p>
            </div>
            <div className='ml-8'>
            <p className='flex-grow w-full'>{comment?.text}</p>
            </div>
            <div className='flex justify-end'>
                <button onClick={() => likeComment(comment._id, ind,cindex)}>{comment?.likes?.length || 0} like</button>
                <button onClick={handleReplyComment} className='px-4 rounded-full'>
                  {comment?.replies?.length}  Reply 
                </button>
            </div>
            {showReply && (
                <div className='flex flex-col px-4'>
                    <div className='flex items-center mb-2'>
                        <img src={src} className='w-10 h-10 rounded-full mr-4' alt="" />
                        
                        <input
                            className="flex-grow h-10 bg-white text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:bg-lite_user outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-lite_user"
                            autoComplete='off'
                            placeholder="Add your reply..."
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            type="text"
                        />
                    </div>
                    {value && (
                        <div className='flex justify-end mt-2'>
                            <button onClick={postReply} className='bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300'>
                                Post Reply
                            </button>
                        </div>
                    )}
                </div>
            )}
            {showReply && comment.replies && comment.replies.length > 0 && (
                <div className='ml-8'>
                    {comment.replies.map((reply, replyIndex) => (
                        <div key={replyIndex} className='border mb-2'>
                        <div className='flex justify-between mr-2 items-center'>
                        <div className='flex px-4 justify-items-center items-center'>
                            <img src={reply.user?.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png' } className='w-10 h-10 rounded-full m-4' alt="User Pic" />
                            <p>{reply.user.name}</p>
                        </div>
                            <p>{new Date(reply.createdAt).toDateString()}</p>
                        </div>
                        <div className='ml-8'>
                        <p className='flex-grow w-full'>{reply?.text}</p>
                        </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CommentMessage