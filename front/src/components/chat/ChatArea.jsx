import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Image, Mic, Play, Trash2, StopCircle, PauseCircle, Receipt } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import MessageContainer from './MessageContainer';
import CustomAudioPlayer from './CustomAudioPlayer';
import {  QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import { Failed } from '../../helpers/popup';

const queryClient = new QueryClient();

const ChatArea = ({
  user,
  chat,
  isTyping,
  content,
  handleTyping,
  sendMessage,
  audioBlob,
  sendAudio,
  handleFileClick,
  setAudioBlob,
  receiver,
  from
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0)
  const [isPause, setIsPause] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioContextRef = useRef(null);
  const timeIntervalRef = useRef();
  const animationFrameRef = useRef();
  const emojiPickerRef = useRef(null);
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const fileInputRef = useRef(null);
  useEffect(()=>{
    const handleOutSideClick = (event)=>{
      if(!emojiPickerRef.current?.contains(event.target)){
        setShowEmojiPicker(false)
      }
    }
    document.addEventListener('mousedown', handleOutSideClick);

    return ()=>{
      document.removeEventListener("mousedown", handleOutSideClick)
    }
  },[])

  useEffect(()=>{
    if(audioBlob){
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      return ()=> URL.revokeObjectURL(url);
    }
  },[audioBlob]);

  useEffect(()=>{
    return ()=>{
      if(timeIntervalRef.current){
        clearInterval(timeIntervalRef.current);
      }
      if(audioContextRef.current){
        audioContextRef.current.close();
      }
      if(animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)

    }
  },[]);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    handleTyping({ target: { value: content + emojiObject.emoji } });
  };

  const handleSendMessage = ()=>{
    sendMessage();
    showEmojiPicker && setShowEmojiPicker(false)
  }

  const startRecording = async()=>{
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio:true});
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (e)=>{
        if(e.data.size > 0){
          chunks.push(e.data);
        }
      }
      
      mediaRecorderRef.current.onpause = ()=>{
        const blob = new Blob(chunks,{type:'audio/webm'});
        const url = URL.createObjectURL(blob);
        audioRef.current = new Audio(url);
        setAudioUrl(url);
        setAudioBlob(blob);
      }

      mediaRecorderRef.current.onresume = ()=>{

      }  

      mediaRecorderRef.current.start();
      setRecordingDuration(0)
      setIsRecording(true);

      timeIntervalRef.current = setInterval(()=>{
        setRecordingDuration((prev)=>prev+1)
      },1000);

      audioContextRef.current = new (window.AudioContext || Window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyzeAudio()
    } catch (error) {
      Failed(error.response.data.message ? error.response.data.message : error.message)
    }
  }

  const analyzeAudio = ()=>{

    if(!analyserRef.current) return ;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    const updateAudioLevel = ()=>{
      analyserRef.current.getByteFrequencyData(dataArray);
      const sum = dataArray.reduce((acc,value)=> acc+value,0)
      const average = sum/dataArray.length;
      const newAudioLevel = average/255;
      setAudioLevel(newAudioLevel);
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel)
    }
    updateAudioLevel()
  }

  const formatDuration = (seconds)=>{
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2,0)}`;
  }
  
  const pauseRecording = ()=>{
    if(mediaRecorderRef.current.state === 'recording'){
      mediaRecorderRef.current.requestData();
      mediaRecorderRef.current.pause();
      setIsPause(true);
      clearInterval(timeIntervalRef.current);
      
      if(audioContextRef.current) audioContextRef.current.close()
        if(animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  } 
  
  const resumeRecording = ()=>{
    if(mediaRecorderRef.current.state === 'paused'){
      mediaRecorderRef.current.resume();
      setIsPause(false);
      timeIntervalRef.current = setInterval(()=>{
        setRecordingDuration(prev=> prev +1);
      },1000);
    }
  }

  const deleteAudio =()=>{
    setAudioBlob(null);
    setAudioUrl(null);
    audioRef.current = null;
    setIsPause(false);
    setIsRecording(false);
    clearInterval(timeIntervalRef.current);
  }

  const handleVideoClick = ()=>{
    fileInputRef.current.click();
  }

  const handleKeyPress = (e)=>{
    if(e.key === 'Enter'){
      handleSendMessage();
    }
  }

  return (
    <>
      <div className="flex-1">
      <QueryClientProvider client={queryClient}>
        <MessageContainer from={from} user={user} chat={chat}  isTyping={isTyping} />
      </QueryClientProvider>
      </div>

      <div className="border-t p-4 flex">
        {!isRecording ? (
          <>
            <div ref={emojiPickerRef} className="flex flex-grow items-center bg-gray-100 rounded-lg">
              <input
                value={content}
                onChange={handleTyping}
                type="text"
                onKeyPress={handleKeyPress}
                placeholder="Type here...."
                className="flex-1 bg-transparent p-2 focus:outline-none"
              />
              <div className="flex space-x-2 px-2">
                <div className="relative">
                  <Smile 
                    className="text-gray-500 cursor-pointer" 
                    onClick={toggleEmojiPicker}
                  />
                  {showEmojiPicker && (
                    <div className="absolute bottom-10 right-0">
                      <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                  )}
                </div>
                <Image className="text-gray-500 cursor-pointer" onClick={handleVideoClick}/>
                <input type="file" style={{display:'none'}} onChange={handleFileClick} ref={fileInputRef} />
                {!content ? (
                  <Mic className="text-gray-500 cursor-pointer" onClick={startRecording} />
                ) : (
                  <Send onClick={handleSendMessage}/>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-gray-100 flex-grow p-2 rounded-full flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white" onClick={deleteAudio}>
              <Trash2 size={20} />
            </button>
            {!isPause ? (
              <div className="flex-grow flex items-center space-x-2">
                <div className="h-8 bg-gray-600 flex-grow rounded-full overflow-hidden relative">
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      '--wave-animation-duration': `${2 / (audioLevel + 0.1)}s`,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      maskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' height=\'100%25\' width=\'100%25\'%3E%3Cdefs%3E%3Cpattern id=\'wave\' width=\'100%25\' height=\'100%25\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M-100 150 C 200 50, 400 50, 700 150 L 700 0 L -100 0 Z\' fill=\'white\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23wave)\'/%3E%3C/svg%3E")',
                      maskRepeat: 'repeat-x',
                      maskSize: '100% 100%',
                    }}
                  />
                </div>
                <span className="text-xs">{formatDuration(recordingDuration)}</span>
                <button className="text-red-500">
                  <PauseCircle className="text-red-500 cursor-pointer" onClick={pauseRecording} />
                </button>
              </div>
            ) : (
              <div className='flex-grow flex items-center space-x-2' >
                <CustomAudioPlayer src={audioUrl} recordingDuration={recordingDuration}/>
                <Mic className="text-gray-500 cursor-pointer" onClick={resumeRecording} />
              </div>
            )}
            <Send onClick={()=>{
              sendAudio();
              deleteAudio();
            }} />
          </div>
        )}
      </div>
    </>
  );
};

export default ChatArea;