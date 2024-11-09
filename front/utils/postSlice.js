import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addMorePost: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePostLike: (state, action) => {
      const { userId, isLiked, index } = action.payload;
      const post = state.posts[index];
      if (post) {
        if (isLiked) {
          post.likes = post.likes.filter((id) => id != userId);
        } else {
          post.likes.push(userId);
        }
      }
    },
    unsetPost: (state, action) => {
      state.posts = [];
    },
    updatePostSave: (state, action) => {
      const { index, user, isSaved } = action.payload;
      const post = state.posts[index];
      if (post) {
        if (isSaved) {
          post.saved = post.saved.filter((id) => id != user);
        } else {
          post.saved.push(user);
        }
      }
    },
    updateComment: (state, action) => {
      const { index, currentComment } = action.payload;
      state.posts[index].comments = [
        currentComment,
        ...state.posts[index].comments,
      ];
    },
    updateCommentLike: (state, action) => {
      const { user, comment, index, ind } = action.payload;
      const post = state.posts[index];
        if (!post) return; 

      const commentObj = post.comments[ind];
      if (!commentObj) return;
      if (!Array.isArray(commentObj.likes)) {
        commentObj.likes = [];
      }

      const likeIndex = commentObj.likes.indexOf(user);
      if (likeIndex > -1) {
        commentObj.likes.splice(likeIndex, 1);
      } else {
        commentObj.likes.push(user);
      }
    },
    removeApost: (state, action) => {
      state.posts = state.posts.filter((ele) => ele._id !== action.payload._id);
    }
  },
});

export const {
  setPosts,
  addMorePost,
  updatePostLike,
  unsetPost,
  updatePostSave,
  updateComment,
  updateCommentLike,
  removeApost,
} = postSlice.actions;

export default postSlice.reducer