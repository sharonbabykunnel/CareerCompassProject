import React, { useState, useRef, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, RotateCwSquare, Smile, Send } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

const FileContent = ({ fileContent, closeFileContainer, sendFile, perSec }) => {
  const [rotation, setRotation] = useState(0);
  const [caption, setCaption] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  useEffect(()=>{
    const handleOutSideClick = (e)=>{
      if(!emojiPickerRef.current.contains(e.target)){
        setShowEmojiPicker(false)
      }
    }

    document.addEventListener('mousedown',handleOutSideClick);
    return ()=> document.removeEventListener('mousedown',handleOutSideClick);
  })
  const handleRotate = () => {
    setRotation((prev) => (prev - 90) % 360);
  };

  const handleTypingCaption = (e) => {
    setCaption(e.target.value);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setCaption(prevCaption => prevCaption + emojiObject.emoji);
  };

  const handleSendFile = () => {
    sendFile(caption);
    setCaption('')
  };

  return (
    <div className="bg-gray-900 h-screen flex flex-col text-white">
      <div className="flex-grow flex flex-col justify-between p-4">
        <div className="flex justify-between items-center mb-4">
          <button onClick={closeFileContainer} className="text-gray-400"><X size={20} /></button>
          <h3 className="font-semibold">Preview</h3>
          <button className="text-gray-400">Retake</button>
        </div>

        <div className="flex justify-center space-x-6 mb-4">
          <button><ArrowLeft size={20} /></button>
          <p>{perSec > 0 && "Uploading: " + perSec + "%"}</p>
          <button><ArrowRight size={20} /></button>
          <button onClick={handleRotate}><RotateCwSquare size={20} /></button>
        </div>

        <div className="flex-grow flex items-center justify-center mb-4 overflow-hidden">
          <div className="relative w-full h-full object-contain flex items-center justify-center">
            {fileContent.type.split('/')[0] === 'image' ? (
              <img 
                src={URL.createObjectURL(fileContent)} 
                alt="Preview" 
                className=" object-contain transition-transform duration-300 ease-in-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  maxWidth: rotation % 180 !== 0 ? '50%' : '100%',
                  maxHeight: rotation % 180 !== 0 ? '100%' : '100%',
                }}
              />
            ) : (
              <video 
                src={URL.createObjectURL(fileContent)} 
                className="max-w-full max-h-full object-contain" 
                controls
              />
            )}
          </div>
        </div>

        <div className="flex items-center bg-gray-800 rounded-full p-2" ref={emojiPickerRef}>
          <input 
            value={caption}
            onChange={handleTypingCaption}
            type="text" 
            placeholder="Add a caption" 
            className="flex-grow bg-transparent outline-none px-2"
          />
          <div className="relative">
            <Smile 
              className="text-gray-500 cursor-pointer" 
              onClick={toggleEmojiPicker}
            />
            {showEmojiPicker && (
              <div className="absolute bottom-10 right-0 z-10">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          <button className="bg-green-500 rounded-full p-2 ml-2" onClick={handleSendFile}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileContent;