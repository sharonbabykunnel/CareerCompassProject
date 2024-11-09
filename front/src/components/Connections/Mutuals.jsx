import React, { useEffect, useMemo, useState } from 'react'
import { Search, Clock } from 'lucide-react';
import api from '../../axios/userInterceptor';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useSocketContext } from '../../context/socketContext';
import { Failed } from '../../helpers/popup';
import _ from 'lodash';

const Mutuals = ({}) => {
  const {socket} = useSocketContext();
  const navigate = useNavigate();
  const [connections, setConnections] = useState([])
  const [search, setSearch] = useState('');
  const user = useSelector(state=> state.presisted.user)

  useEffect(()=>{
    const getData = async ()=>{
      try {
        const response = await api.get('/connection/mutuals/'+user.uid);
        setConnections(response.data);
      } catch (error) {
        toast.error(error.message)
      }
    }
    getData();

  },[])
  
  const sendRequest = async (conn)=>{
    try {
      const response = await api.post('/connection/buildConnection',{uid:conn.uid,user:user.uid});
      if(response.data){
        const data = {...response.data,requester:[user]};
        socket.emit('sendRequest',conn.uid,data)
        setConnections(prev=> prev.filter(user => user.user._id != conn._id));
        toast('Request Sended');
      }
    } catch (error) {
      
     
      Failed('Allready sended a request')
    }
  }

  const searchUser = async (value)=>{
    const response = await api.get(`/connection/mutuals/${user.uid}?value=${value}`);
    setConnections(response.data);
  }

  const debounce = useMemo(()=> _.debounce(searchUser,3000),[])
  
  const handleSearch = (e)=>{
    setSearch(e.target.value);
    debounce(e.target.value);
  }

  return (
    <div className=" p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Mutuals</h1>
        <div className="text-purple-600 cursor-pointer">Sort by newly added</div>
      </div>
      
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 pl-10 border border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
          onChange={handleSearch}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      <div className="space-y-4">
        {connections?.map((connection) => (
          <div key={connection.user.uid} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <img src={connection.user.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png' } alt={connection.name} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h2 className="font-bold">{connection.user.name}</h2>
                <p className="text-sm text-gray-600">{connection.skills}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock size={12} className="mr-1" />
                  <span>Connected {connection.connectedTime}</span>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-full hover:bg-purple-100 transition-colors" onClick={()=>sendRequest(connection.user)}>
              Request
            </button>
            {/* <button className="px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-full hover:bg-purple-100 transition-colors" onClick={()=>guidToMessage(connection.otherUser[0])}>
              Goto Profile
            </button> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Mutuals
