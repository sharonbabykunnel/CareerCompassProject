import Job from './../models/jobModel.js';
import Application from './../models/jobApplication.js'
import mongoose from 'mongoose';

class JobRepository {
  async post(obj) {
    return await Job.create(obj);
  }

  async getPosts(user) {
    return await Job.find({ postedBy: user });
  }

  async deletePost(_id) {
    return await Job.deleteOne({ _id });
  }

  async removePost(_id, user) {
    return await Job.updateOne({ _id }, { $addToSet: { removedUsers: user } });
  }

  async getMyJobs(industry, user, jobId) {
    return await Job.find({
      industry,
      isActive: true,
      postedBy: { $ne: user },
      removedUsers: { $ne: [user] },
      _id: { $nin: jobId },
    });
  }

  async getPostedJobs(user) {
    return await Job.find({ postedBy: user });
  }

  async apply(obj) {
    return await Application.create(obj);
  }

  async appliedJobByUser(user) {
    return await Application.find({ applicant: user });
  }
  async appliedJob(user) {
    return await Application.aggregate([
      {
        $match: { applicant: user },
      },
      {
        $lookup: {
          from: "jobposts",
          localField: "job",
          foreignField: "_id",
          as: "job",
        },
      },
      { $unwind: "$job" },
    ]);
  }

  async applications(id) {
    const objId = new mongoose.Types.ObjectId(id);
    return await Application.aggregate([
      {
        $match: { job: objId, status: { $ne: "rejected" } },
      },
      {
        $lookup: {
          from: "resumes",
          localField: "resume",
          foreignField: "_id",
          as: "resume",
        },
      },
      {
        $unwind: "$resume",
      },
    ]);
  }

  async getApplication(id) {
    const _id = new mongoose.Types.ObjectId(id);
    return await Application.aggregate([
      { $match: { _id } },

      // Lookup for resume
      {
        $lookup: {
          from: "resumes",
          localField: "resume",
          foreignField: "_id",
          as: "resume",
        },
      },
      { $unwind: { path: "$resume", preserveNullAndEmptyArrays: true } },

      // Lookup for user
      {
        $lookup: {
          from: "users",
          localField: "applicant",
          foreignField: "uid",
          as: "user",
        },
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },

      // Lookup for education
      {
        $lookup: {
          from: "educations",
          localField: "education",
          foreignField: "_id",
          as: "education",
        },
      },

      // Lookup for experiences
      {
        $lookup: {
          from: "jobexperiences",
          localField: "experience",
          foreignField: "_id",
          as: "experience",
        },
      },
    ]);
  }

  async rejectApplication(id) {
    return await Application.updateOne(
      { _id: id },
      { $set: { status: "rejected" } }
    );
  }

  async acceptApplication(id, date, time, email) {
    return await Application.updateOne(
      { _id: id },
      { $set: { status: "accepted", details: { date, time, email } } }
    );
  }

  async getJobs() {
    return await Job.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "postedBy",
          foreignField: "uid",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "job",
          as: "applications",
        },
      },
    ]);
  }

  async editJob(id, values) {
    return await Job.findByIdAndUpdate(id, { $set: values }, { new: true });
  }

  async check(user, job) {
    return await Application.findOne({ job, applicant: user });
  }

  async count(postedBy) {
    return await Job.find({ postedBy }).countDocuments();
  }

  async getChartData() {
    return await Job.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          month: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);
  }
}

export default new JobRepository()