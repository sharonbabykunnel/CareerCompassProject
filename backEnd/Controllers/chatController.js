import asyncHandler from 'express-async-handler';
import chatService from './../service/chatService.js';
import handleError from './../middleware/errorHandler.js';

 const searchUser = asyncHandler(async (req, res) => {
  try {
    const value = req.query.value;
    const response = await chatService.searchUser(value, 'user');
    if (!response) return handleError(res, 404, 'no users');
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

 const createGroup = asyncHandler(async (req, res) => {
  try {
    const { user, groupName, groupDiscrip, communityPicture, participents } = req.body;
    const group = await chatService.createGroup(user, groupName, groupDiscrip, communityPicture, participents);
    res.status(200).json(group);
  } catch (error) {
    throw error;
  }
});

 const searchGroup = asyncHandler(async (req, res) => {
  try {
    const value = req.query.value;
    const response = await chatService.searchUser(value, 'group');
    if (!response) return handleError(res, 404, 'no users');
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

 const getChat = asyncHandler(async (req, res) => {
  try {
    const { user, uid } = req.params;
    const response = await chatService.getChat(uid, user);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

 const getCommunityChat = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const response = await chatService.getCommunityChat(id);
    res.status(200).json(response);
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

 const getAllChat = asyncHandler(async (req, res) => {
  try {
    const user = req.params.user;
    const response = await chatService.getAllChat(user);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

 const getGroupChatList = asyncHandler(async (req, res) => {
  try {
    const user = req.params.user;
    const response = await chatService.getAllChat(user, 'group');
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

 const uploadMessage = asyncHandler(async (req, res) => {
  try {
    const { chat, user, content, uid } = req.body;
    const response = await chatService.uploadMessage(chat, user, content, uid);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

 const uploadMessageInCoummunity = asyncHandler(async (req, res) => {
  try {
    const { chat, user, content } = req.body;
    const response = await chatService.uploadMessageInCoummunity(chat, user, content);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

 const getMoreMessage = asyncHandler(async (req, res) => {
  try {
    const { chat, skip } = req.params;
    const response = await chatService.getMoreMessage(chat, skip);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

 const uploadFile = asyncHandler(async (req, res) => {
  try {
    const { chat, user, caption, uid, url, contentType } = req.body;
    const response = await chatService.uploadFile(chat, user, caption, url, contentType, uid);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
 });

  const sharePost = asyncHandler(async (req, res) => {
    try {
      const { user } = req.params;
      const { selected ,post,caption} = req.body;
      const response = await chatService.sharePost(user, selected,post,caption);
      res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  });

export default {
  searchUser,
  getChat,
  uploadMessage,
  getAllChat,
  uploadFile,
  getGroupChatList,
  searchGroup,
  createGroup,
  getCommunityChat,
  uploadMessageInCoummunity,
  getMoreMessage,
  sharePost,
};
