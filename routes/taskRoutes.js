import express from 'express';
import { getTasks } from '../controllers/taskController';

// router object
const router = express.Router();

// routes

// GET ALL TASKS LIST || GET
router.get('/getall', getTasks)

export default router;