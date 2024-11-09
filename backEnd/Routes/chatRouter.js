import express from 'express'
import chat from './../Controllers/chatController.js';
const route = express.Router();

route.get('/search', chat.searchUser);
route.get('/group/search', chat.searchUser);
route.get('/getChat/:user', chat.getAllChat);
route.get('/community/:id', chat.getCommunityChat);
route.post('/group/create', chat.createGroup);
route.post('/group/message', chat.uploadMessageInCoummunity);
route.get("/takeChat/:user/:uid", chat.getChat);
route.get('/moreMessage/:chat/:skip', chat.getMoreMessage);
route.post('/message', chat.uploadMessage);
route.post('/file', chat.uploadFile);
route.get("/group/chatList/:user", chat.getGroupChatList);
route.post("/post/share/:user", chat.sharePost);


export default route