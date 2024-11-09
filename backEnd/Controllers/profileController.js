import expressAsyncHandler from "express-async-handler";
import profileService from "../service/profileService.js";

const uploadResume = expressAsyncHandler(async(req, res)=> {
    try {
        const {user} = req.params;
        const {resume} = req.body;
        const response = await profileService.uploadResume(resume, user);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const deleteResume = expressAsyncHandler(async(req, res)=> {
    try {
        const {id} = req.params;
        const response = await profileService.deleteResume(id);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const postExperience = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const value = req.body;
        const response = await profileService.postExperience(id, value);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
});

const getExperience = expressAsyncHandler(async(req, res)=> {
    try {
        const { user } = req.params;
        const response = await profileService.getExperience(user);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const deleteExperience = expressAsyncHandler(async(req, res)=> {
    try {
        const { id } = req.params;
        const response = await profileService.deleteExperience(id);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const updateExperience = expressAsyncHandler(async(req, res)=> {
    try {
        const { id } = req.params;
        const values = req.body;
        const response = await profileService.updateExperience(id,values);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const getSkills = expressAsyncHandler(async(req, res)=> {
    try {
        const { user } = req.params;
        const response = await profileService.getUserSkills(user);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const postSkill = expressAsyncHandler(async(req, res)=> {
    try {
        const { user } = req.params;
        const { skill, from } = req.body;
        const response = await profileService.postUserSkills(skill,from,user);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const updateSkill = expressAsyncHandler(async(req, res)=> {
    try {
        const { user } = req.params;
        const { skill, from,id } = req.body;
        const response = await profileService.updateSkill(skill,from,user,id);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const deleteSkill = expressAsyncHandler(async(req, res)=> {
    try {
        const { user,id } = req.params;
        const response = await profileService.deleteSkill(user,id);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const getResume = expressAsyncHandler(async(req, res)=> {
    try {
        const { user } = req.params;
        const response = await profileService.getResume(user);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

export default {
  uploadResume,
  deleteResume,
  postExperience,
  getExperience,
  deleteExperience,
  updateExperience,
  getSkills,
  postSkill,
  updateSkill,
  deleteSkill,
  getResume,
};