import React, { useEffect } from 'react'
import AddPost from './AddPost'
import Content from '../post/Content'
import { useSelector } from 'react-redux'
import api from '../../axios/userInterceptor'
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query'

const MainBody = () => {
  const user = useSelector(state=>state.presisted.user);

  useEffect(()=>{
    const handleScroll = ()=>{
      const pageHieght = document.body.scrollHeight;
      const scrollHeight = window.scrollY;
      const windowHeight = window.innerHeight;
      if(scrollHeight + windowHeight >= pageHieght){
        fetchNextPage();
      }
    }
    fetchNextPage();
    document.addEventListener('scroll',handleScroll);
    return ()=> document.removeEventListener('scroll',handleScroll);
  },[])

  const getPost = async ({pageParam = 0})=>{
    const response = await api.get(`/post/getpost/${user.uid}/${pageParam}`);

    return response.data;
  }

  const queryClient = useQueryClient();

  const updateQuerryCache = (newPost)=>{
    queryClient.setQueryData(['post'],(oldData)=>{
      if(!oldData) return {pages:[[newPost]],pageParams:[0]}
      return {
        ...oldData,
        pages:[
          [newPost,...oldData.pages[0]],
          ...oldData.pages.slice(1)
        ]
      }
    })
  }

  const updatePostList = (pindex, index) => {
    queryClient.setQueryData(['post'], (oldData) => {
      return {
        ...oldData,
        pages: oldData.pages.map((page, i) => {
          if (i !== pindex) {
            return page;
          }
          return page.filter((_, ind) => ind !== index);
        })
      };
    });
  };

  const updatePostCommentLike =  (pindex, index,cindex,likedUser) => {
    queryClient.setQueryData(['post'], (oldData) => {
      return {
        ...oldData,
        pages: oldData.pages.map((page, i) => {
          if (i !== pindex) {
            return page;
          }
          return page.map((post, ind) => {
           if(ind !== index) return post
           return {...post,comments: post.comments.map((comment,inde)=>{
            if(cindex != inde) return comment;
            const obj = {
              ...comment,likes:comment.likes.includes(likedUser) ? comment.likes.filter(item => item !== likedUser) : [...comment.likes,likedUser]
            }
            return obj
           })}
          })
        })
      };
    });
  };
  

  const updateQuerryLike = (pindex,index,user,isLiked)=>{
    queryClient.setQueryData(['post'],(oldData)=>{
      return {
        ...oldData,
        pages:oldData.pages.map((page,i)=>{
          if(i === pindex){
            return page.map((post,ind)=>{
              if(ind === index){
                let updateLikes;
                if(isLiked){
                  updateLikes = post.likes.filter((like)=> like != user)
                }else{
                  updateLikes = [...post.likes,user];
                }
                return {...post,likes:updateLikes}
              }else{
                return post
              }
            })
          }else{
            return page
          }
        })
      }
    })
  }

  const updateQuerrySave = (pindex,index,isSaved,userId)=>{
    queryClient.setQueryData(['post'],(oldData)=>{
      return {
        ...oldData,
        pages:oldData.pages.map((page,i)=>{
          if(i !== pindex) return page;
           return page.map((post,ind)=>{
            if(ind !== index) return post
            let updateSave 
            if(isSaved){
              updateSave = post.saved.filter((save)=> save != userId)
            }else{
              updateSave = [...post.saved,userId]
            }
          return {
            ...post,
            saved: updateSave
          }
        })
        })
      }
    })
  }

  const updateQueryComment = ( pindex, index, comment ) => {
    queryClient.setQueryData(['post'], (oldData) => {
      return {
        ...oldData,
        pages: oldData.pages.map((page, i) =>{
          if (i != pindex) return page;
            return  page.map((post, ind) =>{
                if(ind !== index) return post;
                  return {
                      ...post,
                      comments : post.comments ? [...comment,...post?.comments] : [...comment]
                    };
                  }
                )
              }
            )
          }
      }
    ) 
  };

  const updateCommentReplay = ({pindex,index,currComment,cindex})=>{
    queryClient.setQueryData(['post'],(oldData)=>{
      return {
        ...oldData,
        pages: oldData.pages.map((page,i)=>{
          if(i != pindex) return page;
          return page.map((post,ind)=>{
            if(ind != index) return post
            return {
              ...post,
              comments: post.comments.map((comment,inde)=>{
                if(inde != cindex) return comment;
                return {
                  ...comment,
                  replies:[currComment,...comment?.replies]
                }
              })
            }
          })
        })
      }
    })
  }
  

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey:['post'],
    queryFn:getPost,
    getNextPageParam:((lastPage,allPages)=>{
      return lastPage.length > 0 ? allPages.length  : undefined;
    })
  })

  return (
    <div className=' col-start-2 col-end-4  m-10 rounded-xl  '>
        <AddPost user={user} updateQuerryCache={updateQuerryCache}/>
        {data?.pages?.map((page,pindex) => page?.map((post,index)=>
        <Content key={post?._id} post={post} user={post.user} userDetails={user} currentUserId={user.uid} index={index} pindex={pindex} updateQuerryLike={updateQuerryLike} updateQueryComment={updateQueryComment}
        updateQuerrySave={updateQuerrySave} updateCommentReplay={updateCommentReplay} updatePostList={updatePostList} updatePostCommentLike={updatePostCommentLike} />))}
        {isFetchingNextPage && (<div>loading</div>)}
    </div>
  )
}

export default MainBody
