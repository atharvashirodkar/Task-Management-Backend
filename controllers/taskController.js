import db from "../config/db";

// GET ALL TASK LIST
const getTasks = async (req, res) =>{
    try{
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
            data
        });
    } catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get All Task API",
            error
        });
    }
};

export {getTasks};
