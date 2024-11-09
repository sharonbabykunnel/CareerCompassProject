import Resume from "../models/resumeModel.js";
import Experience from '../models/experienceModel.js'
import Skill from '../models/skillModel.js'

class profileRepository{
    async uploadResume(resume, user) {
        return await Resume.create({user,resume,isActive:true})
    }

    async deleteResume(id) {
        return await Resume.findByIdAndDelete(id)
    }

    async postExperience(value) {
        return await Experience.create(value)
    }

    async getExperience(user) {
        return await Experience.find({user});
    }

    async deleteExperience(id) {
        return await Experience.deleteOne({ _id: id });
    }

    async updateExperience(id,value) {
        return await Experience.findByIdAndUpdate(id,{$set:value},{new:true,runValidators:true})
    }

    async getSkills(user) {
        return await Skill.findOne({ user });
    }

    async postSkill(skill, from, user) {
        return await Skill.findOneAndUpdate({user},{$push:{skills:{skill,from}}},{new:true,upsert:true})
    }

    async createSkill(user, skill, from) {
        return await Skill.create({user,skills:[{skill,from}]})
    }

    async updateSkill(skill, from, user, id) {
        return await Skill.findOneAndUpdate({ user, 'skills._id': id }, {
            $set: {
                'skills.$.skill': skill,
                'skills.$.from':from
        }},{new:true})
    }

    async deleteSkill(user, id) {
        return await Skill.findOneAndUpdate({ user },{$pull:{skills:{_id:id}}},{new:true})
    }

    async getResume(user) {
        return await Resume.find({user})
    }
}

export default new profileRepository()