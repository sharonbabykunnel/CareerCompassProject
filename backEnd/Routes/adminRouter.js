import express from 'express'
import admin from './../Controllers/adminController.js'
const route = express.Router();

route.post('/login', admin.login);
route.post('/googleLogin', admin.googleLogin);
route.get("/getAllUsers/:current", admin.getAllUsers);
route.get('/getAllPosts/:current', admin.getAllPosts);
route.post('/logout', admin.logout);
route.get("/post/get/user/:uid", admin.getUser);
route.get("/get/user/chart", admin.getChartData);
route.get("/user/associated/:user", admin.getAssociated);
route.post("/user/block/:user", admin.blockUser);
route.post("/user/unblock/:user", admin.unblockUser);
route.post('/post/block/:uid', admin.blockPost);
route.post('/post/unblock/:uid',admin.unblockPost)
route.get('/post/get/:uid', admin.getPostDetails);
route.get('/get/post/chart', admin.getPostChartData);
route.get('/get/job/chart', admin.getJobChartData);

export default route