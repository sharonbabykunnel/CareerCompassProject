import React, { useEffect, useState } from 'react';
import { Home, Users, Briefcase, MessageSquare, Bell, Search, MoreHorizontal } from 'lucide-react';
import Header_user from '../headers/Header_user';
import Button from '../common/Button';
import api from '../../axios/userInterceptor';
import { useSelector } from 'react-redux';
import PostNotificationBubble from './PostNotificationBubble';
import { useNavigate } from 'react-router-dom';

const NotificationInterface = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const user = useSelector(state => state.presisted.user)
  useEffect(()=>{
   const fetch = async ()=>{
    const response = await api.get(`/notification/get/${user.uid}`);
    setData(response.data)
   }
   fetch();
   const setRead = async ()=>{
      const response = await api.get(`/notification/post/read`)
   }
  },[])

  const navigateToChat = (id)=>{
    navigate('/message',{state:{id}})
  }
  return (
    <div className="bg-purple-50 min-h-screen">
      <main className="container mx-auto px-4 py-8 flex">
        <div className="w-3/4 pr-8">
          <h1 className="text-2xl font-bold mb-4">Notifications</h1>
          <div className="flex space-x-4 mb-6">
            <Button name='All' />
            <Button name='Connection' />
            <Button name='Chat' />
          </div>
          <div className="space-y-4">
            {data.map((notification) => (
              <PostNotificationBubble key={notification._id} notification={notification} onClick={()=>navigateToChat(notification.recipient)} />
            ))}
          </div>
        </div>

        {/* Sidebar */}

      </main>
    </div>
  );
};

export default NotificationInterface;