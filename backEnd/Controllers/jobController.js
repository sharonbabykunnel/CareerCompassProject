import expressAsyncHandler from "express-async-handler";
import Job from './../service/jobService.js';

const postJob = expressAsyncHandler(async (req, res) => {
    try {
        const user = req.params.user
        const values = req.body;
        const response = await Job.postJob(user, values);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const getPost = expressAsyncHandler(async (req, res) => {
    try {
        const user = req.params.user
        const response = await Job.getPost(user);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const deletePost = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params
        const response = await Job.deletePost(id);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const removePost = expressAsyncHandler(async (req, res) => {
    try {
        const {id,user} = req.params
        const response = await Job.removePost(id,user);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const getMyJobs = expressAsyncHandler(async (req, res) => {
    try {
        const { user } = req.params;
        const response = await Job.getMyJobs(user);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const getPostedJobs = expressAsyncHandler(async (req, res) => {
    try {
        const { user } = req.params;
        const response = await Job.getPostedJobs(user);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const applyJob = expressAsyncHandler(async (req, res) => {
    try {
        const {user,job} = req.params
        const { payload } = req.body;
        const response = await Job.applyJob(user, payload, job);
        if(response.message) res.status(500).json(response)
        else res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const appliedJob = expressAsyncHandler(async (req, res) => {
    try {
        const { user } = req.params;
        const response = await Job.appliedJob(user);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const applications = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Job.applications(id);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const getApplication = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Job.getApplication(id);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const rejectApplication = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Job.rejectApplication(id);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const acceptApplication = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { date, time, email } = req.body;
        const response = await Job.acceptApplication(id,date,time,email);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const getJobs = expressAsyncHandler(async (req, res) => {
    try {
        const response = await Job.getJobs();
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const editJob = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const  values  = req.body;
        const response = await Job.editJob(id,values);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

export default {
  postJob,
  getPost,
  deletePost,
  removePost,
  getMyJobs,
  getPostedJobs,
  applyJob,
  appliedJob,
  applications,
  getApplication,
  rejectApplication,
  acceptApplication,
  getJobs,
  editJob,
};