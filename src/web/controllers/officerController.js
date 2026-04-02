import officerModel from "../models/officerModel.js";
import adminModel from "../models/adminModel.js"
import classificationCalc from "../utils/classification.js"


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

    const programmeId = req.params.programmeId;

    const students = await officerModel.getStudents(programmeId)

    res.render("officerStudents", {user, students, programmeId})
};

const getUpdateStudent = async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect("/");
    }

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
    if (!user) {
        return res.redirect("/");
    }
    const programmeId = Number(req.params.programmeId);

    const students = await officerModel.getStudents(programmeId);
    
    res.render("officerAddStudent", { user, students, programmeId });
};

const postAddStudent = async (req, res) => {
    const fData = { ...req.body };
    const programmeId = Number(req.params.programmeId);

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

const getStudentResults = async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect("/");
    }

    const {programmeId, studentId} = req.params;

    const studentData = await officerModel.getOneStudent(studentId);
    const student = studentData[0];

    const modules = await officerModel.getModulesResults(studentId);
    const latestModules = classificationCalc.getLatestModuleResults(modules);

    const programmeData = await adminModel.getOneProgramme(programmeId);
    const programme = programmeData[0];

    //for EJS display
    const groupedModules = classificationCalc.groupByYear(modules);

    //for using in calculations
    const groupedLatestModules = classificationCalc.groupByYear(latestModules);

    const avgByYear = {};
    Object.keys(groupedLatestModules).forEach(year => {
        avgByYear[year] = classificationCalc.calculateYearAvg(groupedLatestModules[year])
    });

    const classificationData = classificationCalc.calculateClassificationResults(modules);

    const creditsByYear = classificationData.creditsByYear;
    const finalAvg = classificationData.finalAvg;
    const proposedClass = classificationData.proposedClass;
    const reason = classificationData.eligibilityReason;
    const rationale = classificationData.rationale;
    const needsReview = classificationData.needsReview;
    const reviewReason = classificationData.reviewReason;
  
    const classificationRows = await officerModel.getStudentClassification(studentId);
    const classification = classificationRows[0];

    let override = null;
    let finalClass = proposedClass;
    let finalReason = reason;
    let approved = classification ? classification.is_approved : 0;

    if (classification) {
        const overrideData = await officerModel.getStudentOverride(classification.id);
        override = overrideData[0] || null;

        if (override){
            finalClass = override.override_class;
            finalReason = override.reason
        } 
    }

    res.render("officerStudentResults", { user, student, programme, groupedModules, creditsByYear, avgByYear, finalAvg, proposedClass, reason,
                                           rationale, needsReview, reviewReason, override, approved, finalClass, finalReason
     });
};

const getUpdateResult = async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect("/");
    }

    const {programmeId, studentId, resultId} = req.params;

    const moduleData = await officerModel.getOneModuleResult(resultId);
    const result = moduleData[0];

    res.render("officerEditStudentResult", { user, result, programmeId, studentId });
};

const postUpdateResult = async (req, res) => {
    const fData = {...req.body};

    const {programmeId, studentId, resultId} = req.params;

    const mark = Number(fData.mark_field);
    const attemptNo = Number(fData.attempt_field);
    const isResit = Number(fData.resit_field)

    const passed = mark >= 40 ? 1 : 0;

    let cappedMark;
    if (isResit == 1 && mark > 40) {
        cappedMark = 40;
    } else {
        cappedMark = mark;
    }

    await officerModel.updateResult(attemptNo, mark, isResit, cappedMark, passed, resultId)

    res.redirect(`/officer/programme/${programmeId}/student/${studentId}/results`);
};

const getAddResult = async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect("/");
    }

    const {programmeId, studentId} = req.params;

    const result = await officerModel.getModulesResults(studentId);
    const modules = await officerModel.getModuleInfo(programmeId);

    res.render("officerAddStudentResult", { user, programmeId, studentId, result, modules });
};

const postAddResult = async (req, res) => {
    const fData = {...req.body};

    const {programmeId, studentId} = req.params;

    const moduleId = fData.module_field;

    const mark = Number(fData.mark_field);
    const attemptNo = Number(fData.attempt_field);
    const isResit = Number(fData.resit_field)

    const passed = mark >= 40 ? 1 : 0;

    let cappedMark;
    if (isResit == 1 && mark > 40) {
        cappedMark = 40;
    } else {
        cappedMark = mark;
    }

    await officerModel.addResult(studentId, moduleId, attemptNo, mark, isResit, cappedMark, passed)

    res.redirect(`/officer/programme/${programmeId}/student/${studentId}/results`);
};

const officerDeleteStudentResult = async (req, res) => {

    try {
     const {programmeId, studentId, resultId} = req.params;

    await officerModel.deleteResult(resultId)

    res.redirect(`/officer/programme/${programmeId}/student/${studentId}/results`);       
    } catch (error) {
        console.error("Controller error:", error);
        res.status(500).send("Error deleting result");
    }

};

const getOverrideClass = async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect("/");
    }

    const {programmeId, studentId} = req.params;

    const proposedClassData =  await officerModel.getStudentClassification(studentId);
    const proposedClass = proposedClassData[0];

    const classifications = ["First", "2:1", "2:2", "3rd", "Fail"];

    res.render("officerStudentOverride", { user, programmeId, studentId, proposedClass, classifications });
};

const postOverrideClass = async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect("/");
    }

    const {programmeId, studentId} = req.params;

    const fData = {...req.body};

    await officerModel.addOverride(fData.id_field, fData.classification_field, fData.reason_field, user.id)

    res.redirect(`/officer/programme/${programmeId}/student/${studentId}/results`);
};

const postApproveClass = async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect("/");
    }

    const {programmeId, studentId} = req.params;

    await officerModel.approveClass(user.id, studentId);

    res.redirect(`/officer/programme/${programmeId}/student/${studentId}/results`);
};

const getStatistics = async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect("/");
    }

    const programmeId = req.params.programmeId;
    const programmeData = await adminModel.getOneProgramme(programmeId)
    const programme = programmeData[0];

    const studentCount = await officerModel.getStudentCount(programmeId);

    const classifications =  await officerModel.getProgrammeClassifications(programmeId);


    const countData = classificationCalc.calculateStatusCounts(classifications);
    const classifiedCount = countData.classifiedCount;
    const reviewCount = countData.reviewCount;
    const approvedCount = countData.approvedCount;

    const classificationBreakdown = countData.classificationBreakdown;

    res.render("officerStatistics", {user, programmeId, programme, studentCount, countData, classifiedCount, reviewCount, approvedCount, classificationBreakdown})
};

export default { getOfficerDash, getProgrammeStudents, getUpdateStudent, postUpdateStudent, getAddStudent, postAddStudent,      
                    officerDeleteStudent, getStudentResults, getUpdateResult, postUpdateResult, getAddResult, postAddResult,
                    officerDeleteStudentResult, getOverrideClass, postOverrideClass, postApproveClass,
                    getStatistics }