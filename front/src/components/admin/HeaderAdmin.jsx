import React, { useState } from 'react';
import adminApi from '../../axios/adminInterceptor';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeAdmin } from '../../../utils/adminSlice';

const HeaderAdmin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    }

    const logoutAdmin  = async()=>{
        try {
            await adminApi.post('/auth/logout');
            dispatch(removeAdmin())
            navigate('/admin/login');
        } catch (error) {
            throw error
        }
    }
    return (
        <div className='flex justify-between items-center p-4 px-10 bg-admin_lite'>
            <div>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/logo3.png?alt=media&token=863e9e4c-817a-4dc6-b93d-61351120d4ad"
                    alt="Logo"
                    className='h-10 w-auto' 
                />
            </div>
            <div>
            <div className="relative w-10 h-[34px] mx-auto">
                <label onClick={handleShow} className="block w-full h-full cursor-pointer">
                    <div className={`absolute left-0 right-0 h-1 bg-[#7b52b9] rounded-[2px] opacity-100 transition-[bottom,transform] duration-[350ms] ease-[cubic-bezier(.5,-0.35,.35,1.5)] 
                        ${show 
                            ? 'rotate-[-135deg] delay-0 bottom-[calc(50%-2px)]' 
                            : 'bottom-[calc(50%+13px)] delay-[210ms]'
                        }`}>
                    </div>
                    <div className={`absolute left-0 right-0 h-1 bg-[#7b52b9] rounded-[2px] opacity-100 transition-[opacity,transform] duration-[350ms] ease-[cubic-bezier(.5,-0.35,.35,1.5)] top-[calc(50%-2px)]
                        ${show 
                            ? 'opacity-0 rotate-[-135deg] delay-[105ms]' 
                            : 'delay-[105ms]'
                        }`}>
                    </div>
                    <div className={`absolute left-0 right-0 h-1 bg-[#7b52b9] rounded-[2px] opacity-100 transition-[top,transform] duration-[350ms] ease-[cubic-bezier(.5,-0.35,.35,1.5)] 
                        ${show 
                            ? 'rotate-[-225deg] top-[calc(50%-2px)] delay-[210ms]' 
                            : 'top-[calc(50%+13px)] delay-0'
                        }`}>
                    </div>
                </label>
            </div>
            {show && (
              <button onClick={logoutAdmin} className=' m-4 absolute'>logout</button>
            )}
            </div>
        </div>
    );
};

export default HeaderAdmin;