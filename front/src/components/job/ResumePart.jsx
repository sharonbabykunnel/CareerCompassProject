import React, { useRef, useState } from 'react';
import { Download } from 'lucide-react';
import axios from 'axios';
import useDownload from '../../hooks/useDownload';

const ResumePart = ({setValue, resume, moveToExperience, chosenResumeId,setChosenResumeId, moveBack,uploadedResume,setUploadedResume }) => {
  const inputRef = useRef(null);
  const {downloadFile,error} = useDownload()

  const takeResume = () => {
    inputRef.current.click();
  };

  const handleResume = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedResume(file);
      setChosenResumeId('uploaded');
      setValue('uploaded')
    }
  };

  const handleChooseResume = (id) => {
    setChosenResumeId(id);
    setValue(id)
  };

  const downloadResume = async (url)=>{
    downloadFile(url,'hhhh')
  }

  const removeUpload = ()=>{
    setUploadedResume(null)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Resume</h1>
      <p className="text-gray-600">Be sure to include an updated Resume</p>
      
      {resume.map((res) => (
        <div key={res._id} className="flex items-center justify-between w-full mr-4 border rounded-lg shadow-sm">
          <div className="flex ">
            <div className="bg-red-600 text-white px-4 py-1 rounded-l-lg font-semibold flex items-center">
              {res.resume.split('name')[1].split('?')[0].split('.')[1]}
            </div>
            <div className="ml-4 my-4">
              <div className="text-lg font-medium">{res.resume.split('name')[1].split('?')[0].replaceAll('%', ' ')}</div>
              <div className="text-gray-500 text-sm">
                Last used on {new Date(res.updatedAt).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mr-4">
            <button type='button' className="text-gray-500 hover:text-gray-700" onClick={()=>downloadResume(res.resume)}>
              <Download size={16} />
            </button>
            <input
              type="radio"
              name="chosenResume"
              className="w-4 h-4 border-2 border-green-600 rounded-full"
              checked={chosenResumeId === res._id}
              onChange={() => handleChooseResume(res._id)}
            />
          </div>
        </div>
      ))}
      
      {uploadedResume && (
        <div className="flex items-center justify-between w-full  border rounded-lg shadow-sm">
          <div className="flex ">
            <div className="bg-red-600 flex items-center text-white px-4 py-1 rounded-l-lg font-semibold">
              {uploadedResume.name.split('.').pop()}
            </div>
            <div className="ml-4 my-4">
              <div className="text-lg font-medium">{uploadedResume.name}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mr-4">
            <input
              type="radio"
              name="chosenResume"
              className="w-4 h-4 border-2 border-green-600 rounded-full"
              checked={chosenResumeId === 'uploaded'}
              onChange={() => handleChooseResume('uploaded')}
            />
            <button onClick={removeUpload}>x</button>
          </div>
        </div>
      )}
      
      <div>
        <input
          type="file"
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={handleResume}
          accept=".pdf,.doc,.docx"
        />
        <button
          type="button"
          onClick={takeResume}
          className="border border-blue-500 text-blue-500 rounded mt-4 p-2 hover:bg-blue-50 transition-colors"
          disabled={uploadedResume}
        >
          Upload resume
        </button>
      </div>
      
      <div className="flex justify-end space-x-2 mt-4">
      <button type='button' className='text-blue-500  px-4 hover:bg-blue-200 mr-4' onClick={moveBack}>Back</button>
        <button
          onClick={moveToExperience}
          type='button'
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          disabled={!chosenResumeId}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ResumePart;