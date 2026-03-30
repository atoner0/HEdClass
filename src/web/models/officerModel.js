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

const getModulesResults = async(studentId) => {
    const sql =    `SELECT modules.id AS moduleId, modules.module_code, modules.module_title, modules.academic_level, modules.credits,
                        results.id AS resultId, results.attempt_no, results.mark, results.is_resit, 
                        results.capped_mark, results.passed
                    FROM results
                    INNER JOIN modules
                    ON modules.id = results.module_id
                    LEFT JOIN students
                    ON students.id = results.student_id
                    WHERE results.student_id = ?`

    try {
           const [rows] = await db.promise().query(sql, [studentId]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};

const getOneModuleResult = async(resultId) => {
    const sql = `SELECT modules.module_code, modules.module_title, modules.academic_level, modules.credits,
                        results.id AS resultId, results.attempt_no, results.mark, results.is_resit, 
                        results.capped_mark, results.passed
                    FROM results
                    INNER JOIN modules
                    ON modules.id = results.module_id
                    WHERE results.id = ?`

    try {
           const [rows] = await db.promise().query(sql, [resultId]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};


const updateResult = async(attemptNo, mark, resit, cappedMark, passed, resultId) => {
    const sql = `UPDATE results
           SET attempt_no = ?, mark = ?, is_resit = ?, capped_mark = ?, passed = ?
           WHERE id = ?`

    try {
           const [rows] = await db.promise().query(sql, [attemptNo, mark, resit, cappedMark, passed, resultId]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};

const getModuleInfo = async(programmeId) => {
    const sql = `SELECT * FROM modules
                    WHERE programme_id = ?`

        try {
           const [rows] = await db.promise().query(sql, [programmeId]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};

const addResult = async(studentId, moduleId, attemptNo, mark, isResit, cappedMark, passed) => {
    const sql = `INSERT INTO results (student_id, module_id, attempt_no, mark, is_resit, capped_mark, passed)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`

        try {
           const [rows] = await db.promise().query(sql, [studentId, moduleId, attemptNo, mark, isResit, cappedMark, passed]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};

const deleteResult = async(resultId) => {
    const sql = `DELETE from results WHERE id = ?`

        try {
           const [rows] = await db.promise().query(sql, [resultId]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};

const addClassification = async(studentId, yr1Creds, yr2Creds, yr3Creds, yr2Avg, yr3Avg, finalAvg, proposedClass, isEligible, eligibilityReason, user) => {
    const sqlCheckExists = `SELECT id FROM classifications WHERE student_id = ?`

    const sqlInsert = `INSERT INTO classifications (student_id, yr1_creds, yr2_creds, yr3_creds, yr2_avg, yr3_avg, final_avg, proposed_class, 
                                                is_eligible, eligibility_reason, classified_at, classified_by)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)`

    const sqlUpdate = `UPDATE classifications
                       SET yr1_creds = ?, yr2_creds = ?, yr3_creds = ?, yr2_avg = ?, yr3_avg = ?, final_avg = ?, 
                           proposed_class = ?, is_eligible = ?, eligibility_reason = ?, classified_at = NOW(), classified_by = ?
                        WHERE student_id = ?`

    try {
           const [exists] = await db.promise().query(sqlCheckExists, [studentId]);
           if (exists.length > 0){
            await db.promise().query(sqlUpdate, [yr1Creds, yr2Creds, yr3Creds, yr2Avg, yr3Avg, finalAvg, proposedClass, isEligible, 
                                                    eligibilityReason, user,studentId ])
           } else {
            await db.promise().query(sqlInsert, [studentId, yr1Creds, yr2Creds, yr3Creds, yr2Avg, yr3Avg, finalAvg, 
                                                    proposedClass, isEligible, eligibilityReason, user])
           }
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};

const getStudentClassification = async(studentId) => {
    const sql = `SELECT * FROM classifications
            WHERE student_id = ?`

        try {
           const [rows] = await db.promise().query(sql, [studentId]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};

const getStudentOverride = async (classificationId) => {
    const sql = `SELECT * FROM overrides
                 WHERE classification_id = ?
                 ORDER BY overriden_at DESC 
                 LIMIT 1`

        try {
           const [rows] = await db.promise().query(sql, [classificationId]);
           return rows;
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
}

const addOverride = async(classificationId, overrideClass, reason, user) => {
    const sqlCheckExists = `SELECT id FROM overrides WHERE classification_id = ?`

    const sqlInsert = `INSERT INTO overrides (classification_id, override_class, reason, overriden_by, overriden_at)
                 VALUES (?, ?, ?, ?, NOW())`

    const sqlUpdate = `UPDATE overrides
                       SET override_class = ?, reason = ?, overriden_by = ?, overriden_at = NOW()
                        WHERE classification_id = ?`

    try {
           const [exists] = await db.promise().query(sqlCheckExists, [classificationId]);
           if (exists.length > 0){
            await db.promise().query(sqlUpdate, [overrideClass, reason, user, classificationId ])
           } else {
            await db.promise().query(sqlInsert, [classificationId, overrideClass, reason, user])
           }
    } catch (error) {
        console.error("Model error:", error);
        throw error;
    }
};

export default { getOfficerProgrammes, getStudents, getOneStudent, updateStudent, addStudent, deleteStudent,
                   getModulesResults, getOneModuleResult, updateResult, getModuleInfo, addResult, deleteResult,
                   addClassification, getStudentClassification, getStudentOverride, addOverride
 };