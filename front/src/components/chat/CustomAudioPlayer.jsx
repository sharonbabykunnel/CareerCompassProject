import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const CustomAudioPlayer = ({ src, recordingDuration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    
    const setAudioData = () => {
      setDuration(recordingDuration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const resetAudioOnEnd = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', resetAudioOnEnd);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', resetAudioOnEnd);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    audioRef.current.currentTime = time;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-200 rounded-full p-2">
      <button onClick={togglePlayPause} className="focus:outline-none">
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <div className="flex-1">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSliderChange}
          className="w-full"
        />
      </div>
      <div className="text-xs">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
      <audio ref={audioRef} src={src} className="hidden" />
    </div>
  );
};

export default CustomAudioPlayer;