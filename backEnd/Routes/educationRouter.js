import express from 'express'
import education from './../Controllers/educationController.js'

const router = express.Router();

router.post('/:user', education.addEducation);
router.get("/:user", education.getEducation);
router.delete('/:id', education.deleteEducation)
router.put('/:id', education.editEducation);

export default router;