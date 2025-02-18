import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import mySqlPool from './config/db.js';
import router from './routes/taskRoutes.js';


// configure dotenv
dotenv.config();

//rest objeect 
export const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/tasks", router)

app.get("/tasks", (req, res) => {
    res.status(200).send('<h1>Nodejs Mysql APP</h1>');
});

//port 
const PORT = process.env.PORT || 8000;

// conditionally Listen
mySqlPool
    .query('SELECT 1')
    .then(() => {
        // MySQL
        console.log('MySQL DB Connected...');
        //listen
        app.listen(PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });