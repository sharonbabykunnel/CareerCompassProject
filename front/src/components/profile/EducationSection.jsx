import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Failed, Success } from "./../../helpers/popup.js";
import { educationSchema } from "../../schema";
import { ThreeDots } from "react-loader-spinner";
import { Pencil, Trash, Plus, FilePlus} from 'lucide-react';
import {
  addEducation,
  deleteEducation,
  editEducation,
  getEducation,
} from "../../api/educationService.js";
import { addUserEducation, removeEducation, updateEducation, updateEducationSuccess, } from "../../../utils/profileSlice.js";
import EducationModal from "./EducationModal.jsx";

const EducationSection = () => {
  const user = useSelector((state) => state.presisted.user);
  const education = useSelector((state=>state.presisted.profile.education));

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [newEdu, setNewEdu] = useState(false);
  const [eduLoading,setEduLoading]=useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    setEduLoading(true)
    getEducation(user.uid)
      .then((response) => {
        dispatch(updateEducationSuccess(response.data));
      })
      .catch((error) => Failed(error.response.data.message ? error.response.data.message : error.message))
      .finally(()=>setEduLoading(false))
  }, []);

  const openEditModal = (education) => {
    setSelectedEducation(education);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedEducation(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (edu_id) => {
    setSelectedId(edu_id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedId(null);
    setIsDeleteModalOpen(false);
  };
  const handleDelete = async (id) => {
    try {
      closeDeleteModal();
      setEduLoading(true)
      const res = await deleteEducation(id);
      if(!res.data) return
      dispatch(removeEducation(id));
      Success(data.message);
    } catch (error) {
      Failed(error.response.data.message ? error.response.data.message : error.message);
    }finally{
      setEduLoading(false)
    }
  };

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md mt-4 relative">
  <h2 className="text-2xl font-semibold mb-2">Education</h2>

  {eduLoading ? (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#3333ff"
        ariaLabel="three-dots-loading"
      />
    </div>
  ) : (
    <>
      {education?.length > 0 ? (
        education?.map((edu) => (
          <div
            key={edu._id}
            className="mb-4 p-4 bg-gray-100 rounded-lg relative"
          >
            <div className="grid grid-cols-2 border-[3px] p-4">
              <div className="mb-2">
                <h3 className="text-xl font-medium">Course </h3>
                <p className="text-gray-700">{edu.course}</p>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-medium">Institution</h3>
                <p className="text-gray-700">{edu.institution}</p>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-medium">Grade</h3>
                <p className="text-gray-700">{edu.grade}</p>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-medium">Activites</h3>
                <p className="text-gray-700">{edu.activity}</p>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-medium">Duration</h3>
                <p className="text-gray-700">
                  {edu.startDate.split("T")[0]} to {edu.endDate.split("T")[0]}
                </p>
              </div>
            </div>
            <div className="absolute top-6 right-6 flex space-x-2">
              <Pencil
                className="h-6 w-6 hover:text-blue-500 cursor-pointer"
                onClick={() => {
                  setNewEdu(false);
                  openEditModal(edu);
                }}
              />
              <Trash
                className="h-6 w-6 hover:text-red-500 cursor-pointer"
                onClick={() => openDeleteModal(edu._id)}
              />
            </div>
          </div>
        ))
      ) : (
        <>
          <FilePlus
            className="absolute top-[3%] right-[1%] h-8 w-8 hover:text-blue-500"
            onClick={() => {
              setNewEdu(true);
              openEditModal();
            }}
          />
          <Plus
            onClick={() => {
              openEditModal();
              setNewEdu(true);
            }}
            className="m-auto h-9 w-9 hover:text-blue-600"
          />
        </>
      )}
      <FilePlus
        className="absolute top-[3%] right-[1%] h-8 w-8 hover:text-blue-500"
        onClick={() => {
          openEditModal();
          setNewEdu(true);
        }}
      />
    </>
  )}
</div>


      {/* Edit Modal */}
      <EducationModal   
      newEdu={newEdu}  
      closeEditModal={closeEditModal}
      isEditModalOpen={isEditModalOpen}
      selectedEducation={selectedEducation} />
      {/* delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closeDeleteModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this field?
              </h3>
              <button
                onClick={() => handleDelete(selectedId)}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={closeDeleteModal}
                type="button"
                className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default React.memo(EducationSection);