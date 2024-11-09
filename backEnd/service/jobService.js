import { response } from 'express';
import Job from './../repository/jobRepository.js'
import User from './../repository/userRepository.js'

class JobService{
    async postJob(user, values) {
        const obj = {...values,postedBy:user}
        const response = await Job.post(obj);
        return response;
    }

    async getPost(user) {
        const response = await Job.getPosts(user);
        return response;
    }

    async deletePost(id) {
        const response = await Job.deletePost(id);
        return response;
    }

    async removePost(id,user) {
        const response = await Job.removePost(id,user);
        return response;
    }

    async getMyJobs(user) {
        const applied = await Job.appliedJobByUser(user);
        const jobId = applied.map((item)=> item.job)
        const userDetails = await User.findByUid(user);
        const response = await Job.getMyJobs(userDetails?.industry,user,jobId);
        return response
    }

    async getPostedJobs(user) {
        const response = await Job.getPostedJobs(user)
        return response
    }

    async applyJob(user, values, job) {
        const check = await Job.check(user, job);
        if(check) return {message:'Allready applied'}
        const obj = {
            ...values,
            applicant: user,
            job: job,
        }
        const response = await Job.apply(obj);
        return response
    }

    async appliedJob(user) {
        const response = await Job.appliedJob(user);
        return response
    }

    async applications(id) {
        const response = await Job.applications(id);
        return response;
    }

    async getApplication(id) {
        const response = await Job.getApplication(id)
        return response
    }

    async rejectApplication(id) {
        const response = await Job.rejectApplication(id)
        return response
    }

    async acceptApplication(id,date,time,email) {
        const response = await Job.acceptApplication(id,date,time,email);
        return response
    }

    async getJobs() {
        const response = await Job.getJobs();
        return response
    }

    async editJob(id, values) {
        const response = await Job.editJob(id, values);
        return response;
    }
}

export default new JobService()