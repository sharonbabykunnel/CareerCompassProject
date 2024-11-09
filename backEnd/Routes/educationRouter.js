import express from 'express'
import education from './../Controllers/educationController.js'

const router = express.Router();

router.post('/add/:user', education.addEducation);
router.get("/get/:user", education.getEducation);
router.delete('/delete/:id', education.deleteEducation)
router.put('/edit/:id', education.editEducation);

export default router;