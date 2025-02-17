import express from 'express';
import { getTaskById, getTasks } from '../controllers/taskController.js';

// router object
const router = express.Router();

// routes

// GET ALL TASKS LIST || GET
router.get('/getall', getTasks)

// GET TASK BY ID
router.get('/get/:taskId', getTaskById);

export default router;