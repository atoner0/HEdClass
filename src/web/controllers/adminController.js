import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";

const getAdminDash = async (req, res) => {

    const user = req.session.user;

    if (!user) {
        return res.redirect("/");
    }

    const officers = await adminModel.getOfficers();
    const programmes = await adminModel.getProgrammes();

    res.render("adminDash", { user, officers, programmes });
};

const getOfficers = async (req, res) => {

    const user = req.session.user;

    if (!user) {
        return res.redirect("/");
    }

    const officers = await adminModel.getOfficers();


    res.render("adminOfficers", { user, officers });
};

const adminUpdateOfficer = async (req, res) => {
    const user = req.session.user;
    const officerId = req.params.id;

    const officerData = await adminModel.getOneOfficer(officerId);
    const officer = officerData[0];

    const programmes = await adminModel.getProgrammes();

    res.render("editOfficer", { user, officer, programmes });
};

const postAdminUpdateOfficer = async (req, res) => {
    const fData = { ...req.body };

    const officerId = Number(fData.id_field);

    await adminModel.updateOfficer(fData.username_field, fData.email_field, officerId);
    await adminModel.resetProgrammes(officerId);

    const programmeIds = Array.isArray(fData.programme_field) ? fData.programme_field : [fData.programme_field];

    for (let programmeId of programmeIds) {
        await adminModel.updateOfficerProgrammes(officerId, Number(programmeId));
    };

    res.redirect("/admin/officers");
};

const getAddOfficer = async (req, res) => {
    const user = req.session.user;
    const programmes = await adminModel.getProgrammes();

    res.render("addOfficer", { user, programmes });
};

const postAddOfficer = async (req, res) => {
    const fData = { ...req.body };

    const username = fData.username_field;
    const fullEmail = fData.email_field + "@hedclass.com";
    const password = fData.password_field;

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await adminModel.addOfficer(username, fullEmail, passwordHash, "officer");

    const userId = result.insertId;

    const programmeIds = Array.isArray(fData.programme_field) ? fData.programme_field : [fData.programme_field];

    for (let programmeId of programmeIds) {
        await adminModel.updateOfficerProgrammes(userId, Number(programmeId));
    };


    res.redirect("/admin/officers");
};

const adminDeleteOfficer = async (req, res) => {

    try {
     const officerId = req.params.id;

    await adminModel.resetProgrammes(officerId);
    await adminModel.deleteOfficerUser(officerId);

    res.redirect("/admin/officers");       
    } catch (error) {
        console.error("Controller error:", error);
        res.status(500).send("Error deleting officer");
    }

};

const getProgrammes = async (req, res) => {

    const user = req.session.user;

    if (!user) {
        return res.redirect("/");
    }

    const programmes = await adminModel.getProgrammes();

    res.render("adminProgrammes", { user, programmes });
};

const updateProgramme = async (req, res) => {
    const user = req.session.user;
    const programmeId = req.params.id;
    const awards = ["BA", "BSc", "Bed", "BEng", "LLB", "MB ChB"];

    const programmeData = await adminModel.getOneProgramme(programmeId);
    const programme = programmeData[0];

    res.render("editProgramme", { user, programme, awards });
};

const postUpdateProgramme = async (req, res) => {
    const fData = {...req.body};

    const programmeId = Number(fData.id_field);

    await adminModel.updateProgramme(fData.title_field, fData.code_field, fData.award_field, fData.year_field, programmeId);

    res.redirect("/admin/programmes");
}

const getAddProgramme = async (req, res) => {
    const user = req.session.user;
    const programmes = await adminModel.getProgrammes();
    const awards = ["BA", "BSc", "Bed", "BEng", "LLB", "MB ChB"];

    res.render("addProgramme", { user, programmes, awards });
};

const postAddProgramme = async (req, res) => {
    const fData = { ...req.body };

    await adminModel.addProgramme(fData.title_field, fData.code_field, fData.award_field, fData.year_field)

    res.redirect("/admin/programmes");
};

const adminDeleteProgramme = async (req, res) => {

    try {
     const programmeId = req.params.id;

    await adminModel.deleteProgramme(programmeId);

    res.redirect("/admin/programmes");       
    } catch (error) {
        console.error("Controller error:", error);
        res.status(500).send("Error deleting programme");
    }

};

export default {
    getAdminDash, getOfficers, adminUpdateOfficer, postAdminUpdateOfficer,
    getAddOfficer, postAddOfficer, adminDeleteOfficer, getProgrammes, getUpdateProgramme: updateProgramme,
    postUpdateProgramme, getAddProgramme, postAddProgramme, adminDeleteProgramme
};