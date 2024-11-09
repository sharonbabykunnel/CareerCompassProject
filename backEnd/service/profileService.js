import { response } from "express";
import Profile from "../repository/profileRepository.js"
class profileService{
    async uploadResume(resume, user) {
        const response = await Profile.uploadResume(resume, user);
        return response;
    }

    async deleteResume(id) {
        const response = await Profile.deleteResume(id);
        return response
    }

    async postExperience(id, values) {
        const value = {...values,user:id}
        const response = await Profile.postExperience(value);
        return response;
    }

    async getExperience(user) {
        const response = await Profile.getExperience(user);
        return response
    }

    async deleteExperience(id) {
        const response = await Profile.deleteExperience(id);
        return response;
    }

    async updateExperience(id,values) {
        const response = await Profile.updateExperience(id, values);
        return response
    }

    async getUserSkills(user) {
        const response = await Profile.getSkills(user);
        return response;
    }

    async postUserSkills(skill, from,user) {
        const userSkill = await Profile.getSkills(user);
        if (!userSkill) {
            const response = await Profile.createSkill(user, skill, from)
            return response
        } else {
            const response = await Profile.postSkill(skill, from,user);
            return response;
        }
    }

    async updateSkill(skill, from, user,id){
        const response = await Profile.updateSkill(skill, from, user, id);
        return response
    }

    async deleteSkill(user, id) {
        const response = await Profile.deleteSkill(user, id)
        return response;
    }

    async getResume(user) {
        const response = await Profile.getResume(user)
        return response
    }
}

export default new profileService();