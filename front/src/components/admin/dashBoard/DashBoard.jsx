import React, { lazy, useEffect, useState } from 'react'
const App = lazy(() => import('./Chart'))
import { BriefcaseBusiness, Image, ImageIcon, Users, Users2Icon } from 'lucide-react'
import adminApi from '../../../axios/adminInterceptor'

const DashBoard = () => {
  const [total ,setTotal] = useState(0);
  const [data,setData] = useState([])
  const [avg,setAvg] = useState()
  const [who, setWho] = useState('')
  const [usersJoinedThisMonth, setUsersJoinedThisMonth] = useState(0);
  useEffect(()=>{
    chart()
  },[])
  const chart =async ()=>{
    const response = await adminApi.get('/get/user/chart');
    setData(response.data)
    setWho('Users')
    setAvg(Math.round(average(response.data)))
    setUsersJoinedThisMonth(joinedThisMonth(response.data));
    setTotal(findTotal(response.data))
  } 
  const findTotal = (givenData)=>{
    return givenData.reduce((acc,item)=> acc + item.count,0)
  }
  const joinedThisMonth = (givenData) =>{
  const currentMonth = new Date().getMonth() + 1; 
  return givenData.filter(item => item.month === currentMonth).reduce((acc, item) => acc + item.count, 0);
  }
  const average = (givenData)=>{
    const total = givenData.reduce((acc, item) => acc + item.count, 0);
    return total / givenData.length;
  }
  const hanldePost = async ()=>{
    const response = await adminApi.get(`/get/post/chart`);
    setData(response.data)
    setAvg(Math.round(average(response.data)))
    setWho('Posts');
    setUsersJoinedThisMonth(joinedThisMonth(response.data));
    setTotal(findTotal(response.data));
  }
  const hanldeJob =async ()=>{
    const response = await adminApi.get(`/get/job/chart`);
    setData(response.data);
    setAvg(Math.round(average(response.data)))
    setWho('Jobs');
    setUsersJoinedThisMonth(joinedThisMonth(response.data));
    setTotal(findTotal(response.data));
  }
  return (
    <div className='grid grid-flow-row grid-rows-7 grid-cols-6 h-[80vh] gap-4'>
      <div className='bg-admin_lite md:col-span-2 md:row-span-3 m-6 rounded sm:col-span-3 sm:row-span-2'>
        <div className='flex justify-between m-4'>
          <h1 className='text-xl'>{who}</h1>
          {who === 'Users' ? <Users/> : who === 'Posts' && <Image/>}
        </div>
        <div className='flex flex-col justify-center items-center '>
          <h1>{total}</h1>
          <h2>{avg} per month</h2>
        </div>
      </div>
      <div className='bg-admin_lite md:col-span-4 md:row-span-6 m-4 rounded sm:col-span-6 sm:row-span-4'>
        <App data={data} />
      </div>
      <div className='bg-admin_lite md:col-span-2 md:row-span-3 m-6 rounded sm:col-span-3 sm:row-span-2 sm:col-start-4 sm:row-start-1'>
        <div className='flex justify-between m-4'>
          <h1 className='text-xl'>{who} this month</h1>
          {who === 'Users' ? <Users/> : who === 'Posts' ? <Image/> : who === 'Jobs' && <BriefcaseBusiness/>}
        </div>
        <div className='flex flex-col justify-center items-center '>
          <h1></h1>
          <h2>{usersJoinedThisMonth}</h2>
        </div>
      </div>
      
      <div
        className="flex m-6 mt-0  col-start-1 col-end-8 justify-around gap-4 items-center px-4 py-1 bg-admin_lite rounded-[15px] ring-1 ring-white"
      >
        

        <div
          className={`relative group ${ who === 'Users' && 'bg-user'} hover:cursor-pointer  p-2 rounded-full transition-all duration-500`}
        >
          <Users2Icon onClick={chart}/>

          <div
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-max px-2 py-1 text-white bg-black rounded-md opacity-0 scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100"
          >
            user
          </div>
        </div>

        <div
          className={`relative group hover:cursor-pointer ${who === 'Posts' && 'bg-user'} hover:bg-slate-800 p-2 rounded-full transition-all duration-500`}
        >
          <ImageIcon onClick={hanldePost}/>
          <div
            class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-max px-2 py-1 text-white bg-black rounded-md opacity-0 transform scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100"
          >
            Posts
          </div>
        </div>
        <div
          className={`relative group hover:cursor-pointer ${who === 'Jobs' && 'bg-user'} hover:bg-slate-800 p-2 rounded-full transition-all duration-500`}
        >
          <BriefcaseBusiness onClick={hanldeJob}/>
          <div
            class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-max px-2 py-1 text-white bg-black rounded-md opacity-0 transform scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100"
          >
            Jobs
          </div>
        </div>
      </div>

    </div>
  );
  
}

export default DashBoard
