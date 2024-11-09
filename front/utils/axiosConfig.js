import axios from 'axios';
import { BASE_URL } from '../const/url';
import { request } from 'express';

const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
    withCredentials:true
})

axiosInstance.interceptors.request.use(async (request) => {
})