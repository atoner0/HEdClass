import officerModel from "../models/officerModel.js";


const getOfficerDash = async (req, res) => {

    const user = req.session.user;
    const officerId = req.session.user.id;

    if (!user) {
        return res.redirect("/");
    }

    const programmes = await officerModel.getOfficerProgrammes(officerId);

    res.render("officerDash", { user, programmes, });
};

const getProgrammeStudents = async (req,res) => {
    const user = req.session.user;

    if (!user) {
        return res.redirect("/");
    }

    const programmeId = req.params.id;

    const students = await officerModel.getStudents(programmeId)

    res.render("officerStudents", {user, students, programmeId})
};

const getUpdateStudent = async (req, res) => {
    const user = req.session.user;
    const {programmeId, studentId} = req.params;

    const studentData = await officerModel.getOneStudent(studentId);
    const student = studentData[0];

    res.render("officerEditStudent", { user, student, programmeId });
};

const postUpdateStudent = async (req, res) => {
    const fData = {...req.body};

    const studentId = Number(fData.id_field);
    const programmeId = Number(req.params.programmeId);
    const fullEmail = fData.email_field + "@uni.ac.uk"

    await officerModel.updateStudent(fData.studentNo_field, fData.firstName_field, fData.surname_field, fullEmail,
                                        fData.studyYear_field, fData.gradYear_field, studentId);

    res.redirect(`/officer/programme/${programmeId}/students`);
}

const getAddStudent = async (req, res) => {
    const user = req.session.user;
    const students = await officerModel.getStudents();
    const programmeId = Number(req.params.id);

    res.render("officerAddStudent", { user, students, programmeId });
};

const postAddStudent = async (req, res) => {
    const fData = { ...req.body };
    const programmeId = Number(req.params.id);

    await officerModel.addStudent(fData.studentNo_field, fData.firstName_field, fData.surname_field, fData.email_field,
                                        programmeId, fData.studyYear_field, fData.gradYear_field);

    res.redirect(`/officer/programme/${programmeId}/students`);
};

const officerDeleteStudent = async (req, res) => {

    try {
     const {programmeId, studentId} = req.params;

    await officerModel.deleteStudent(studentId)

    res.redirect(`/officer/programme/${programmeId}/students`);       
    } catch (error) {
        console.error("Controller error:", error);
        res.status(500).send("Error deleting student");
    }

};

export default { getOfficerDash, getProgrammeStudents, getUpdateStudent, postUpdateStudent, getAddStudent, postAddStudent,      
                    officerDeleteStudent }