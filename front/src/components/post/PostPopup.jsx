import React, { useRef, useState } from 'react';
import {BASE_URL} from '../../../const/url';
import axios from 'axios';


const PostPopup = ({ onClose ,openImage, openVideo, setValue, value, submit}) => {

  const toggleImage = ()=>{
    onClose();
    openImage();
  }

  const toggleVideo = ()=>{
    onClose();
    openVideo();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded-xl max-h-96 h-full w-full max-w-3xl">
        <div className='flex justify-between'>
        <h2 className="text-xl font-bold mb-4">Create a Post</h2>
        <img onClick={onClose} className='w-4 h-4' src="https://cdn-icons-png.flaticon.com/128/2976/2976286.png" alt="" />

        </div>
        <div className="flex w-full h-60  rounded mb-4 border-b">
          <textarea
            value={value}
            onChange={(e)=>setValue(e)}
            placeholder="What's on your mind?"
            className="w-full h-full p-2 resize-none border-none outline-none"
            style={{ boxShadow: 'none' }}
          ></textarea>
        </div>
        <div className='flex justify-between items-center'>
            <div className='flex gap-10'>
                <img className='w-10 h-10' src="https://cdn-icons-png.flaticon.com/128/739/739249.png" alt="" onClick={toggleImage}/>
                <img className='w-10 h-10' src="https://cdn-icons-png.flaticon.com/512/1294/1294269.png" alt="" onClick={toggleVideo} />
                <img className='w-10 h-10' src="https://cdn-icons-png.flaticon.com/128/748/748113.png" alt="" />
            </div>
          <button onClick={()=>submit()} className="bg-blue-500 text-white px-4 py-2 rounded">
            Post
          </button>
          </div>
      </div>

    </div>
  );
};

export default PostPopup;
