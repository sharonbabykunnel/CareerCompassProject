import asyncHandler from "express-async-handler";
import User from "./../repository/userRepository.js";

const getUser = asyncHandler(async (req, res) => {
  try {
    if (!req.user) return res.status(404).json({ message: "User Not Found" });
    res.status(200).json(req.user);
  } catch (error) {
    throw error;
  }
});

const deleteAll = asyncHandler(async (req, res) => {
  try {
    await User.deleteAll();
    res.send("done");
  } catch (error) {
    throw error;
  }
});

const updateCoverPhoto = asyncHandler(async (req, res) => {
  try {
    const { user } = req.params;
    const { url } = req.body;
    await User.updateCoverPhoto(url.photo, user);
    const response = await User.findByUid(user)
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const updateProfileDetails = asyncHandler(async (req, res) => {
  try {
    const { user } = req.params;
    const values = req.body;
    await User.updateProfileDetails(values, user);
    const response = await User.findByUid(user);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    const response = await User.getUsers();
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const getProfileData = asyncHandler(async (req, res) => {
  try {
    const { uid } = req.params;
    const response = await User.getProfileData(uid);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

export default {
  getUser,
  deleteAll,
  updateCoverPhoto,
  updateProfileDetails,
  getUsers,
  getProfileData,
};
