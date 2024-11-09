import asyncHandler from 'express-async-handler';
import User from './../models/userModel.js';
import connectionService from './../service/connectionService.js';

const getConnections = asyncHandler(async (req, res) => {
  try {
    const user = req.params.user;
    const { value } = req.query;
    const response = await connectionService.getConnections(user, value);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const buildConnection = asyncHandler(async (req, res) => {
  try {
    const { user, uid } = req.body;
    const response = await connectionService.buildConnection(user, uid);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const findInvitations = asyncHandler(async (req, res) => {
  try {
    const { user } = req.params;
    const response = await connectionService.findInvitations(user);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const findRequests = asyncHandler(async (req, res) => {
  try {
    const { user } = req.params;
    const response = await connectionService.findRequests(user);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const findWorldWide = asyncHandler(async (req, res) => {
  try {
    const { user } = req.params;
    const response = await connectionService.findWorldWide(user);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const findMutuals = asyncHandler(async (req, res) => {
  try {
    const { value } = req.query;
    const { user } = req.params;
    const response = await connectionService.findMutuals(user,value);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const acceptRequest = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const response = await connectionService.acceptRequest(id);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const rejectRequest = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const response = await connectionService.rejectRequest(id);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const removeConnection = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const response = await connectionService.removeConnection(id);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const leaveRequest = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const response = await connectionService.leaveRequest(id);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const searchWorldWide = asyncHandler(async (req, res) => {
  try {
    const { user } = req.params;
    const { value } = req.query;
    const response = await connectionService.searchWorldWide(value, user);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

// Export statements
export default {
  getConnections,
  buildConnection,
  findInvitations,
  findRequests,
  findWorldWide,
  acceptRequest,
  rejectRequest,
  removeConnection,
  leaveRequest,
  findMutuals,
  searchWorldWide,
};
