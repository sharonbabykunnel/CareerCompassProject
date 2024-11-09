import React, { useMemo, useState } from 'react'
import ImageCard from './ImageCard'

const UploadMore = ({setValue, value, setImage}) => {
    const [selected,setSelected] = useState(1)

    const imageUrls = useMemo(()=>{
        return value.map(file=>URL.createObjectURL(file));
    })

    const imageList = useMemo(()=>{
        return imageUrls.map((url,index)=>(
            <div className='relative' key={url}>
            <img
                src={url}
                className={`object-contain ${selected === index + 1 ? 'border border-green-600 max-h-24 max-w-24' : 'm-1 max-h-20 max-w-20'}`}
                onClick={() => setSelected(index + 1)}
            />
            </div>
        ))
    });

    const handleDelete = (selected)=>{
        setImage(prev=> prev.filter((_,index)=> index != selected-1));
        if(selected > 1){
            setSelected(selected-1)
        }
    }

  return (
    <div className='flex flex-grow overflow-hidden w-full'>
    <div className='border-r flex-grow flex items-center justify-center flex-wrap gap-2 overflow-auto w-[60%] '>
        {imageUrls?.map((url, index) =>  <ImageCard key={url}  url={url}/>)}
    </div>
    <div className='p-4 flex flex-col justify-between border w-1/3'>
    <div>
        <div className='flex justify-between w-full'>
            <h1>{`${selected}/${value?.length}`}</h1>
            <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                Upload More
                <input type="file" className="hidden" onChange={(e)=>setValue(e)} multiple/>
            </label>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-4'>
            {imageList}
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
  )
}
export default UploadMore
