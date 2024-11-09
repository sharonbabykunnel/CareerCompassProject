import React from 'react';
import { aws_url } from '../../../const/url';

const FileBubble = ({ content, time, isUser, caption, contentType }) => {
  const renderContent = () => {
    switch (contentType) {
      case 'image':
        return <img src={content} alt="Image" className="max-w-full max-h-full object-contain" />;
      case 'video':
        return <video src={content} controls className="max-w-full max-h-full object-contain" />;
      case 'audio':
        return <audio src={content} controls className="max-w-full max-h-full" />;
      default:
        return null;
    }
  };



  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`} >
      <div className={`max-w-xs ${isUser ? 'bg-purple-100' : 'bg-gray-100'} rounded-lg p-3`}>
        {renderContent()}
        {caption && <p className="text-sm mt-2">{caption}</p>}
        <p className="text-xs text-gray-500 mt-1">{new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, })}</p>
      </div>
    </div>
  );
};

export default FileBubble;