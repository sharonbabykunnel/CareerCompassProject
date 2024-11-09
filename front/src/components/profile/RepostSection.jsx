import React, { useEffect, useState } from 'react'
import Content from '../post/Content';
import api from '../../axios/userInterceptor';
import { useSelector } from 'react-redux';
import { Success } from '../../helpers/popup';

const RepostSection = () => {
    const user = useSelector(state => state.presisted.user);
    const [rePosts,setRePosts] = useState([])
    useEffect(()=>{
        const getSavedPosts = async ()=>{
            const response = await api.get(`/post/rePosted/get/${user.uid}`)
            setRePosts(response.data);
        }
        getSavedPosts()
    },[])
    if(rePosts.length === 0){
        return (
          <div className=' col-start-2 col-end-4 mt-4 p-4 h-[30vh] rounded-xl flex justify-center items-center bg-white'>
            <p>No Posts yet</p>
          </div>
        )
      }

      const removeRepost = async (uid)=>{
        const response = await api.delete(`/post/rePosted/remove/${user.uid}/${uid}`)
        if (response.data){
            setRePosts(state => state.filter(item => item.uid !== uid))
            Success('Post removed from reposts')
        }
      }
  return (
    <div>
        {Array.isArray(rePosts) && rePosts?.map((post,index)=><Content removeRepost={removeRepost} key={post._id} post={post} user={post.user[0]} index={index} currentUserId={user.uid} />)} 
    </div>
  )
}

export default RepostSection
