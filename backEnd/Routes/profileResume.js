import express from 'express';
import profile from './../Controllers/profileController.js';
const router = express.Router();

router.post('/resume/add/:user', profile.uploadResume);
router.delete('/resume/delete/:id', profile.deleteResume);
router.get('/resume/get/:user', profile.getResume);
router.post('/experience/post/:id', profile.postExperience);
router.get('/experience/get/:user', profile.getExperience);
router.delete('/experience/delete/:id', profile.deleteExperience);
router.put('/experience/update/:id', profile.updateExperience);
router.get('/skills/get/:user', profile.getSkills);
router.post('/skills/post/:user', profile.postSkill);
router.put('/skills/edit/:user', profile.updateSkill);
router.delete('/skills/delete/:user/:id', profile.deleteSkill);

export default router;