import express from 'express'
import admin from './../Controllers/adminController.js'
const route = express.Router();

route.post('/auth/login', admin.login);
route.post('/auth/google', admin.googleLogin);
route.post('/auth/logout', admin.logout);

route.get("/getAllUsers/:current", admin.getAllUsers);
route.get("/post/get/user/:uid", admin.getUser);
route.get("/user/associated/:user", admin.getAssociated);
route.post("/user/block/:user", admin.blockUser);
route.post("/user/unblock/:user", admin.unblockUser);

route.get('/getAllPosts/:current', admin.getAllPosts);
route.get('/post/get/:uid', admin.getPostDetails);
route.patch('/posts/:uid/block', admin.blockPost);
route.patch('/posts/:uid/unblock', admin.unblockPost)

route.get("/charts/users", admin.getChartData);
route.get("/charts/posts", admin.getPostChartData);
route.get("/charts/jobs", admin.getJobChartData);

export default route