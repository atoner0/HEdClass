import db from "../config/db.js";

const getOfficers = async () => {
    const sql = `SELECT users.id, users.username, users.email, programmes.title
                 FROM users
                 INNER JOIN officer_programmes
                 ON
                    users.id = officer_programmes.officer_id
                 INNER JOIN programmes
                 ON
                    officer_programmes.programme_id = programmes.id`;
    try {
           const [rows] = await db.promise().query(sql);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};

const getProgrammes = async () => {

    const sql = `SELECT programmes.title, programmes.academic_year  
            FROM programmes `;

    try {
           const [rows] = await db.promise().query(sql);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }

};

export default { getOfficers, getProgrammes };