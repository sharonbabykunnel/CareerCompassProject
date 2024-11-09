import express from 'express'
const router = express.Router()
import job from './../Controllers/jobController.js';

router.post("/post/:user", job.postJob);
router.get("/get/:user", job.getPost);
router.delete('/delete/:id', job.deletePost);
router.delete('/remove/:id/:user', job.removePost);
router.get('/getPostedJobs/:user', job.getPostedJobs);
router.get("/getMyJobs/:user", job.getMyJobs);
router.post('/apply/:user/:job', job.applyJob);
router.get('/applied/get/:user', job.appliedJob);
router.get('/applications/get/:id', job.applications);
router.get('/application/get/:id', job.getApplication);
router.patch('/application/reject/:id', job.rejectApplication);
router.patch('/application/accept/:id', job.acceptApplication);
router.get('/getJobs', job.getJobs);
router.put('/edit/:id', job.editJob);

export default router