import React, { useEffect, useRef, useState } from 'react'
import ChatBar from './ChatBar'
import api from '../../axios/userInterceptor'
import { useDispatch, useSelector } from 'react-redux'
import { Image, Plus } from 'lucide-react'
import { addChatIncommunity, addChatListInCommunity,addMoreChat, addSelectedGroup, chatListInCommunity, updateCommunityLastMessage } from '../../../utils/communityChat'
import ChatHeader from './ChatHeader'
import FileContent from './FileContent'
import ChatArea from './ChatArea'
import { Peer } from 'peerjs';
import io from 'socket.io-client';
import { BASE_URL } from '../../../const/url'
import useUploadFile from '../../hooks/useUploadFile'
import AddGroupMembers from './AddGroupMembers'
import { toast } from 'react-toastify'
import { useSocketContext } from '../../context/socketContext'
import { Failed } from '../../helpers/popup'

const GroupChat = () => {
    const { socket } = useSocketContext();
    const dispatch = useDispatch();
    const user = useSelector(state => state.presisted?.user);
    const chats = useSelector(state => state.presisted?.community);
    const [choosedGroup, setChoosedGroup] = useState(null);
    const [participents, setParticipents] = useState([])
    const [me,setMe] = useState();
    const [caption, setCaption] = useState('');
    const [typing,setTyping] = useState(false);
    const [content, setContent] = useState('')
    const [isTyping,setIsTyping] = useState(false);
    const [fileContent, setFileContent] = useState(null);
    const [groupName, setGroupName] = useState('')
    const [wantToCreate,setWantToCreate] = useState();
		const [socketConnected, setSocketConnected] = useState();
    const [groupDiscrip, setGroupDiscrip] = useState();
    const [perSec,setPerSec] = useState(0);
    const [result, setResult] = useState();
    const [audioBlob, setAudioBlob] = useState(null);
    const [communityPicture, setCommunityPicture] = useState();
    const [isadd, setIsadd] = useState(false);
    const receiverRef = useRef(null);
		const peerRef = useRef(null);
    const inputRef = useRef(null);
    const { uploadFile} = useUploadFile();


		useEffect(()=>{

      peerRef.current = new Peer({
        path:'/peerjs',
        host:'localhost',
        port:5000
      });
      socket.on('typing',(room)=>{
        if(room == chats.selectedGroup._id){
          setIsTyping(true)
        }else{
          setIsNotpresentInChat(true);
        }
      });
      socket.on('stopTyping',(room)=>{
        if(room == chats.selectedGroup._id){
          setIsTyping(false)
        }else{
          setIsNotpresentInChat(false);
        }
      });


      socket.on('connectUser', (userId) => {
        setReceivingCall(true);
        setCaller(userId);
        setMe(true);
      });

      const messageReceivedHandler = (newMessageRecieved)=>{
        if(!receiverRef.current || receiverRef.current._id != (newMessageRecieved.response.chat._id || newMessageRecieved.response.chat) ){
          if(!notification.includes(newMessageRecieved)){
            dispatch(setNotification(newMessageRecieved.response));
          }
        }else{
          dispatch(addMoreChat(newMessageRecieved.response));
        }
        dispatch(updateCommunityLastMessage(newMessageRecieved.response))
      };

      socket.on('messageRecieved',messageReceivedHandler);

      const getGroupChat = async()=>{
        const response = await api.get(`/chat/group/chatList/${user.uid}`)
        dispatch(chatListInCommunity(response.data));

    }
    getGroupChat();

    },[]);

    const sendFile = async()=>{
      if(!socket || !fileContent) return

      try {
        const url = await uploadFile(fileContent,fileContent.type.split('/')[0],setPerSec);
        const response = await api.post('/chat/file',{
          caption,
          user:user.uid,
          chat:chats.selectedGroup._id,
          uid:receiverRef._id,
          url:url[fileContent.type.split('/')[0]],
          contentType:fileContent.type.split('/')[0]
        })
        response.data.response.chat = receiverRef.current;
        socket.emit('newChat', response.data);
        dispatch(addMoreChat(response.data.response));
        setCaption('');
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
        const response = await api.post('/chat/file',{user,uid:receiverRef.current.uid,contentType:'audio',url:url.audio,caption:'',chat:chats.selectedGroup?._id});
        response.data.response.chat = receiverRef.current;
        socket.emit('newChat',response.data);
        dispatch(addMoreChat(response.data.response));
      } catch (error) {
        Failed(error.response.data.message ? error.response.data.message : error.message)
      }
    }

    const sendMessage = async()=>{
      if(!socket || !content.trim()) return;

      try {
        const response = await api.post('/chat/group/message',{content,user:user.uid,chat:receiverRef.current._id});
        dispatch(addMoreChat(response.data.response))
        dispatch(updateCommunityLastMessage(response.data.response))
        socket.emit('newChat',response.data);
        setContent('')
      } catch (error) {
        Failed(error.response.data.message ? error.response.data.message : error.message)
      }
    }

    const takeChat = async(receiever)=>{
      try {
        receiverRef.current = receiever;
        const response = await api.get(`/chat/community/${receiever._id}`);
        dispatch(addChatIncommunity(response?.data));
				dispatch(addSelectedGroup(receiever));
        socket.emit('join chat',receiever._id);
        setResult([])
      } catch (error) {
        Failed(error.response.data.message ? error.response.data.message : error.message)
      }
    }

    const createGroup = async(e)=>{
      e.preventDefault();
      try {
        if(!groupName.trim()) {
          toast('Name is Required');
          return 
        }
        if(participents.length < 2) {
          toast('Select Members');
          return
        } 
        const url = communityPicture && await uploadFile(communityPicture,'image',setPerSec);
        const response = await api.post('/chat/group/create',{user:user.uid,groupName,groupDiscrip,communityPicture:url.image,participents:participents.map(participent=>participent._id)});
        if(response?.data){
          toast('Group Created Successfully');
          setGroupName('');
          setParticipents([]);
          setCommunityPicture(null);
          setGroupDiscrip('');
          setWantToCreate(false);
          dispatch(addChatListInCommunity(response.data))
        }
      } catch (error) {
        Failed(error.response.data.message ? error.response.data.message : error.message)
      }
    }

    const call = ()=>{
      setMe(true);
    }

    const handleTyping = (e)=>{
      setContent(e.target.value)
      if(!socketConnected) return
      if(!typing){
        setTyping(true);
        socket.emit('typing',chats.selectedGroup._id)
      }
      let lastTyping = new Date().getTime();
      var timerLength = 3000;
      setTimeout(()=>{
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTyping;
        if(timeDiff >= timerLength && typing){
          socket.emit('stopTyping',chats.selectedGroup._id);
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

    const selectInput = ()=>{
      inputRef.current.click();
    }

    const handleImage = (e)=>{
      setCommunityPicture(e.target.files[0]);
    }

  return (
    <div className="flex h-[90vh] bg-white">
    <ChatBar chats={chats} user={user.uid} takeChat={takeChat} which='Community Chats' />
    { me ? (
      <div className='w-2/3'>
        <VideoCall socket={socket} reciever={receiverRef.current} setMe={setMe} chat={chat} user={user} peer={peerRef.current} caller={caller} receivingCall={receivingCall}  /> 
      </div>
    ):( <>
     {receiverRef.current ? ( 
        <div className="flex-1 flex flex-col">
          <ChatHeader reciever={receiverRef.current} call={call} />
            { fileContent ? (
              <FileContent 
                fileContent={fileContent}
                closeFileContainer={() => setFileContent(null)}
                sendFile={sendFile}
                perSec={perSec}
              />
            ) : (
              <ChatArea 
              from='group'
              user={user.uid}
              chat={chats.chatInGroup}
              isTyping={isTyping}
              content={content}
              handleTyping={handleTyping}
              sendMessage={sendMessage}
              sendAudio={sendAudio}
              handleFileClick={handleFileClick}
              setAudioBlob={setAudioBlob}
            />
          ) }
        </div>) : (
        <div className='flex '>
          {wantToCreate ? (
            <div className=" flex">
              {!isadd ? 
            <form className="form">
              <div className="form-group">
                <label htmlFor="email" className="block mb-1 text-sm font-semibold text-gray-400">
                  Community Name
                </label>
                <input
                  required
                  name=""
                  value={groupName}
                  onChange={(e)=>{setGroupName(e.target.value)}}
                  type="text"
                  className="w-full px-4 py-3  bg-transparent border border-gray-700 rounded-md focus:outline-none focus:border-purple-400"
                  placeholder="Enter your Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="textarea" className="block mb-1 text-sm font-semibold text-gray-400">
                  Deiscription
                </label>
                <textarea
                  cols="60"
                  rows="5"
                  id="textarea"
                  value={groupDiscrip}
                  name="textarea"
                  className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-md resize-none focus:outline-none focus:border-purple-400"
                  placeholder="Enter your message"
                  onChange={(e)=>setGroupDiscrip(e.target.value)}
                />
              </div>
              <div>
              <label htmlFor="textarea" className="block mb-1 text-sm font-semibold text-gray-400">
                  Community Picture
                </label>
                <input type="file" style={{display:'none'}} ref={inputRef} onChange={handleImage} />
                <div className='flex'>
                <Image onClick={selectInput} />
                {communityPicture && <img className='w-56 mx-4' src={URL.createObjectURL(communityPicture)}/>}
                <label htmlFor="textarea" className="block mb-1 ml-10 text-sm font-semibold text-gray-400" onClick={()=>setIsadd(true)}>
                  choose two connections
                </label>
                </div>
              </div>
              <div>
                {participents && participents.map(person=><p>{person.name}</p>)}
              </div>
              <button
              onClick={createGroup}
                type="submit"
                className="self-start ml-10 flex items-center justify-center w-2/5 px-4 py-3 mt-2 text-sm font-semibold text-gray-400 bg-gray-700 border border-gray-700 rounded-md cursor-pointer hover:bg-white hover:text-gray-700"
              >
                Create
              </button>
            </form> :
            <AddGroupMembers setParticipents={setParticipents} setIsadd={setIsadd}/> }
          </div>
          ):( 
            <div className='flex items-center justify-center w-[70vw]'>
              <button
              className='ml-10 flex items-center justify-center w-2/5  px-4 py-3 mt-2  text-sm font-semibold  text-gray-400 bg-gray-700 border border-gray-700 rounded-md cursor-pointer hover:bg-white hover:text-gray-700'
              onClick={()=>{setWantToCreate(true)}}>Create Group</button>
            </div>
          )}
          
        </div>
        )
      }
      </>  )}
  </div>
  )
}

export default GroupChat
