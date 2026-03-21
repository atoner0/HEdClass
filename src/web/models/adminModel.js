import db from "../config/db.js";

const getOfficers = async () => {
    const sql = `SELECT users.id, 
                        users.username, 
                        users.email, 
                        GROUP_CONCAT(programmes.title SEPARATOR ',') AS programmes
                 FROM users
                 INNER JOIN officer_programmes
                 ON
                    users.id = officer_programmes.officer_id
                 INNER JOIN programmes
                 ON
                    officer_programmes.programme_id = programmes.id
                 WHERE users.role = 'officer'
                 GROUP BY users.id, users.username, users.email`;
    try {
           const [rows] = await db.promise().query(sql);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};

const getOneOfficer = async (officerId) => {
    const sql = `SELECT users.id, users.username, users.email, officer_programmes.programme_id
                 FROM users
                 INNER JOIN officer_programmes
                 ON
                    users.id = officer_programmes.officer_id
                 INNER JOIN programmes
                 ON
                    officer_programmes.programme_id = programmes.id
                 WHERE users.id = ?`;
    try {
           const [rows] = await db.promise().query(sql, [officerId]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};

const getProgrammes = async () => {

    const sql = `SELECT * FROM programmes `;

    try {
           const [rows] = await db.promise().query(sql);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }

};

const updateOfficer = async (officerId, username, email,) => {
    const sql = `UPDATE users 
                SET username = ?, email = ?
                WHERE id = ? `

    try {
           const [rows] = await db.promise().query(sql, [username, email, officerId]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};

const resetProgrammes = async (officerId) => {

    const sql = `DELETE FROM officer_programmes WHERE officer_id = ?`

    try {
           const [rows] = await db.promise().query(sql, [officerId]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};

const updateOfficerProgrammes = async (officerId, programmeId) => {

    const sql = `INSERT INTO officer_programmes (officer_id, programme_id)
                                VALUES (?, ?)`

    try {
           const [rows] = await db.promise().query(sql, [officerId, programmeId]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};

const addOfficer = async (username, email, password_hash, role) => {
    const sql = `INSERT INTO users (username, email, password_hash, role)
                    VALUES (?, ?, ?, ?)`

    try {
           const [rows] = await db.promise().query(sql, [username, email, password_hash, role]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};

const deleteOfficerUser = async(officerId) => {
    const sql = `DELETE FROM users WHERE id = ?`

        try {
           const [rows] = await db.promise().query(sql, [officerId]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};


export default { getOfficers, getOneOfficer, getProgrammes, updateOfficer, resetProgrammes, updateOfficerProgrammes,
                    addOfficer, deleteOfficerUser
 };