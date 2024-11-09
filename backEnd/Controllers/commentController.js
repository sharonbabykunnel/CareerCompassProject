import asyncHandler from "express-async-handler";
import Comment from "./../repository/commentRepository.js";
import CommentService from './../service/commentService.js';

const postComment = asyncHandler(async (req, res) => {
  try {
    const { text, user, post } = req.body;
    const comment = await Comment.createComment(text, user, post);
    res.status(200).json({ message: "Successful" });
  } catch (error) {
    throw error;
  }
});

const likeComment = asyncHandler(async (req, res) => {
  try {
    const { post, user, comment } = req.body;
    await Comment.likeComment(post, user, comment);
    res.status(200).json({ message: "Successful" });
  } catch (error) {
    throw error;
  }
});

const getComments = asyncHandler(async (req, res) => {
  try {
    const { postId } = req.params;
    const response = await CommentService.getComments(postId);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const addReply = asyncHandler(async (req, res) => {
  try {
    const { post,text,mention,user } = req.body;
    const response = await CommentService.addReply(post,text,mention,user);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

export default { postComment, likeComment, getComments, addReply };
