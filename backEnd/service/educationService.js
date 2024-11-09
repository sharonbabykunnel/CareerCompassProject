import Education from "../repository/educationRepository.js";

class educationService {
  async getAllUserEducation(userId) {
    return await Education.findAllByUserId(userId);
  }

  async addUserEducation(userId, educationData) {
    const { institution,
        course,
        fieldOfStudy,
        startDate,
        endDate,
        grade,
        activity,
        description,
        isOngoing } =
      educationData;
    const existingEducation = await Education.findByUserIdAndCourse(
      userId,
      course,
      institution
    );

    if (existingEducation && existingEducation.length > 0) {
        return { message: "This education entry already exists" };
    }

    const newEducation = {
      user:userId,
      institution,
      course,
      fieldOfStudy,
      startDate: new Date(startDate),
      endDate: startDate ? new Date(endDate) : null,
      grade,
      activity,
      description,
      isOngoing,
    };

    return await Education.create(newEducation);
  }

  async editUserEducation( eduId, educationData) {
    const existEducation = await Education.findById(eduId);

    if (!existEducation) {
      return {message: "Education entry not found"};
    }

    return await Education.updateById(eduId, educationData);
  }

  async deleteUserEducation(userId, eduId) {
    const educationToRemove = await Education.deleteByIdAndUserId(
      eduId,
      userId
    );

    if (!educationToRemove) {
      throw errorHandler(404, "Education entry not found");
    }

    return await Education.findAllByUserId(userId);
  }

  async deleteEducation(id){
    const response = await Education.deleteEducation(id);
    if (!response) {
      return { message: "Education entry not found" };
    }
    return response
  }
}

export default new educationService();
