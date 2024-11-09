import React, { useEffect } from 'react'
import Header_user from '../components/headers/Header_user'
import Body from './../../src/components/home/Body'
import api from '../axios/userInterceptor'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../utils/userSlice'

const HomeScreen = () => {
  return (
    <div>
      <Header_user/>
      <Body/>
    </div>
  )
}

export default HomeScreen
