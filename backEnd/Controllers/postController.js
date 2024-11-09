import asyncHandler from 'express-async-handler';
import Post from './../repository/postRepository.js';
import postService from '../service/postService.js';
import uploadToS3 from './../utils/aws.js';
import mongoose from 'mongoose';

 const addPost = asyncHandler(async (req, res) => {
  try {
    const { uid } = req.user;
    const { text, image, video, audio } = req.body;
    const obj = { content: {}, user_id: uid };
    obj.content.text = text;

    if (image) {
      obj.content.images = image;
    }
    if (video) {
      obj.content.video = video;
    }
    if (audio) {
      obj.content.audio = audio;
    }

    let post = await Post.addPost(obj);
    if (!post) return res.status(500).json({ message: 'Post Not Created' });
    res.status(201).json({ post });
  } catch (error) {
    throw error;
  }
});

 const getAllPost = asyncHandler(async (req, res) => {
  try {
    const { uid } = req.user;
    let posts = await Post.findAllPostByUid(uid);
    if (!posts) return res.status(404).json({ message: "no posts" });
    res.status(200).json( posts );
  } catch (error) {
    throw error;
  }
});

 const getPosts = asyncHandler(async (req, res) => {
  try {
    const { user, skip } = req.params;
    const response = await postService.getPosts(user, skip);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

 const changeLike = asyncHandler(async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const change = await Post.changeLike(new mongoose.Types.ObjectId(postId), userId);
    if (!change) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'successful' });
  } catch (error) {
    throw error;
  }
});

 const savePost = asyncHandler(async (req, res) => {
  try {
    const { user, post } = req.body;
    const save = await Post.savePost(user, post);
    res.status(200).json({ message: "Successful" });
  } catch (error) {
    throw error;
  }
});

 const deletePost = asyncHandler(async (req, res) => {
  try {
    const uid = req.query.post;
    const deleted = await Post.deletePost(uid);
    if (deleted) {
      return res.status(200).json({ message: 'success', deleted });
    }
    return res.status(500);
  } catch (error) {
    throw error;
  }
});

 const hidePost = asyncHandler(async (req, res) => {
  try {
    const uid = req.query.post;
    const hided = await Post.hidePost(uid);
    if (hided) {
      return res.status(200).json({ message: "success", hided });
    }
    return res.status(500);
  } catch (error) {
    throw error;
  }
});

const repost = asyncHandler(async (req, res) => {
  try {
    const { user } = req.params;
    const { post } = req.body;
    const check = await Post.checkRepost(user, post)
    if (check) {
      return res
        .status(200)
        .json({
          message: "User already reposted",
          acknowledged: true,
          modified: false,
        });
    } else {
       await Post.repost(user, post);
      res.status(200).json({
        message: 'User added to reposted',
        acknowledged: true,
        modified: true,})
    }
  } catch (error) {
    throw error;
  }
});

const reportPost = asyncHandler(async (req, res) => {
  try {
    const { post } = req.params;
    const { reason, user } = req.body;
    const check = await Post.checkReport(user, post)
    if (check) {
      return res
        .status(200)
        .json({
          message: "User already reported",
          acknowledged: true,
          modified: false,
        });
    } else {
       await Post.report(user, post,reason);
      res.status(200).json({
        message: 'User added to reported',
        acknowledged: true,
        modified: true,})
    }
  } catch (error) {
    throw error;
  }
});

const notInterest = asyncHandler(async (req, res) => {
  try {
    const { post,user } = req.params;
      const response = await Post.notInterest(user, post);
      res.status(200).json(response)
  } catch (error) {
    throw error;
  }
});

const getSavedPost = asyncHandler(async (req, res) => {
  try {
    const { user } = req.params;
      const response = await Post.getSavedPosts(user);
      res.status(200).json(response)
  } catch (error) {
    throw error;
  }
});

const rePosted = asyncHandler(async (req, res) => {
  try {
    const { user } = req.params;
      const response = await Post.rePosted(user);
      res.status(200).json(response)
  } catch (error) {
    throw error;
  }
});

const removeRePost = asyncHandler(async (req, res) => {
  try {
    const { user, uid } = req.params;
      const response = await Post.removeRePost(user,uid);
      res.status(200).json(response)
  } catch (error) {
    throw error;
  }
});

const getLikedUsers = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
      const response = await Post.getLikedUsers(id);
      res.status(200).json(response)
  } catch (error) {
    throw error;
  }
});

const getSinglePost = asyncHandler(async (req, res) => {
  try {
    const { uid } = req.params;
      const response = await Post.getSinglePost(uid);
      res.status(200).json(response)
  } catch (error) {
    throw error;
  }
});

const getArchivedPost = asyncHandler(async (req, res) => {
  try {
    const { uid } = req.params;
      const response = await postService.getArchives(uid);
      res.status(200).json(response)
  } catch (error) {
    throw error;
  }
});

export default {
  addPost,
  getAllPost,
  getPosts,
  changeLike,
  savePost,
  deletePost,
  hidePost,
  repost,
  reportPost,
  notInterest,
  getSavedPost,
  getLikedUsers,
  removeRePost,
  rePosted,
  getSinglePost,
  getArchivedPost,
};
