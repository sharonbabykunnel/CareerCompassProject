import Admin from './../repository/adminRepository.js';
import Users from './../repository/userRepository.js';
import Connection from './../repository/connectionRepository.js'
import Post from './../repository/postRepository.js'
import Job from './../repository/jobRepository.js'
import { response } from 'express';

class adminService{
    async getChartData() {
        const response = await Admin.getChartData();
        return response;
    }

    async getAllUsers(current) {
        const [count,users] = await Promise.all([ Users.findAllByAgg(),Users.findAll(current)]);
        return [count,users]
    }

    async getAllPost(current) {
        const [count,users] = await Promise.all([ Post.count(''),Post.getAllPost(current)]);
        return [count,users]
    }

    async getAssociated(user) {
        const response = await Promise.all([Connection.count(user), Post.count(user), Job.count(user)]);
        return response
    }

    async blockUser(user) {
        const response = await Users.blockUser(user);
        if (!response) return { message: 'faild' }
        
        return {message:'success'}
    }

    async unblockUser(user) {
        const response = await Users.unblockUser(user);
        if (!response) return { message: 'faild' }
        return {message:'success'}
    }

    async blockPost(uid) {
        const response = await Post.blockPost(uid)
        return response
    }

    async unblockPost(uid) {
        const response = await Post.unblockPost(uid)
        return response
    }

    async getPostDetails(uid) {
        const response = await Post.getDetails(uid);
        return response;
    }

    async getPostChartData() {
        const response = await Post.getChartData()
        return response;
    }

    async getJobChartData() {
        const response = await Job.getChartData()
        return response;
    }
}

export default new adminService()