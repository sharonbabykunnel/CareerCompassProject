import config from '../config.js';
import { Server } from 'socket.io'

export function setupSocket(server) {
    const io = new Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: config.origin,
        },
    });

    let onlineUsers = new Set();

    io.on("connection", (socket) => {
        console.log("connected to socket.io", socket.id);

        socket.on("setup", (userData) => {
            socket.join(userData);
            console.log(userData,userData)
            socket.emit("connected");
            onlineUsers.add(userData);
            io.emit('user online', userData);
            io.emit('online users',onlineUsers)
        });

        socket.on("join chat", (room) => {
            socket.join(room);
        });

        socket.on("new chat", (newMessageRecieved) => {
            console.log(newMessageRecieved,'newMessageRecieved')
            const chat = newMessageRecieved.response.chat;
            if (!chat) return 
            chat.participants.forEach((user) => {
                if (user === newMessageRecieved.response.sender) return;
                socket.in(user).emit("message recieved", newMessageRecieved);
            });
        });

        socket.on("newChat", (newMessageRecieved) => {
            const chat = newMessageRecieved.response.chat;
            if (!chat) return 

            socket.in(chat._id || chat).emit("messageRecieved", newMessageRecieved);
        });

        socket.on("typing", (room) => {
            socket.in(room).emit("typing", room);
        });

        socket.on("stopTyping", (room) => socket.in(room).emit("stopTyping", room));

        socket.on("callUser", (room, userId, user) => {
            console.log(room,userId,user)
              setTimeout(() => {
                socket.to(room).emit("connectUser", userId,user);
              }, 1000);
        });

        socket.on("answerCall", (data) => {
            io.to(data.caller).emit("callAccepted", data.callee);
        });

        socket.on("endCall", (data) => {
            io.to(data.to).emit("callEnded");
        });

        socket.on("videoStateChange", (room, state) => {
            socket.to(room).emit("videoStateChange", state);
        });

        socket.on("audioStateChange", (room, state) => {
            socket.to(room).emit("audioStateChange", state);
        });

        socket.on("sendRequest", (id, user) => {
            socket.to(id).emit("newRequest", user);
        });

        socket.on("acceptRequest", (id, data) => {
            socket.to(id).emit("newConnection", data);
        });

        socket.on("disconnect", (userId) => {
            console.log("User disconnected:", socket.id);
            onlineUsers.delete(userId)
            io.emit('user offline', userId)
            io.emit('online users',onlineUsers)
        });
    });
}