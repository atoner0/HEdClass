import mysql from "mysql2";

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '40365038',
    port: '3306'
});

db.getConnection((err) => {
    if (err) return console.log(err.message);
    console.log("connected successfully");
});

export default db;