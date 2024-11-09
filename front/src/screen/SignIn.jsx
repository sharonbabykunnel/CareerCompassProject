import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../config/firebase';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import SignInCombonent from '../components/helpers/SignInCombonent';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../axios/userInterceptor';
import { toast } from 'react-toastify';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showError, setShowError] = useState({});

  const signUpWithGoogle = async ()=>{
    try {
      const result = await signInWithPopup(auth, provider)
      const {displayName, email, emailVerified, photoURL, uid} = result.user;
      const response = await api.post(`/googleSignin`,{
        displayName, email, emailVerified, photoURL, uid
      },{withCredentials: true})

      if(response?.data){
        localStorage.setItem('accessToken',response.data.accessToken);
        dispatch(setCredentials({...response.data.user}))
        navigate('/home');
      }
    } catch (error) {
      // toast.error(error.response ? error.response.data.message : error.message)
    }
  };

  const showErrorWithTimeout = fieldName =>{
    setShowError(prev => ({
      ...prev,
      [fieldName]: true
    }));
  setTimeout(()=>{
    setShowError(prev => ({...prev,[fieldName]:false}))
  },5000)
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await api.post(`/signin`, values);
        if (result?.status === 200) {
          localStorage.setItem('accessToken',result.data.accessToken);
          dispatch(setCredentials({ ...result.data.user }));
          navigate('/home');
        }
      } catch (error) {
        toast(error.response ? error.response.data.message : error.response);
        Object.keys(formik.errors).forEach(showErrorWithTimeout);
      }
      setSubmitting(false);
    },
    validate: (values)=>{
      const errors = {};
      Object.keys(values).forEach(field=>{
        try {
          validationSchema.validateSyncAt(field,values);
        } catch (error) {
          errors[field] = error.message;
         showErrorWithTimeout(field); 
        }
      })
      return errors
    }
  });  


  return (
<section className="bg-white">
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
                <p className="mt-2 text-base text-gray-600">Don’t have an account? <Link to="/auth/signup" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700">Create a free account</Link></p>

                <form onSubmit={formik.handleSubmit} className="mt-8">
                    <div className="space-y-5">
                        <div>
                            <label  className="text-base font-medium text-gray-900"> Email address </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name='email'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    placeholder="Enter email to get started"
                                    className={` block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border  'border-gray-500'  rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 `}
                                />
                                {formik.touched.email && formik.errors.email && (
                                  <div className={` transition-opacity ease-out text-red-500 text-sm mt-1 ${showError.email ? 'opacity-100' : 'opacity-0'}`}>
                                    {formik.errors.email}
                                  </div>
                                )}                               
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="text-base font-medium text-gray-900"> Password </label>
                            </div>
                            <div className="mt-2.5">
                                <input
                                    type="password"
                                    name='password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    placeholder="Enter your password"
                                    className={` block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border  'border-gray-500'  rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 `}
                                />
                              {formik.touched.password && formik.errors.password && (
                                <div className={` transition-opacity ease-out text-red-500 text-sm mt-1 ${showError.password ? 'opacity-100' : 'opacity-0'}`}>
                                  {formik.errors.password}
                                </div>
                              )}
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">Log in</button>
                        </div>
                    </div>
                </form>

                <SignInCombonent signUpWithGoogle={signUpWithGoogle}/>
            </div>
        </div>

        <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8 h-screen">
          <div className="absolute inset-0">
            <img className="object-cover w-full h-full" src="https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/login.png?alt=media&token=9dd55b7d-3cf1-46e1-8c92-f447e8630b08" alt="" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative">
            <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
              <h3 className="text-4xl font-bold text-white">Explore career opportunities &<br className="hidden xl:block" />Start journey toward your dream job.</h3>
              <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white"> Commercial License </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white"> Job opportunities</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white"> 120+ Users </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white"> Build Connections </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
</section>

  )
}

export default SignIn
