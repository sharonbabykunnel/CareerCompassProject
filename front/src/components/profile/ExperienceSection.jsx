import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import * as Yup from 'yup'
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Failed, Success } from "../../helpers/popup";
import { ThreeDots } from "react-loader-spinner";
import { experienceSchema } from "../../schema";
import { Pencil, Trash, Plus, FilePlus, X} from 'lucide-react';
import {
  postExperience,
  getExperience,
  deleteExperience,
  editExperience
} from "../../api/profileService";
import { updateExperienceSuccess ,removeExperienceSuccess, pushExperienceSuccess, setExperiencesLoading,updateExperience} from "../../../utils/profileSlice";
import ExperienceModal from "./ExperienceModal";

const ExperienceSection = () => {
  const user = useSelector((state) => state.presisted.user); 
  const experiences = useSelector(state => state.presisted.profile.experiences);
const isLoading = useSelector(state => state.presisted.profile.isLoading);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [newExp, setNewExp] = useState(true);
  const [expLoading,setExpLoading]=useState(false);
  const dispatch = useDispatch();



  useEffect(() => {
    const fetchExperiences = async () => {
      dispatch(setExperiencesLoading(true));
      try {
        const res = await getExperience(user.uid);
        dispatch(updateExperienceSuccess(res.data));
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
        Failed("Failed to load experiences");
      } finally {
        dispatch(setExperiencesLoading(false));
      }
    };
  
    fetchExperiences();
  }, [dispatch, user.uid]);
  const openEditModal = (experience) => {
    setSelectedExperience(experience);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedExperience(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (exp_id) => {
    setSelectedId(exp_id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedId(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      closeDeleteModal();
      setExpLoading(true);
      const res = await deleteExperience(id);
      if (res.status === 200) {
        dispatch(removeExperienceSuccess(id));
        Success("Experience deleted successfully");
      } else {
        Failed("Failed to delete experience");
      }
    } catch (err) {
      console.error("Error deleting experience:", err);
      Failed("Failed to delete experience");
    } finally {
      setExpLoading(false);
    }
  };


  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md mt-4 relative">
  <h2 className="text-2xl font-semibold mb-2">Experience</h2>

  {isLoading ? (
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
      {experiences && experiences.length > 0 ? (
        experiences?.map((exp, index) => (
          <div
            key={index}
            className="mb-4 p-4 bg-gray-50 rounded-lg relative"
          >
            <div className="grid grid-cols-2 border-[3px] p-4">
              <div className="mb-2">
                <h3 className="text-xl font-medium">Position</h3>
                <p className="text-gray-700">{exp.position}</p>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-medium">Company</h3>
                <p className="text-gray-700">{exp.company}</p>
              </div>
              <div className="mb-2 ">
                <h3 className="text-xl font-medium">Location</h3>
                <p className="text-gray-700 ">{exp.city},{exp.state},<br/>{exp.country}</p>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-medium">Duration</h3>
                <p className="text-gray-700">
                  {exp.startDate.split("T")[0]} to {exp.currentJob ? 'Precent' : exp.endDate.split("T")[0]}
                </p>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-medium">as</h3>
                <p className="text-gray-700">
                  {exp.employmentType}
                </p>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-medium">Description</h3>
                <p className="text-gray-700">
                  {exp.description}
                </p>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-medium">Achievment</h3>
                <p className="text-gray-700">
                  {exp.achievments}
                </p>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-medium">skills</h3>
                <p className="text-gray-700">
                  {exp.skills}
                </p>
              </div>
            </div>
            <div className="absolute top-6 right-6 flex space-x-2">
              <Pencil
                className="h-6 w-6 hover:text-blue-500 cursor-pointer"
                onClick={() => {
                  setNewExp(false);
                  openEditModal(exp);
                }}
              />
              <Trash
                className="h-6 w-6 hover:text-red-500 cursor-pointer"
                onClick={() => openDeleteModal(exp._id)}
              />
            </div>
          </div>
        ))
      ) : (
        <>
          <FilePlus
            className="absolute top-[3%] right-[1%] h-8 w-8 hover:text-blue-500"
            onClick={() => {
              setNewExp(true);
              openEditModal();
            }}
          />
          <Plus
            onClick={() => {
              openEditModal();
              setNewExp(true);
            }}
            className="m-auto h-9 w-9 hover:text-blue-600"
          />
        </>
      )}
      <FilePlus
        className="absolute top-[3%] right-[1%] h-8 w-8 hover:text-blue-500"
        onClick={() => {
          openEditModal();
          setNewExp(true);
        }}
      />
    </>
  )}
</div>


      {/* Edit Modal */}
      <ExperienceModal selectedExperience={selectedExperience}  closeEditModal={closeEditModal} isEditModalOpen={isEditModalOpen} newExp={newExp} setExpLoading={setExpLoading}/>
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

export default React.memo(ExperienceSection);