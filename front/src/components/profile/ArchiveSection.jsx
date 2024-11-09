import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../../utils/postSlice';
import api from '../../axios/userInterceptor';
import Content from '../post/Content';

const ArchiveSection = () => {
    const user = useSelector(state => state.presisted.user);
    const [archives,setArchivese] = useState([])
    useEffect(()=>{
        const getSavedPosts = async ()=>{
            const response = await api.get(`/post/archive/get/${user.uid}`)
            setArchivese(response.data);
        }
        getSavedPosts()
    },[])
    if(archives.length === 0){
        return (
          <div className=' col-start-2 col-end-4 mt-4 p-4 h-[30vh] rounded-xl flex justify-center items-center bg-white'>
            <p>No Posts yet</p>
          </div>
        )
      }

    //   const removeRepost = async (uid)=>{
    //     const response = await api.delete(`/post/rePosted/remove/${user.uid}/${uid}`)
    //     if (response.data){
    //         setArchivese(state => state.filter(item => item.uid !== uid))
    //         Success('Post removed from reposts')
    //     }
    //   }
  return (
    <div>
        {Array.isArray(archives) && archives?.map((post,index)=><Content key={post._id} post={post} user={post.user[0]} index={index} currentUserId={user.uid} />)} 
    </div>
  )
}

export default ArchiveSection
