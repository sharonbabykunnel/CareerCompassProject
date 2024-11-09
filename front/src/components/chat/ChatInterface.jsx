import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import api from '../../axios/userInterceptor';
import { addMessage, removeMessage, setMessage } from '../../../utils/messageSlice';
import { setNotification } from '../../../utils/notificationSlice';
import { addChat, removeChat, getChat, updateLastMessage } from '../../../utils/chatSlice';
import VideoCall from './VideoCall';
import { Peer } from 'peerjs';
import useUploadFile from '../../hooks/useUploadFile';
import ChatBar from './ChatBar';
import FileContent from './FileContent';
import ChatArea from './ChatArea';
import ChatHeader from './ChatHeader';
import { useLocation } from 'react-router-dom';
import { useSocketContext } from '../../context/socketContext';
import { Failed } from '../../helpers/popup';

const ChatInterface = () => {
    const { socket } = useSocketContext();
    const loacation = useLocation();
    const dispatch = useDispatch();
    const chat = useSelector(state=>state.presisted.message);
    const user = useSelector(state=>state.presisted.user);
    const chats = useSelector(state => state.presisted.chat);
    const notification = useSelector(state => state.presisted.notification);
    const [content, setContent] = useState('');
    const [fileContent, setFileContent] = useState(null);
    const [typing,setTyping] = useState(false);
    const [isTyping,setIsTyping] = useState(false);
    const [me, setMe] = useState(false);
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState('');
    const [audioBlob, setAudioBlob] = useState(null);
    const [perSec,setPerSec] = useState(0)
    const [isNotpresentInChat, setIsNotpresentInChat] = useState(false)
    const peerRef = useRef();
    const receiverRef = useRef(null);
    const { uploadFile} = useUploadFile();
    const id = loacation?.state?.id
    const userData = loacation?.state?.userData
    

    useEffect(()=>{

      peerRef.current = new Peer({
        path:'/peerjs',
        host:'localhost',
        port:5000
      });
      console.log(peerRef.current)
      socket.on('typing',(room)=>{
        console.log(room,chat,'adsfasdfas')
        if(room == chat?.chat?._id){
          setIsTyping(true);
        }else{
          setIsNotpresentInChat(true);
        }
      });
      socket.on('stopTyping',(room)=>{
        if(room == chat?.chat?._id){
          setIsTyping(false)
        }else{
          setIsNotpresentInChat(false);
        }
      });

      const connectUser = (userId) => {
        setReceivingCall(true);
        setCaller(userId);
        setMe(true);
      }

      socket.on('connectUser', connectUser);

      const messageReceivedHandler = async (newMessageRecieved)=>{
        if(!receiverRef.current || receiverRef.current.uid != newMessageRecieved.response.sender){
          if(!notification.includes(newMessageRecieved)){
            dispatch(setNotification(newMessageRecieved));
          }
        }else{
          dispatch(addMessage(newMessageRecieved));
        }
        dispatch(updateLastMessage(newMessageRecieved.response))
      };

      socket.on('message recieved',messageReceivedHandler);

      const getChats = async()=>{
        let respo = await api.get(`/chat/getChat/${user.uid}`);
        dispatch(getChat(respo.data));
      }
      getChats()
       
      if(id){
        takeChat(id)
      }else if(userData){
        connectUser(userData.peerId)
        // const call = peerRef.call(caller,myVideo.current.srcObject)
        // call.on('stream',(userVideoStream)=>{
        //     userVideo.current.srcObject = userVideoStream;
        // })
      }
      return ()=> {
        receiverRef.current = null;
        dispatch(removeMessage())
      }
    },[]);



    const call = ()=>{
      setMe(true);
    }


    const sendFile = async(cap)=>{
      if(!socket || !fileContent) return

      try {
        const url = await uploadFile(fileContent,fileContent.type.split('/')[0],setPerSec);
        const response = await api.post('/chat/file',{
          caption:cap,
          user:user.uid,
          chat:chat?.chat?._id,
          uid:receiverRef.current.uid,
          url:url[fileContent.type.split('/')[0]],
          contentType:fileContent.type.split('/')[0]
        })
        socket.emit('new chat', response.data);
        dispatch(addMessage(response.data));
        setFileContent(null);
      } catch (error) {
        console.error(error);
      }
    }
    const sendAudio = async ()=>{
      if(!socket || !audioBlob) return ;
      try {
        const fileName = `a_${Date.now()}.webm`;
        const audioFile = new File([audioBlob],fileName,{type:'audio/webm'});
        const url = await uploadFile(audioFile,'audio',setPerSec);
        const response = await api.post('/chat/file',{user:user.uid,uid:receiverRef.current.uid,contentType:'audio',url:url.audio,caption:'',chat:chat.chat?._id});
        socket.emit('new chat',response.data);
        dispatch(addMessage(response.data))
      } catch (error) {
        Failed(error.response.data.message ? error.response.data.message : error.message)
      }
    }

    const sendMessage = async()=>{
      if(!socket || !content.trim()) return;

      try {
        const response = await api.post('/chat/message',{content,user:user.uid,chat:chat.chat?._id,uid:receiverRef.current.uid});
        socket.emit('new chat',response.data);
        dispatch(addMessage(response.data))
        dispatch(updateLastMessage(response.data.response))
        setContent('')
      } catch (error) {
        Failed(error.response.data.message ? error.response.data.message : error.message)
      }
    }

    const takeChat = async(Receiver)=>{
      try {
        receiverRef.current = Receiver
        const response = await api.get(`/chat/takeChat/${user.uid}/${Receiver.uid}`);
        console.log('response',response)
        await dispatch(await setMessage(response?.data));
        socket.emit('join chat',response.data.chat._id);
      } catch (error) {
        Failed(error.response.data.message ? error.response.data.message : error.message)
      }
    }

    const handleTyping = (e)=>{
      setContent(e.target.value)
      if(!typing){
        setTyping(true);
        console.log(chat.chat)
        socket.emit('typing',chat.chat._id)
      }
      let lastTyping = new Date().getTime();
      var timerLength = 3000;
      setTimeout(()=>{
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTyping;
        if(timeDiff >= timerLength && typing){
          socket.emit('stopTyping',chat.chat._id);
          setTyping(false);
        }
      },timerLength);
    }
    const handleFileClick = (event)=>{
      const file = event.target.files[0];
      if(file){
        setFileContent(file)
      }
    }

const serachInMessage = ()=>{
  
}
    return (
      <div className="flex h-[90vh] bg-white">
        {/* Left sidebar */}
        <ChatBar chats={chats} user={user.uid} takeChat={takeChat} isNotpresentInChat={isNotpresentInChat} which='Message' />
        
        {/* Chat area */}
        { me ? (
          <div className='w-2/3'>
            <VideoCall socket={socket} receiver={receiverRef.current} setMe={setMe} chat={chat} user={user} peer={peerRef.current} caller={caller} receivingCall={receivingCall}  /> 
          </div>
        ):( <>
         {receiverRef.current && 
            <div className="flex-1 flex flex-col">
              <ChatHeader receiver={receiverRef.current} call={call} serachInMessage={serachInMessage} />
                { fileContent ? (
                  <FileContent 
                    fileContent={fileContent}
                    closeFileContainer={() => setFileContent(null)}
                    sendFile={sendFile}
                    perSec={perSec}
                  />
                ) : (
                  <ChatArea 
                  user={user.uid}
                  chat={chat.messages}
                  isTyping={isTyping}
                  content={content}
                  handleTyping={handleTyping}
                  sendMessage={sendMessage}
                  audioBlob={audioBlob}
                  setAudioBlob={setAudioBlob}
                  handleFileClick={handleFileClick}
                  sendAudio={sendAudio}
                  receiver={receiverRef.current}
                />
              ) }
            </div>
          }
          </> )}
      </div>
    );
  };
  

export default ChatInterface
