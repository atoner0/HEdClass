import db from "../config/db.js";

const getUser = async (fullEmail) => {
    const sql = `SELECT * FROM users WHERE email = ?`;

    try {
           const [rows] = await db.promise().query(sql, [fullEmail]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};



export default { getUser};