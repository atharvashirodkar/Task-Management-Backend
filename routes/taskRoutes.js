import express from 'express';
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../controllers/taskController.js';

// router object
const router = express.Router();

// routes

// GET ALL TASKS LIST || GET
router.get('/getall', getTasks)

// GET TASK BY ID
router.get('/get/:taskId', getTaskById);

// CREATE TASK || POST 
router.post('/create', createTask);

//  UPDATE TASK || POST
router.put('/update/:taskId', updateTask);

// DELETE TASK || DELETE

router.delete('/delete/:taskId', deleteTask);

export default router;