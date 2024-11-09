import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { Failed, Success } from "../../helpers/popup";
import { uploadResume,deleteUserResume } from "../../api/educationService";
import useUploadFile from "../../hooks/useUploadFile";
import { updateUserResume,  removeUserResume } from "../../../utils/profileSlice";
import { X, FileText, Trash } from "lucide-react";
import { Link } from "react-router-dom";

const ResumeSection = () => {
  const [loadingEffect, setLoadingEffect] = useState(false);
  const [resume, setResume] = useState(null);
  const [perSec, setPerSec] = useState(0);
  const resumes = useSelector((state) => state.presisted.profile.resume);
  const user = useSelector((state) => state.presisted.user.uid);
  const dispatch = useDispatch();
  const { uploadFile } = useUploadFile();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  const upload = async () => {
    try {
      setLoadingEffect(true);
      const resumeUrl = await uploadFile(resume, 'resume', setPerSec);
      const res = await uploadResume(user, resumeUrl["resume"]);
      const data = res.data;
      dispatch(updateUserResume(data));
      Success("Resume updated successfully");
      setResume(null);
    } catch (err) {
      console.error("Error updating resume:", err);
      Failed("Upload failed");
    } finally {
      setLoadingEffect(false);
    }
  };

  const removeResume = () => {
    setResume(null);
  };

  const deleteResume = async (id)=>{
    const res = await deleteUserResume(id);
    if(!res) return 
    dispatch(removeUserResume(id));
    Success("Resume Deleted Successfully");
  }
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-semibold mb-4">Resume</h2>
      {!loadingEffect ? (
        <div>
          <div className="flex items-center mb-4">
            {!resume ? (
              <>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="resume"
                  className="cursor-pointer bg-blue-500 hover:bg-blue-600 ml-0 text-white py-2 px-4 rounded-lg"
                >
                  Choose Resume
                </label>
              </>
            ) : (
              <button
                onClick={upload}
                className="bg-blue-500 hover:bg-blue-600 ml-0 text-white py-2 px-4 rounded-lg"
              >
                Upload Resume
              </button>
            )}
            {resume && (
              <span className="ml-4 border flex items-center p-2 rounded">
                Selected File: {resume.name}
                <X onClick={removeResume} className="ml-2 cursor-pointer" />
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#3333ff"
            ariaLabel="three-dots-loading"
          />
        </div>
      )}
        {resumes && resumes.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">Uploaded Resumes:</h3>
              <ul className="space-y-2">
                {resumes.map((resume,index) => (
                  <li key={resume._id} className="flex items-center justify-between">
                    <div className="flex">
                    <FileText className="mr-2" />
                    <a
                      href={resume.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {resume.name || `Resume ${index + 1}`}
                    </a>
                    </div>
                    <Trash onClick={()=>deleteResume(resume._id)}/>
                  </li>
                ))}
              </ul>
            </div>
          ):
          (<div>
            No Resumes
          </div>)}
    </div>
  );
};

export default ResumeSection;