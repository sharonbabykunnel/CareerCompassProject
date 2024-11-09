import React, { useState } from 'react';
import api from '../../axios/userInterceptor';

const Education = () => {
    const [companyName, setCompanyName] = useState();
    const [designation, setDesignation] = useState();
    const [nof, setNof] = useState();
    const [student, setStudent] = useState(false)
    const [schooleName, setSchooleName] = useState();
    const [course, setCourse] = useState();
    const [yoe, setYoe] = useState();
    const [yop, setYop] = useState();
    const [showCompany, setShowCompany] = useState(false)
    const submitEducation= async ()=>{
        // const response = await api.post('/addEducation',{
        //     companyName,designation,nof
        // });
        setShowCompany(true)
    }
    const toggleState = ()=>{
        setStudent(!student);
    }
  return (
    <div style={{backgroundImage:`url(https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/login.png?alt=media&token=9dd55b7d-3cf1-46e1-8c92-f447e8630b08)`}} className='h-screen bg-cover bg-center flex items-center justify-center'>
    <div className='bg-user h-[90%] w-[90%] rounded-xl flex items-center justify-center'>
    <div className=" p-8 max-w-2xl mx-auto bg-white h-[95%] w-[97%] rounded-xl">
      <div className="flex items-center mb-6">
        <img src='https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/logo1.png?alt=media&token=9dd55b7d-3cf1-46e1-8c92-f447e8630b08' />
      </div>
      <div className='flex mt-12'>
      { !showCompany ? <form className="space-y-10 ">
        <input 
          type="text" 
          placeholder="School Name"
          className="w-[80%] p-2 border border-purple-300 rounded"
          onChange={(e)=>{setSchooleName(e.target.value)}}
        />
        <input 
          type="text" 
          placeholder="Course"
          className="w-[80%] p-2 border border-purple-300 rounded"
          onChange={(e)=>setCourse(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Years of Entered "
          className="w-[80%] p-2 border border-purple-300 rounded"
          onChange={(e)=>setYoe(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Years of Pass out "
          className="w-[80%] p-2 border border-purple-300 rounded"
          onChange={(e)=>setYop(e.target.value)}
        />
        
        <div className="flex justify-between items-center">
          <button 
            type="submit"
            className="bg-purple-700 text-white py-2 px-4 rounded w-[80%]"
            onClick={submitEducation}
          >
            Next
          </button>
        </div>
      </form> :
      <form className="space-y-10 w-[60%]">
        <input 
          type="text" 
          placeholder="Company Name"
          className="w-[80%] p-2 border border-purple-300 rounded"
          onChange={(e)=>{setCompanyName(e.target.value)}}
        />
        <input 
          type="text" 
          placeholder="Designation"
          className="w-[80%] p-2 border border-purple-300 rounded"
          onChange={(e)=>setDesignation(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Number Of Years"
          className="w-[80%] p-2 border border-purple-300 rounded"
          onChange={(e)=>setNof(e.target.value)}
        />
        
        <div className="flex justify-between items-center">
          <button 
            type="submit"
            className="bg-purple-700 text-white py-2 px-4 rounded w-[80%]"
            onClick={submitEducation}
          >
            Next
          </button>
        </div>
      </form>}
      {showCompany && <div className="mt-6 text-center flex">
          <p className="ml-4 text-purple-700 flex justify-center items-center" onClick={toggleState}>{student ? "I'm a Student":"I'm not a Student"}</p>
          
      </div>}
    </div>
    </div>
    </div>
    </div>
  );
};

export default Education;