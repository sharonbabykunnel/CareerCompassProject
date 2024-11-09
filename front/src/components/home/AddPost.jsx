import React, { useState } from 'react'
import PostPopup from '../post/PostPopup';
import AddFile from './../post/AddFile';
import ImageCard from './ImageCard';
import { BASE_URL } from '../../../const/url';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {  addMorePost, setPosts } from '../../../utils/postSlice';
import AddVideos from '../post/AddVideos';
import api from '../../axios/userInterceptor';
import { toast } from 'react-toastify';
import { removeCredentials } from '../../../utils/userSlice';
import useUploadFile from '../../hooks/useUploadFile';
import Modal from 'react-modal'
import { ThreeCircles } from 'react-loader-spinner';

const AddPost = ({user, updateQuerryCache}) => {
    const posts = useSelector((state)=>state.post);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [isLoading,setLoding] = useState(false)
    const [showFileUploader,setFileUploader] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [perSec, setPerSec] = useState(0)
    const [text,setText] = useState('')
    const [image,setImage] = useState([])
    const [video, setVideo] = useState([]);
    const {uploadFiles} = useUploadFile();
    const togglePopup = ()=>{
        setShow(!show)
    }

    const toggleImagePopup = ()=>{
        setFileUploader(!showFileUploader);
    }

    const toggleVideoPopup = ()=>{
        setShowVideo(!showVideo);
    }

    const setImageValue = (e)=>{
        const files = e.target.files
        setImage(prev => [...prev,...files]);
    }

    const setVideoValue = (e)=>{
        const files = e.target.files;
        setVideo(pre=>[...pre,...files]);
    }

    const setTextValue = (e)=>{
        setText(e.target.value)
    }

    const postSubmit = async ()=>{
        try {
            setLoding(true)
            setShow(false)
            const videoUrl = await uploadFiles(video,'vieo',setPerSec)
            const imageUrl = await uploadFiles(image,'image',setPerSec)
            const formData = new FormData();
            formData.append("text",text)
            imageUrl?.forEach((file,index)=>{
                formData.append(`image`,file);
            })
            videoUrl?.forEach((file)=>{
                formData.append('video',file);
            })
            const result = await api.post(`${BASE_URL}/addPost`,formData,{
                headers:{
                    "Content-Type":"multipart-form-data"
                }
            });
            if(result){
                if(posts){
                    dispatch(addMorePost({...result.data}));
                }else{
                    dispatch(setPosts({...result.data}));
                    const newPost = {...result.data.post,
                        files:[...result.data.post.content.images,...result.data.post.content.video],
                        user:user
                    }
                    updateQuerryCache(newPost)
                }
                setText('');
                setImage([]);
                setVideo([]);
                setShow(false);
                setVideo(false);
                setFileUploader(false);
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoding(false)
        }
    }

  return (
    <div className='bg-white flex flex-col rounded-xl'>
        <div className='flex px-4'>
            <img src={user.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'} className='w-10 h-10 rounded-full m-4' alt="" />
            <div className='flex items-center border rounded-3xl w-[90%] m-4 px-4' onClick={togglePopup}>
                <span>Create a Post</span>
            </div>
        </div>
        <div className='flex justify-around m-2 h-6'>
            <ImageCard url='https://cdn-icons-png.flaticon.com/128/739/739249.png' name='Image' toggleFunction={toggleImagePopup}/>
            <ImageCard url='https://cdn-icons-png.flaticon.com/128/2991/2991195.png' name='Video' toggleFunction={toggleVideoPopup}/>
            {/* <ImageCard url='https://cdn-icons-png.flaticon.com/128/880/880564.png' name='Audio' toggleFunction={toggleImagePopup}/> */}
            {/* <ImageCard url='https://cdn-icons-png.flaticon.com/128/2480/2480568.png' name='Poll' toggleFunction={toggleImagePopup}/> */}
        </div>
        { show && <PostPopup 
                onClose={togglePopup} 
                openImage={toggleImagePopup} 
                openVideo={toggleVideoPopup}
                setValue={setTextValue}
                value={text}
                submit={postSubmit} /> }
        { showFileUploader && <AddFile 
                onClose={toggleImagePopup} 
                next={togglePopup}
                setValue={setImageValue}
                setImage={setImage}
                value={image} /> }
        { showVideo && <AddVideos
                onClose={toggleVideoPopup}
                value={video}
                next={togglePopup}
                setVideo={setVideo}
                setValue={setVideoValue} />}
                      <Modal
      isOpen={isLoading}
        className="fixed inset-0 flex items-center justify-center z-50 mt-[80px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className=" flex-col p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto h-[80vh] overflow-auto flex justify-center items-center scrollbar-hide">
        <ThreeCircles/>
        <p className='text-white'>Uploading...</p>
        </div>
      </Modal>
    </div>
  )
}

export default AddPost
