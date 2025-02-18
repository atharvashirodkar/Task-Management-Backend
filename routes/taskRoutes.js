import express from 'express';
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../controllers/taskController.js';

// Router Object
const router = express.Router();

// Routes

// GET ALL TASKS LIST || GET
router.get('', getTasks)

// GET TASK BY ID
router.get('/:taskId', getTaskById);

// CREATE TASK || POST 
router.post('', createTask);

//  UPDATE TASK || POST
router.put('/:taskId', updateTask);

// DELETE TASK || DELETE
router.delete('/:taskId', deleteTask);

export default router;