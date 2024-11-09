import React, { useMemo, useState } from 'react'
import UploadFromcomputer from '../helpers/UploadFromcomputer';
import VideoPlayer from '../helpers/VideoPlayer';

const AddVideos = ({onClose, value, setValue, setVideo, next}) => {
    const [selected,setSelected] = useState(1)
    const handleDelete = (selected)=>{
        setVideo((prev)=> prev.filter((_,index)=> index !== selected -1))
        if(selected > 1) setSelected(selected-1);
    }

    const videoUrls = useMemo(()=>{
       if (value) return value?.map(file => URL.createObjectURL(file));
       else return []
    },[value])

    const videoList = useMemo(()=>{
        return videoUrls.map((url,index)=>(
            <div className='relative' key={url}>
            <video
                src={url}
                className={`object-contain ${selected === index + 1 ? 'border border-green-600 max-h-24 max-w-24' : 'm-1 max-h-20 max-w-20'}`}
                onClick={() => setSelected(index + 1)}
            />
            </div>
        ))
    },[videoUrls,selected])

    const openText = ()=>{
        next();
        onClose();
    }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
    <div className="bg-white p-3 rounded-xl max-h-[80%] h-full w-full max-w-3xl flex flex-col overflow-hidden">
        <div className='flex justify-between text-2xl border-b items-center'>
            <h1>Editor</h1>
            <img src="https://cdn-icons-png.flaticon.com/128/2976/2976286.png" alt="" className='w-5'onClick={onClose} />
        </div>
        <div className='flex-grow flex items-center justify-center flex-col gap-4 overflow-auto'>
            {value?.length > 0 ? (
                <div className='flex flex-grow overflow-hidden w-full'>
                <div className='border-r flex-grow flex items-center justify-center flex-wrap gap-2 overflow-auto w-[60%] '>
                    {videoUrls?.map((url, index) =>  <VideoPlayer key={url}  src={url} type='video/mp4'/>)}
                </div>
                <div className='p-4 flex flex-col  border w-1/3  justify-between'>
                <div>
                    <div className='flex justify-between w-full'>
                        <h1>{`${selected}/${value?.length}`}</h1>
                        <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                            Upload More
                            <input type="file" className="hidden" onChange={(e)=>setValue(e)} multiple/>
                        </label>
                    </div>
                    <div className='grid grid-cols-2 gap-4 mt-4'>
                        {videoList}
                    </div>
                    </div>
                        <div className=''>
                        <img
                                src="https://cdn-icons-png.flaticon.com/128/484/484662.png"
                                alt="Delete"
                                className='w-5 cursor-pointer '
                                onClick={()=> handleDelete(selected)}
                            />
                        </div>
                </div>
                </div>
            ) : (
                <UploadFromcomputer setValue={(e)=>setValue(e)}/>
            )}
        </div>
        <div className='flex justify-end border-t pt-3'>
            <button onClick={openText} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
        </div>
    </div>
    </div>
  )
}

export default AddVideos
