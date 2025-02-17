import db from "../config/db.js";

// GET ALL TASK LIST
const getTasks = async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM tasks ");
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "Task not found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Task List",
            totalTasks: data[0].length,
            data: data[0]
        });
    } catch (error) {
        console.log(error);
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
        const data = await db.query("SELECT * FROM tasks WHERE id =?", [taskId]);
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
        const {title, description, status} = req.body;
        if ( !title ||!description || !status) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }
        const data = await db.query(
            "INSERT INTO tasks (title, description, status) VALUES (?,?,?)",
            [title, description, status]
        );
        if(!data){
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

export { getTasks, getTaskById, createTask };
