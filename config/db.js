import mysql from 'mysql2/promise';

const mySqlPool = mysql.createPool({
    host: 'localhost',  
    user: 'root',
    password: '',
    database: 'task'
})

// module.exports = MySqlPool;
export default mySqlPool;