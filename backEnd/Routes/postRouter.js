import express from 'express'
import post from './../Controllers/postController.js'

const route = express.Router();

route.post('/save', post.savePost);
route.get('/getPost/:user/:skip', post.getPosts);
route.post("/like", post.changeLike);
route.delete('/delete', post.deletePost);
route.patch('/hide', post.hidePost);
route.post('/repost/:user', post.repost);
route.patch('/reportPost/:post', post.reportPost);
route.patch('/notInterest/:post/:user', post.notInterest);
route.get("/savedPost/get/:user", post.getSavedPost);
route.get("/like/likedUsers/:id", post.getLikedUsers);
route.get("/rePosted/get/:user", post.rePosted);
route.delete("/rePosted/remove/:user/:uid", post.rePosted);
route.get("/get/:uid", post.getSinglePost);
route.get('/archive/get/:uid', post.getArchivedPost);
export default route