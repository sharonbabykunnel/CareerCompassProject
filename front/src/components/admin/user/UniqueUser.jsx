import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import adminApi from '../../../axios/adminInterceptor';
import { Success } from '../../../helpers/popup';

const uniqueUser = () => {
    const location = useLocation();
    const [user, setUser] = useState(null)
    const [count, setCount] = useState([])
    useEffect(()=>{
      setUser(location.state.user)
      const fetch = async ()=>{
        const response = await adminApi.get(`/user/associated/${location.state.user.uid}`);
        setCount(response.data)
      }
      fetch()
    },[])


    const unblock = async()=>{
      const response = await adminApi.post(`/user/unblock/${user.uid}`);
      if(response.data.message === 'success'){
        Success('Unblocked');
        setUser({...user,isBlocked : false})
      }
    }

    const blockUser = async ()=>{
      const response = await adminApi.post(`/user/block/${user.uid}`);
      if(response.data.message === 'success') {
        Success('User Blocked');
        setUser({...user,isBlocked : true})
      } 
    }
  return (
    <section className="content-main">
    {user ? <>
        <div className='flex justify-between'>
          <div className="flex items-center m-4 gap-2"> 
            <Link to='/admin/users'>
            <img className="w-8" src='https://cdn-icons-png.flaticon.com/128/3114/3114883.png'/> 
            </Link>
            <div>Go back</div> 
          </div>
          {user.isBlocked ? 
          <button onClick={unblock} className='m-4 bg-green-700 px-4 rounded'>Unblock</button> :
          <button onClick={blockUser} className='m-4 bg-red-700 px-4 rounded'>Block</button>}
        </div>
      <div className="rounded-xl overflow-hidden border m-4 relative">
      <div className="relative w-full h-40">
  {/* Cover photo background */}
  <div 
    className="w-full h-full bg-blue-600" 
    style={{
      backgroundImage: `url(${user.coverPhoto })`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center'
    }}>
  </div>

  <div className="absolute rounded-xl max-w-32 top-20 left-6 bg-white shadow-lg">
    <img 
      className="rounded-xl object-cover" 
      src={user?.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'} 
      alt="Profile" 
    />
  </div>
</div>

        <div className="mt-20">
          <div className="row">
            <div className="ml-4">
              <h3>{user.name}</h3>
              <p className='text-sm text-right pt-2'>
            {user.position} <br /> {user.about}
            </p>
            </div>
            <div className="col-xl-4 text-md-end">
            </div>
          </div>
          <hr className="my-4" />
          <div className="">
            <div className="rounded border mx-4">
              <article className="p-2">
                <p className="mb-0 text-muted">Connections: <span className="text-success">{count[0]}</span></p>
                
                <p className="mb-0 text-muted">Total post: <span className="text-success">{count[1]}</span></p>
                
                <p className="mb-0 text-muted">Job post: <span className="text-success">{count[2]}</span></p>
                
              </article>
            </div>
            <div className='flex justify-between p-2'>
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <h6>Details</h6>
              <p>
                Email: {user.email} <br />
                Mobile No.: {user.mobile || '--'} <br />
              </p>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <p>
                About: {user?.position || ''} <br />
                status: {user.isVerified ? 'verified' : 'not verified'}
                {/* Postal code: {address?.pincode || ''} */}
              </p>
            </div>
            </div>
            {/* <div className="col-sm-6 col-xl-4 text-xl-end">
              <div className="mapbox position-relative d-inline-block">
                <img src="/assets/imgs/misc/map.jpg" className="rounded2" height="120" alt="map" />
                <span className="map-pin" style={{top: '50px', left: '100px'}}></span>
                <button className="btn btn-sm btn-brand position-absolute bottom-0 end-0 mb-15 mr-15 font-xs"> Large </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Order by {user.name}</h5>
          <div className="row">
            {order?.map((orderItem, i) => 
              orderItem.item.map((item, j) => (
                <div key={`${i}-${j}`} className="col-xl-2 col-lg-3 col-md-6">
                  <div className="card card-product-grid w-100 h-100">
                    <img src={`/images/${item?.product?.image[0]}`} alt="Product" style={{width: '200px', height: '200px'}} />
                    <a href="#" className="img-wrap">
                      <div className="info-wrap">
                        <a href="#" className="title">{item?.product.title}</a>
                        <div className="price mt-1">${item?.product.price} ({item.quantity})</div>
                      </div>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div> */}
      </>
      :
      <div>
        loading
        </div>}
    </section>
  );
};

export default uniqueUser;