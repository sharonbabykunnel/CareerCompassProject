import express from 'express'
import user from './../Controllers/userController.js'
import post from './../Controllers/postController.js'
import access from './../middleware/accessToken.js'
const rout = express.Router();

rout.get('/getAllPost', post.getAllPost);
rout.get("/user",  user.getUser);
rout.post("/addPost",  post.addPost);
rout.patch("/user/coverPhoto/update/:user", user.updateCoverPhoto);
rout.patch('/user/userDetails/update/:user', user.updateProfileDetails);
rout.get('/user/getUsers', user.getUsers);
rout.get("/user/get/porfileData/:uid", user.getProfileData);


export default rout;