import React, { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client';
import { BASE_URL } from '../../const/url';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../utils/notificationSlice';
import api from '../axios/userInterceptor';
import { useVideoCall } from './videoCallContext';

export const newSocketContext = createContext();

export const useSocketContext = ()=>{
    return useContext(newSocketContext);
}

export const SocketContext = ({children}) => {
    const dispatch = useDispatch();
    const user = useSelector(state=>state?.presisted?.user?.uid);
    const chat = useSelector (state => state.presisted.message.chat)
    const [isOnline, setIsOnline] = useState(false);
    const [socket, setSocket] = useState(null);
    const { startVideoCall } = useVideoCall();
    const [onlineUsers, setOnlineUsers] = useState([])
    useEffect(()=>{
        if(user){
            const newSocket = io(process.env.VITE_BASE_URL, {
                transports: ['polling', 'websocket'], 
                upgrade: false 
            });
    
            setSocket(newSocket);
            newSocket.emit('setup',user);
            newSocket.on('connected',()=>setIsOnline(true));

            newSocket.on('user online',(userId)=>{
              // setOnlineUsers(prev => prev.filter(id => id !== userId))
            });
            newSocket.on('online users', (users)=>{
              setOnlineUsers(users);
              })
            newSocket.on('newRequest',(user)=>{
                dispatch(setNotification(user))
            })
            newSocket.on('newConnection',(data)=>{
                dispatch(setNotification(data));
            })

            return ()=> newSocket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null)
            }
        }
    },[user,]);

    useEffect(() => {
        if (socket) {
          socket.on('message recieved', async (data) => {
            if (!chat?.participants?.includes(data.response.sender)) {
              const res = await api.post(`/notification/post/chat/${user}`, data);
            }
          });
    
          socket.on('connectUser', (peerId, userData) => {
            if (!chat?.participants?.includes(userData.uid) ) {
              startVideoCall({...userData,peerId});
            }
          });
        }
      }, [chat, socket, startVideoCall]);

  return(
    <newSocketContext.Provider value={{socket,isOnline}}>
    {children}
    </newSocketContext.Provider>
  )
}

