import React, { useEffect, useState, useRef } from 'react';
import { Video, Phone, Mic, PhoneOff, VideoOff, MicOff } from 'lucide-react';

const VideoCall = ({socket, receiver, chat,user, peer, setMe, caller, receivingCall}) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [state,setState] = useState({video:true,audio:true});

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        myVideo.current.srcObject = currentStream;
      });

      peer.on('open',(id)=>{
      })
      
      peer.on('call',(call)=>{
              myVideo.current.srcObject.checkOn = 'checkOn'
          call.answer(myVideo.current.srcObject);
          setCallAccepted(true);
          call.on('stream',(userVideoStream)=>{
              userVideo.current.srcObject = userVideoStream
          })
      })

    socket.on('videoStateChange',(state)=>{
        if(userVideo?.current?.srcObject){
            const videoTrack = userVideo.current.srcObject.getVideoTracks()[0];
            if(videoTrack) videoTrack.enabled = state;
        }
    })

    socket.on('audioStateChange',(state)=>{
        if(userVideo?.current?.srcObject){
            const audioTrack = userVideo.current.srcObject.getAudioTracks()[0];
            if(audioTrack) audioTrack.enabled = state;
        }
    })

    return () => {
      if (myVideo.current) {
        myVideo.current.srcObject?.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCalling]);

  const callUser = () => {
    if(!peer) return 
    const peerId = peer?.id
    console.log('peer',peerId)
    setIsCalling(true);
    if(peerId){
        socket.emit('callUser',receiver.uid,peerId,user)
    }else{
        peer.on('open',(id)=>{
            socket.emit('callUser',receiver.uid,id,user)
        })
    }
  };

  const answerCall = () => {
    setCallAccepted(true);
    setIsCalling(true)
    const call = peer.call(caller,myVideo.current.srcObject)

    call.on('stream',(userVideoStream)=>{
        userVideo.current.srcObject = userVideoStream;
    })

  };

  const endCall = () => {
    setCallEnded(true);
    if (peer) {
        peer.destroy()
    }
    if(myVideo.current){
        myVideo.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setMe(false);
  };

  const videoToogle = ()=>{
    const videoTrack = myVideo.current.srcObject.getVideoTracks()[0]
    const newVideoTrack = !videoTrack.enabled;
    videoTrack.enabled = newVideoTrack;
    setState(prev => ({...prev,video:newVideoTrack}));
    socket.emit('videoStateChange',chat.chat._id,newVideoTrack);
  }

  const audioToogle = ()=>{
    const audioTrack = myVideo.current.srcObject.getAudioTracks()[0];
    const newAudioTrack = !audioTrack.enabled;
    audioTrack.enabled = newAudioTrack
    setState(prev=>({...prev,audio:newAudioTrack}))
    socket.emit('audioStateChange',chat.chat._id,newAudioTrack);
  }
  return (
    <div className="flex flex-col h-[90vh]">
        {isCalling && !callEnded ? (
          (
            <div className="relative w-full h-screen bg-gray-100 flex items-center justify-center">
              <div className="w-full max-w-3xl aspect-video bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="w-full h-full relative">
                  <video playsInline  ref={userVideo} autoPlay alt="Main caller" className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 right-4 w-1/4 aspect-video bg-white rounded-lg overflow-hidden shadow-md">
                    <video playsInline muted ref={myVideo} autoPlay alt="Secondary caller" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
                <button onClick={audioToogle} className="p-4 bg-gray-700 rounded-full text-white hover:bg-gray-600">
                  { state.audio ? <Mic size={24} /> : <MicOff size={24} /> }
                </button>
                <button onClick={endCall} className="p-4 bg-red-600 rounded-full text-white hover:bg-red-500">
                  <PhoneOff size={24} />
                </button>
                <button onClick={videoToogle} className="p-4 bg-gray-700 rounded-full text-white hover:bg-gray-600">
                  { state.video ? <Video size={24} /> : <VideoOff size={24} />}
                </button>
              </div>
            </div>
          )
        ):
        (
        <div className="flex-1 flex  justify-center ">
            <video playsInline muted ref={myVideo} autoPlay className="w-[60vw]  object-cover" />
            <div className="p-4 bg-gray-100">
            {!receivingCall && !callAccepted ? (<button onClick={() => callUser()} className="bg-green-500 text-white p-2 rounded w-full flex items-center justify-center">
              <Phone className="mr-2" />
              Call
            </button> ) :
           (
            <div className="mt-4">
              <h1> is calling:</h1>
              <button onClick={answerCall} className="bg-blue-500 text-white p-2 rounded w-full mt-2">
                Answer
              </button>
            </div>
          )}
          </div>
      </div>
          )}

    </div>
  );
};

export default VideoCall;