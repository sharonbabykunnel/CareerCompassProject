import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { useVideoCall } from '../../context/videoCallContext';
import { Phone, PhoneOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VideoCallPopup = () => {
  const navigate = useNavigate()
  const { callParticipant,endVideoCall } = useVideoCall()
  const [activeDrags, setActiveDrags] = useState(0);
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });


  const onStart = () => {
    setActiveDrags(prevDrags => prevDrags + 1);
  };

  const onStop = () => {
    setActiveDrags(prevDrags => prevDrags - 1);
  };

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };

  const endCall = ()=>{

  }

  const answerCall = ()=>{
    navigate('/message',{state:{userData:callParticipant}})
    endVideoCall()
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Draggable
        handle=".handle"
        defaultPosition={{ x: 20, y: 20 }}
        position={null}
        onStart={onStart}
        onDrag={handleDrag}
        onStop={onStop}
      >
        <div className="pointer-events-auto bg-white border border-gray-200 rounded-md p-4 shadow-lg w-72">
          <div className="handle cursor-move bg-gray-100 p-2 mb-3 rounded-md"></div>
          <div className="video-content">
            <div className='flex gap-4'>
            <img className='rounded-full max-w-14 max-h-14' src={callParticipant?.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'} alt="" />
            <h2 className="text-lg font-semibold mb-2"><p className="text-sm text-gray-600">Video Call from</p> {callParticipant?.name}</h2>
            </div>
            <div className='justify-center items-center flex gap-8'>
            <button onClick={endCall} className="p-4 bg-red-600 rounded-full text-white hover:bg-red-500">
                  <PhoneOff size={24} />
                </button>
            <button onClick={answerCall} className="p-4 bg-green-600 rounded-full text-white hover:bg-green-500">
                  <Phone size={24} />
                </button>
                </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default VideoCallPopup;