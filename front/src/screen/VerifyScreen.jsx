import React, { useRef, useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useLocation, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';
import { BASE_URL } from '../../const/url';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../utils/userSlice';
import api from '../axios/userInterceptor';


const VerifyScreen = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const [otp, setOtp] = useState('');
    const [captcha, setCaptche] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [inputBorderColor, setInputBorderColor] = useState('border-gray-300');
    const uid = location.state.uid;
    const captchaRef = useRef();
    const navigate = useNavigate();
    const onCaptchaChange = (value) => {
        setCaptche(value)
    }

    const resendOTP = async ()=>{
        try {
            const result = await axios.post(`${BASE_URL}/resendOTP`,{uid})
            location.state.otp = result.data?.otp
        } catch (error) {
            console.error(error)
        }
    }
    
    const verifyOtp = async (e) => {
        e.preventDefault();
        captchaRef.current.reset()
        if(otp === location.state?.otp) {
            const res = await api.post(`/verify`,{
                isVerified:true,
                captcha,
                uid
            },{withCredentials:true});
            localStorage.setItem('accessToken',res.data.accessToken);
            if(res.status === 200){
                const result = await api.get('/user',{withCredentials:true});
                dispatch(setCredentials({...result.data}));
                navigate('/home');
            }
        } else {
            setErrorMessage('Invalid OTP. Please try again.');
            setInputBorderColor('border-red-500');
            setTimeout(() => {
                setErrorMessage('');
                setInputBorderColor('border-gray-300');
            }, 5000);
        }
    }


    return (
        <div style={{backgroundImage:`url(https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/login.png?alt=media&token=9dd55b7d-3cf1-46e1-8c92-f447e8630b08)`}} className='h-screen bg-cover bg-center flex items-center justify-center'>
            <div className='bg-user h-[90%] w-[90%] rounded-xl flex items-center justify-center'>
                <div className='bg-white h-[95%] w-[97%] rounded-xl'>
                    <div className='flex flex-col flex-shrink items-center mt-10 '>
                        <img src='https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/logo1.png?alt=media&token=9dd55b7d-3cf1-46e1-8c92-f447e8630b08' className='w-[30%]'/>
                        <input 
                            type="text" 
                            value={otp} 
                            placeholder='Enter OTP' 
                            className={`border ${inputBorderColor} m-16 p-2 mb-2 w-[50%]`} 
                            onChange={(e)=>setOtp(e.target.value)} 
                        />
                        {errorMessage && (
                            <span className='text-red-500 text-sm mb-2'>{errorMessage}</span>
                        )}
                        <span onClick={resendOTP} className='ml-[-40%] text-gray-400 w-40m text-xs'>Resend OTP</span>
                        <ReCAPTCHA sitekey='6LfL6f8pAAAAAEYFzYQJUXL3k8Qw7xYUvyTJjtd5' onChange={onCaptchaChange} className='m-16' ref={captchaRef}/>
                        <button className='bg-user rounded w-[50%] m-2 p-2 text-white' onClick={verifyOtp}>Verify</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyScreen