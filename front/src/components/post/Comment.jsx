import React, { useState } from 'react'
import CommentMessage from './CommentMessage'
import api from '../../axios/userInterceptor'

const Comment = ({src, value, setValue, post, comment,likeComment,handlePostReply}) => {
    return (
        <div className=''>
            <div className='flex flex-col px-4'>
                <div className='flex items-center mb-2'>
                    <img src={src} className='w-10 h-10 rounded-full mr-4' alt="" />
                    <input
                        className="flex-grow h-10 bg-white text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:bg-lite_user outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-lite_user"
                        autoComplete='off'
                        placeholder="Add your comment..."
                        value={value}
                        onChange={(e)=>setValue(e.target.value)}
                        type="text"
                    />
                </div>
            {value && 
                <div className='flex justify-end mt-2'>
                <button onClick={post} className='bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300'>
                    Post
                </button>
            </div>     
            }
            </div>
            <div>
                {comment?.map((comment,index)=><CommentMessage key={comment._id} src={src} cindex={index} comment={comment} likeComment={likeComment} ind={index} handlePostReply={handlePostReply}/>)}
            </div>
        </div>
    )
}

export default Comment