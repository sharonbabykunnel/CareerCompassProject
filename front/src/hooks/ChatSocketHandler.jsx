import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../../utils/notificationSlice';
import { addMessage } from '../../utils/messageSlice';

const ChatSocketHandler = (socket) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.presisted.user.uid);
    const [currentChat, setCurrentChat] = useState(null);

    useEffect(() => {
        if (!socket) return;

        const messageHandler = (newMessageReceived) => {
            if (!currentChat || currentChat.uid !== newMessageReceived.response.sender) {
                dispatch(setNotification(newMessageReceived));
            } else {
                dispatch(addMessage(newMessageReceived));
            }
        };

        socket.on('message received', messageHandler);

        return () => {
            socket.off('message received', messageHandler);
        };
    }, [socket, currentChat, dispatch]);

    const joinChat = (chatId) => {
        if (socket) {
            socket.emit('join chat', chatId);
        }
    };

    const setCurrentReceiver = (receiver) => {
        setCurrentChat(receiver);
    };

    return { joinChat, setCurrentReceiver };
};

export default ChatSocketHandler;