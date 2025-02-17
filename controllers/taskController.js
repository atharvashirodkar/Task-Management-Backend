import db from "../config/db.js";

// GET ALL TASK LIST WITH PAGINATION IF PAGE NO. IS PROVIDED AND ADD ABILITY TO FILTER TASKS BY TITLE OR STATUS USING QUERY PARAMETERS
const getTasks = async (req, res) => {
    try {
        const pageNo = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const startIndex = (pageNo - 1) * limit;
        const title = req.query.title ? `%${req.query.title}%` : '%';
        const status = req.query.status ? `%${req.query.status}%` : '%';

        let query = `SELECT * FROM tasks WHERE title LIKE ? AND status LIKE ?`;
        let queryParams = [title, status];

        if (req.query.page || req.query.limit) {
            query += ` LIMIT ? OFFSET ?`;
            queryParams.push(limit, startIndex);
        }
        const [rows] = await db.query(query, queryParams);
        
        res.status(200).send({
            success: true,
            message: "Task List",
            data: rows,
            totalTasks: rows.length,
            currentPage: pageNo
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in Get All Task API",
            error
        });
    }
};

// GET TASK BY ID
const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        if (!taskId) {
            return res.status(400).send({
                success: false,
                message: "Invalid or Provide Task Id",
            });
        }
        const data = await db.query(`SELECT * FROM tasks WHERE id =?`, [taskId]);
        if (!data[0][0]) {
            return res.status(404).send({
                success: false,
                message: "Task not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Task Details",
            data: data[0][0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get Task By Id API",
            error
        });
    }
}

//  CREATE TASK

const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        if (!title || !description || !status) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }
        const data = await db.query(
            `INSERT INTO tasks (title, description, status) VALUES (?,?,?)`,
            [title, description, status]
        );
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "Error in INSERT QUERY"
            });
        }
        res.status(201).send({
            success: true,
            message: "Task created successfully",
            data: data.insertId
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Create Task API",
            error
        });
    }
};

// UPDATE TASK

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        if (!taskId) {
            res.status(404).send({
                success: false,
                message: "Invalid or Provide Task Id",
            });
        }
        const { title, description, status } = req.body;
        // at least one task requires
        if (!title && !description && !status) {
            return res.status(400).send({
                success: false,
                message: "At least one field is required to update the task"
            });
        }


        const data = await db.query(`UPDATE tasks SET title =?, description =?, status =? WHERE id =?`, [title, description, status, taskId]);
        if (!data) {
            res.status(500).send({
                success: false,
                message: "Error in UPDATE DATA"
            });
        }
        res.status(200).send({
            success: true,
            message: "Task updated successfully",
            // data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update Task API",
            error
        });
    }
}

// DELETE TASK

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        if (!taskId) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Task Id or Valid Task Id",
            });
        }
        await db.query(`DELETE FROM tasks WHERE id =?`, [taskId]);
        res.status(200).send({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete Task API",
            error
        });
    }
}

export { getTasks, getTaskById, createTask, updateTask, deleteTask };
