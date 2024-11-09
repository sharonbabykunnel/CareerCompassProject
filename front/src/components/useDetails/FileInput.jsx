import React, { useRef, useState } from 'react';
import { Image } from 'lucide-react';
import useUploadFile from '../../hooks/useUploadFile';


const FileInput = () => {
    const [profilePhoto, setProfilePhoto] = useState();
    const [coverPhoto, setCoverPhoto] = useState()
    const [perSec, setPerSec] = useState(0);
    const [url, setUrl] = useState()
    const coverPhotoRef = useRef()
    const {uploadFile} = useUploadFile();

    const handlePicture = (e)=>{
        setProfilePhoto(e.target.files[0]);
        setUrl(URL.createObjectURL(e.target.files[0]))
    }

    const hanldeCoverPhoto = (e)=>{
        setCoverPhoto(e.target.files[0]);
    }

    const hanldeClick = ()=>{
        coverPhotoRef.current.click();
    }
    
    const submit =  async()=>{
       const profileUrl = profilePhoto && await uploadFile(profilePhoto,'profile',setPerSec);
       const coverUrl = coverPhoto && await uploadFile(coverPhoto,'cover',setPerSec);
    }

  return (
            <div style={{backgroundImage:`url(${login})`}} className='h-screen bg-cover bg-center flex items-center justify-center'>
            <div className='bg-user h-[90%] w-[90%] rounded-xl flex items-center justify-center'>
                <div className='bg-white h-[95%] w-[97%] rounded-xl'>
                    <div className='flex flex-col flex-shrink items-center mt-10 '>
                        <img src='https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/logo1.png?alt=media&token=9dd55b7d-3cf1-46e1-8c92-f447e8630b08' className='w-[30%]'/>
                        {!profilePhoto && <h1 className='mt-16'>Profile Photo</h1>}
                        <div className=" p-2 mb-2 relative w-24 h-24 rounded-full border-2 border-[#9333ea] flex justify-center items-center overflow-hidden shadow-[0_0_100px_#9333ea,inset_0_0_10px_#9333ea,0_0_5px_#fff] animate-flicker">
                        <input type="file" className="absolute opacity-0 w-full h-full cursor-pointer " 
                        onChange={handlePicture}/>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="2em" 
                            height="2em" 
                            strokeLinejoin="round" 
                            strokeLinecap="round" 
                            viewBox="0 0 24 24" 
                            strokeWidth="2" 
                            fill="none" 
                            stroke="currentColor" 
                            className="text-[#9333ea] text-2xl cursor-pointer animate-iconflicker"
                        >
                            <polyline points="16 16 12 12 8 16"></polyline>
                            <line y2="21" x2="12" y1="12" x1="12"></line>
                            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                            <polyline points="16 16 12 12 8 16"></polyline>
                        </svg>
                        {profilePhoto && <img src={url}/>}
                        </div>
                        <h1>Cover Photo</h1>
                        <Image onClick={hanldeClick}/>
                        <input style={{display:'none'}} type='file' onChange={hanldeCoverPhoto} ref={coverPhotoRef} />
                        {coverPhoto && <img src={URL.createObjectURL(coverPhoto)} className='h-20 w-60 object-contain'/>}
                        <button className='bg-user rounded w-[50%] m-2 p-2 text-white' onClick={submit} >Submit</button>
<div
  class="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full"
>
  <div
    class="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"
  >
    
  </div>
</div>
{perSec}

                    </div>
                </div>
            </div>
        </div>
  );
};

export default FileInput;