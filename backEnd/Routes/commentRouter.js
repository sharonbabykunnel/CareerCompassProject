import express from 'express'
import comment from './../Controllers/commentController.js'
const route = express.Router();

route.post("/post", comment.postComment);
route.post("/like", comment.likeComment);
route.get("/getComments/:postId", comment.getComments);
route.post('/addReply', comment.addReply);

export default route;
