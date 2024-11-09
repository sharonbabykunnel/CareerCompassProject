import asyncHandler from 'express-async-handler';
import Education from './../service/educationService.js';
import handleError from "./../middleware/errorHandler.js";

const addEducation = asyncHandler(async (req, res) => {
    try {
        const {user} = req.params;
        const value = req.body;
        const response = await Education.addUserEducation(user, value);
        if (response.message) {
            handleError(res, 400, response.message);
            return 
        } 
        res.status(200).json(response);
    } catch (error) {
        throw error;
    }
});

const getEducation = asyncHandler(async (req, res) => {
    try {
        const { user } = req.params;
        const response = await Education.getAllUserEducation(user);
        if (response.message) {
            handleError(res, 400, response.message);
            return 
        } 
        res.status(200).json(response);
    } catch (error) {
        throw error;
    }
});

const deleteEducation = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Education.deleteEducation(id);
        if (response.message) {
            handleError(res, 400, response.message);
            return 
        } 
        res.status(200).json(response);
    } catch (error) {
        throw error;
    }
});

const editEducation = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const value = req.body;
    const response = await Education.editUserEducation(id, value);
    if (response.message) {
      handleError(res, 400, response.message);
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

export default {
  addEducation,
  getEducation,
  deleteEducation,
  editEducation,
};