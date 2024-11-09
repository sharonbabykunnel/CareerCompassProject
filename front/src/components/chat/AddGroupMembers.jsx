import React, { useEffect, useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import api from '../../axios/userInterceptor';
import { toast } from 'react-toastify';

const AddGroupMembers = ({setParticipents,setIsadd}) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [connections,setConnections] = useState();
  const user = useSelector(state=>state.presisted.user.uid);

  useEffect(()=>{
    const getData = async ()=>{
    const response = await api.get('/connection/'+user);
    setConnections(response.data);
    }
    getData();

  },[])

  const removeMember = (id) => {
    setSelectedMembers(selectedMembers.filter(member => member._id !== id));
  };

  const addMember = (member)=>{
    setSelectedMembers([...selectedMembers,member])
  }

  const goBack = ()=>{
    if(selectedMembers.length < 2){
        toast('Need At least Three members')
    }
    setParticipents([...selectedMembers]);
    setIsadd(false)
  }

  return (
    <div className="bg-user text-white flex flex-col w-[70vw] p-4 h-screen">
      <div className="flex items-center mb-4">
        <ArrowLeft className="mr-2" />
        <h1 className="text-xl font-semibold">Add group members</h1>
      </div>

      <div className="flex flex-wrap mb-4">
        {selectedMembers.map(member => (
          <div key={member.id} className="flex items-center bg-lite_user rounded-full px-3 py-1 mr-2 mb-2">
            <span className="w-6 h-6 overflow-hidden bg-gray-600 rounded-full mr-2"><img src={member.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'} alt="" /></span>
            <span>{member.name}</span>
            <X size={16} className="ml-2 cursor-pointer" onClick={() => removeMember(member._id)} />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Type a name"
          className="w-full bg-lite_user text-white p-2 rounded"
        />
      </div>

      <div className='h-[60vh] overflow-scroll scrollbar-hide'>
        {connections?.map(contact => (
          <div key={contact._id} className="flex items-center mb-4" onClick={()=>addMember(contact.otherUser)}>
            <span className="w-10 h-10 bg-gray-600 rounded-full overflow-hidden mr-3"><img src={contact.otherUser.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'} alt="" /></span>
            <div>
              <p>{contact.otherUser.name}</p>
              {/* <p className="text-gray-400 text-sm">Loading About...</p> */}
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center'>
        <ArrowLeft onClick={goBack} />
      </div>
    </div>
  );
};

export default AddGroupMembers;