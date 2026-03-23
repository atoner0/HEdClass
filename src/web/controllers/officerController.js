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

    res.render("officerStudents", {user, students})
};

export default { getOfficerDash, getProgrammeStudents }