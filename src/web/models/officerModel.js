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

const getOneStudent = async (studentId) => {

    const sql = `SELECT * FROM students 
                    WHERE id = ?`;

    try {
           const [rows] = await db.promise().query(sql, [studentId]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }

};

const updateStudent = async (student_no, first_name, surname, email, study_year, grad_year, studentId) => {
    const sql = `UPDATE students 
                SET student_no = ?, first_name = ?, last_name = ?, email = ?, study_year = ?, graduation_year = ?
                WHERE id = ? `

    try {
           const [rows] = await db.promise().query(sql, [student_no, first_name, surname, email, study_year, grad_year, studentId]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};


const addStudent = async (student_no, first_name, surname, email, programmeId, study_year, grad_year) => {
    const sql = `INSERT INTO students (student_no, first_name, last_name, email, programme_id, study_year, graduation_year)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`

    try {
           const [rows] = await db.promise().query(sql, [student_no, first_name, surname, email, programmeId, study_year, grad_year]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};

const deleteStudent = async(studentId) => {
    const sql = `DELETE FROM students WHERE id = ?`

        try {
           const [rows] = await db.promise().query(sql, [studentId]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};


export default { getOfficerProgrammes, getStudents, getOneStudent, updateStudent, addStudent, deleteStudent }