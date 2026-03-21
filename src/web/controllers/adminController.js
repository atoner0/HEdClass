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
    const userId = req.params.id;

    const officerData = await adminModel.getOneOfficer(userId);
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

export default {
    getAdminDash, getOfficers, updateOfficer: adminUpdateOfficer, postAdminUpdateOfficer,
    getAddOfficer, postAddOfficer
};