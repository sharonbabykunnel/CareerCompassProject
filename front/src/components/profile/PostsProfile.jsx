import React, { useEffect, useState } from 'react'
import api from '../../axios/userInterceptor';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../../utils/postSlice';
import Content from '../post/Content';
import { useLocation } from 'react-router-dom';

const PostsProfile = () => {
  const location = useLocation()
    const dispatch = useDispatch();
    // const Luser = location?.presisted?.user;
    const posts = useSelector(state=>state.presisted.post.posts) || [];
    const user = useSelector(state=>state.presisted.user);
    // const user = Luser && Luser?.uid === Ruser.uid ? Ruser : Luser
    useEffect(()=>{
        const fetchPost = async()=>{
          try {
            const response = await api.get(`/getAllPost`,{uid:user.uid});
            dispatch(setPosts(response.data))
          } catch (error) {
            throw error
          }
        }
        fetchPost();
        return () => {
          api.interceptors.request.eject(fetchPost);
        };
      }, [dispatch]);

      if(posts.length === 0){
        return (
          <div className=' col-start-2 col-end-4 mt-4 p-4 h-[30vh] rounded-xl flex justify-center items-center bg-white'>
            <p>No Posts yet</p>
          </div>
        )
      }
  return (
    <div>
        {Array.isArray(posts) && posts?.map((post,index)=><Content key={post._id}  userDetails={user} post={post} user={user} index={index} currentUserId={user.uid} />)} 
    </div>
  )
}

export default PostsProfile
