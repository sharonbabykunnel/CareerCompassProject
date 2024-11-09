import React, { useEffect, useMemo, useRef, useState } from 'react'
import MessageBubble from './MessageBubble'
import { useDispatch, useSelector } from 'react-redux'
import TypingEffect from 'react-typing-effect';
import FileBubble from './FileBubble';
import api from '../../axios/userInterceptor';
import { useInfiniteQuery } from '@tanstack/react-query';
import PostBubble from './PostBubble';
import _ from 'lodash';
import { addMoreMessage } from '../../../utils/messageSlice';

const MessageContainer = ({ user, chat, isTyping,from }) => {
  const messageEndRef = useRef(null);
  const messageContainerRef = useRef(null); // Create a ref for the scrollable container
  const [initialScrollDone, setInitialScrollDone] = useState(false);
  const dispatch = useDispatch();
  const loopMessage = from ==='group' ? chat : useSelector(state => state.presisted.message.messages)

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteQuery({
    queryKey: ['messages', chat[0]?.chat],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await api.get(`/chat/moreMessage/${chat[0].chat}/${pageParam+1}`);
      dispatch(addMoreMessage(response.data))
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
    enabled: !!chat[0]?.chat,
  });

  const debounce = useMemo(() => _.debounce(fetchNextPage, 5000), [fetchNextPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (messageContainerRef.current.scrollTop === 0) {
        debounce(); 
      }
    };

    if (!initialScrollDone) {
      scrollToBottom();
      setInitialScrollDone(true);
    }

    const container = messageContainerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => container.removeEventListener('scroll', handleScroll);
  }, [chat, isTyping, data, debounce, initialScrollDone]);

  const renderMessage = (chat) => {
    switch (chat.contentType) {
      case 'text':
        return <MessageBubble key={chat._id} content={chat.content} time={chat.createdAt} isUser={chat.sender === user} />;
      case 'post':
        return <PostBubble key={chat._id} chat={chat} isUser={chat.sender === user} />;
      default:
        return <FileBubble key={chat._id} content={chat.content} time={chat.createdAt} isUser={chat.sender === user} caption={chat.caption} contentType={chat.contentType} />;
    }
  };
  

  return (
    <div >
      <div 
         ref={messageContainerRef}
        className="flex-1 overflow-y-scroll h-[70vh] p-4 scrollbar-hide" 
      >
        {isFetchingNextPage && <div>Loading...</div>}
        {loopMessage.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {renderMessage(page)}
          </React.Fragment>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <TypingEffect
              text={['Typing...', 'Typing...']}
              speed={100}
              eraseSpeed={100}
              eraseDelay={1000}
              typingDelay={500}
              className="text-gray-500"
            />
          </div>
        )}
      </div>
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageContainer;
