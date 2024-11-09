import React, { createContext, useContext, useState } from 'react';

export const VideoCallContext = createContext();

export const useVideoCall = () =>{
   return useContext(VideoCallContext);
} 

export const VideoCallProvider = ({ children }) => {
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [callParticipant, setCallParticipant] = useState({});

  const startVideoCall = (participants) => {
    setCallParticipant(participants);
    setShowVideoCall(true);
  };

  const endVideoCall = () => {
    setShowVideoCall(false);
    setCallParticipant(null);
  };

  return (
    <VideoCallContext.Provider value={{ showVideoCall, callParticipant, startVideoCall, endVideoCall }}>
      {children}
    </VideoCallContext.Provider>
  );
};