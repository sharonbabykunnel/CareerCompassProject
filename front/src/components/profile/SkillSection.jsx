import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { Pencil, Plus, FilePlus, X } from 'lucide-react';
import api from "../../axios/userInterceptor";
import { getExperience } from "../../api/profileService";
import { getEducation } from "../../api/educationService";
import { Failed } from "../../helpers/popup";

const SkillSection = () => {
  const user = useSelector((state) => state.presisted.user);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);
  const [skill,setSkill] = useState();
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFrom,setSelectedFrom] = useState([]);
  const [edit,setEdit] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setSkillsLoading(true);
      try {
        const [skillsRes, experiencesRes, educationsRes] = await Promise.all([
          api.get(`/profile/skills/get/${user.uid}`),
          getExperience(user.uid),
          getEducation(user.uid)
        ]);
        setSkills(skillsRes?.data ? skillsRes.data : []);
        setExperiences(experiencesRes.data);
        setEducations(educationsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setSkillsLoading(false);
    };
    fetchData();
  }, [user.uid]);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const addSkill = () => {
    if (skillInput && !skills?.skills?.some(item => item.skill == skillInput ) ) {
      setSkill(skillInput);
      setSkillInput('');
    }else if(skills?.skills.some(item => item.skill == skillInput )){
        Failed('Skill allready Exist')
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkill();
    const { [skillToRemove]: _, ...restExperiences } = selectedExperiences;
    const { [skillToRemove]: __, ...restEducations } = selectedEducations;
    setSelectedExperiences(restExperiences);
    setSelectedEducations(restEducations);
  };

  const editSkill = (skill)=>{
    setEdit(skill._id);
    setSkill(skill.skill)
    setSelectedFrom(skill.from)
    openEditModal()
  }
  
  const toggleFrom = (from,id,field) => {
    setSelectedFrom(prev => (
      prev?.some(item => item.id === id) ? prev.filter(item => item.id !== id):[...prev,{name:from,id:id,field}]
    ));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post(`/profile/skills/post/${user.uid}`, {
        skill,
        from:selectedFrom
      });
      setSkills(response.data);
      closeEditModal();
      setEdit('')
      setSkill()
      setSelectedFrom([])
    } catch (error) {
      console.error("Error submitting skills:", error);
    }
  };

  const handleDelete = async ()=>{
    const res = await api.delete(`/profile/skills/delete/${user.uid}/${edit}`,)
    setSkills(res.data);
    closeEditModal()
    setEdit('')
    setSkill()
    setSelectedFrom([])
  }

  const handleEditSkill = async ()=>{
    const res = await api.put(`/profile/skills/edit/${user.uid}`,{
        id:edit,skill,from:selectedFrom
    });
    setSkills(res.data)
    closeEditModal()
    setEdit('')
    setSkill()
    setSelectedFrom([])
  }

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4 relative">
        <h2 className="text-2xl font-semibold mb-2">Skills</h2>
        {skillsLoading ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <ThreeDots visible={true} height="80" width="80" color="#3333ff" ariaLabel="three-dots-loading" />
          </div>
        ) : skills.skills?.length > 0 ? (
          <div className="flex flex-wrap space-x-2 space-y-2">
            {skills.skills?.map((skill, index) => (
                <div key={skill._id} className="bg-gray-200 px-3 py-1 flex flex-grow justify-between rounded-md text-gray-700">
                    <div>
              <span key={index} className="">
                {skill.skill.toUpperCase()}
              </span>
              {skill.from && <div>
                {skill.from.map(item=><div key={item.id}>{item.name}</div>)}
                </div>}
                    </div>
                <Pencil onClick={()=>editSkill(skill)}/>
              </div>
            ))}
          </div>
        ) : (
          <Plus onClick={openEditModal} className="m-auto h-9 w-9 hover:text-blue-600" />
        )}
        {skills.skills?.length > 0 && (
          <FilePlus className="absolute top-[3%] right-[1%] h-8 w-8 hover:text-blue-500" onClick={openEditModal} />
        )}
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto overflow-y-auto max-h-[90vh]">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">
              Add Skills
            </h2>
            <X onClick={closeEditModal} className="hover:text-red-700" />
          </div>
          <div>
            <label className="block mb-2">Skills (max 10)</label>
            <div className="flex items-center">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter a skill"
              />
              <button
                type="button"
                onClick={addSkill}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                disabled={skill}
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap">
              {skill &&
                <span  className="bg-gray-200 px-2 py-1 rounded m-1 flex items-center">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill()}
                    className="ml-2 text-red-500"
                  >
                    ×
                  </button>
                </span>
              }
            </div>
          </div>
          {skill && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Where did you use these skills?</h2>
              
                <div key={skill} className="mb-4">
                  <div className="ml-4">
                    <h4 className="font-medium">Education</h4>
                    {educations.map((edu) => (
                      <div key={edu._id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`edu-${skill}-${edu._id}`}
                          checked={selectedFrom?.some(item => item.id === edu._id)}
                          onChange={() => toggleFrom( edu.institution,edu._id,'educations')}
                          className="mr-2"
                        />
                        <label htmlFor={`edu-${skill}-${edu._id}`}>{edu.institution}</label>
                      </div>
                    ))}
                  </div>
                  <div className="ml-4 mt-2">
                    <h4 className="font-medium">Experience</h4>
                    {experiences.map((exp) => (
                      <div key={exp._id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`exp-${skill}-${exp._id}`}
                          checked={selectedFrom?.some(item => item.id === exp._id)}
                          onChange={() => toggleFrom(exp.company,exp._id,"jobexperiences")}
                          className="mr-2"
                        />
                        <label htmlFor={`exp-${skill}-${exp._id}`}>{exp.company}</label>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
          )}
          <div className={`flex ${edit ? "justify-between" : "justify-end" } space-x-2 mt-4`}>
            {edit && <button
              onClick={handleDelete}
              className="px-4 py-2 bg-white rounded hover:bg-blue-600"
            >
            Delete
            </button>}
            <button
              onClick={edit ? handleEditSkill : handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SkillSection;