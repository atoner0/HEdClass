import db from "../config/db.js";

const getOfficerProgrammes = async (officerId) => {
    const sql = `SELECT programmes.id, programmes.title, programmes.code, programmes.academic_year, COUNT(students.id) AS student_count
                 FROM programmes
                 INNER JOIN officer_programmes
                 ON
                     officer_programmes.programme_id = programmes.id
                 LEFT JOIN students
                 ON
                    students.programme_id = programmes.id
                 WHERE officer_programmes.officer_id = ?
                 GROUP BY programmes.id`

    try {
           const [rows] = await db.promise().query(sql, [officerId]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};

const getStudents = async (programmeId) => {
    const sql = `SELECT * FROM students
                    WHERE programme_id = ?`;

    try {
           const [rows] = await db.promise().query(sql, [programmeId]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
}

export default { getOfficerProgrammes, getStudents }