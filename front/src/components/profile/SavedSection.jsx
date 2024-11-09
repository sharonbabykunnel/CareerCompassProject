import React, { useEffect, useState } from 'react'
import api from '../../axios/userInterceptor'
import { useSelector } from 'react-redux'
import Content from '../post/Content';

const SavedSection = () => {
    const user = useSelector(state => state.presisted.user);
    const [savedPosts,setSavedPosts] = useState([])
    useEffect(()=>{
        const getSavedPosts = async ()=>{
            const response = await api.get(`/post/savedPost/get/${user.uid}`)
            setSavedPosts(response.data);
        }
        getSavedPosts()
    },[])
    if(savedPosts.length === 0){
        return (
          <div className=' col-start-2 col-end-4 mt-4 p-4 h-[30vh] rounded-xl flex justify-center items-center bg-white'>
            <p>No Posts yet</p>
            
          </div>
        )
      }
      const filter = (id)=>{
        setSavedPosts(state=> state.filter(item => item._id !== id))
      }
  return (
    <div>
        {Array.isArray(savedPosts) && savedPosts?.map((post,index)=><Content key={post._id} filter={filter} post={post} user={post.user[0]} index={index} currentUserId={user.uid} />)} 
    </div>
  )
}

export default SavedSection
