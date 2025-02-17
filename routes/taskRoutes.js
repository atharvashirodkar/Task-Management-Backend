import express from 'express';
import { createTask, getTaskById, getTasks } from '../controllers/taskController.js';

// router object
const router = express.Router();

// routes

// GET ALL TASKS LIST || GET
router.get('/getall', getTasks)

// GET TASK BY ID
router.get('/get/:taskId', getTaskById);

// CREATE TASK || POST 
router.post('/create', createTask);

export default router;