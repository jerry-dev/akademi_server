import express from 'express';
import studentController from '../controllers/student.js';

const router = express.Router();

router.get('/student', studentController.getStudents());

export default router;