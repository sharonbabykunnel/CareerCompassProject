import React, { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import _ from 'lodash';
import ChatPerson from './ChatPerson';
import api from '../../axios/userInterceptor';
import { Failed } from '../../helpers/popup';

const ChatBar = ({ chats, user, takeChat,isNotpresentInChat,which }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchUsers = async (value) => {
    try {
      setLoading(true);
      const response = await api.get(`/chat/group/search?value=${value}`);
      setResult(response.data);
    } catch (error) {
      Failed(error.response.data.message ? error.response.data.message : error.message)
    } finally {
      setLoading(false);
    }
  };
  const debouncedSearchUsers = useMemo(() => _.debounce(searchUsers, 3000), []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearchUsers(value);
  };

  return (
    <div className="w-1/3 h-full border-r flex flex-col">
      <div className="p-3 ">
        <h1 className="text-2xl font-bold mb-4">{which} </h1>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"  />
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        {loading && <div>Loading...</div>}
        <div>
          {result?.map(user => (
            <div key={user._id} onClick={() => takeChat(user)}>{user.name}</div>
          ))}
        </div>
      </div>
      { which == 'Message' ? (
      <div className="overflow-y-auto scrollbar-hide">
        
        {chats && chats?.chatArray?.map((chat) => (
          <div key={chat._id} onClick={() => takeChat(chat?.receivingUser?.[0])}>
            <ChatPerson
              name={chat?.receivingUser?.[0]?.name }
              sender={chat?.lastMessage?.[0]?.sender == user ? 'you' : chat?.receivingUser?.[0]?.name}
              lastMessage={chat?.lastMessage?.[0]?.content}
              time={chat?.lastMessage?.[0]?.updatedAt }
              avatar={chat?.receivingUser?.[0]?.profilePhoto}
              contentType={chat?.lastMessage?.[0]?.contentType}
              isNotpresentInChat={isNotpresentInChat}
            />
          </div>
        ))}
      </div>
      ):(
        <div className="overflow-y-auto scrollbar-hide">
                  
        {chats && chats?.chatArray?.map((chat) => (
          <div key={chat._id} onClick={() => takeChat(chat)}>
            <ChatPerson
              name={ chat.groupName}
              sender={chat?.lastMessage?.[0]?.sender == user ? 'you' : chat?.receivingUser?.[0]?.name}
              lastMessage={chat?.lastMessage?.content}
              time={chat?.lastMessage?.[0]?.updatedAt}
              avatar={chat?.communityPicture}
              contentType={chat?.lastMessage?.[0]?.contentType}
              isNotpresentInChat={isNotpresentInChat}
            />
          </div>
        ))}

        </div>
      )}
    </div>
  );
};

export default ChatBar;