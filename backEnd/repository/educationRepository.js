import Education from './../models/educationModel.js';

class EducationRepository{
    async findByUserIdAndCourse(user, course, institution) {
        return await Education.find({ user, institution, course });
    }

    async create(obj){
    return await Education.create(obj)
    }

    async findAllByUserId(user) {
        return await Education.find({user})
    }

    async deleteEducation(id) {
        return await Education.deleteOne({_id:id})
    }

    async findById(id) {
        return await Education.findbyId(id);
    }

    async updateById(id, value) {
        return await Education.findByIdAndUpdate(id, { $set:value},{new:true,runValidators:ttrue})
    }
}

export default new EducationRepository()