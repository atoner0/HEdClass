import adminModel from "../models/adminModel.js";

const getAdminDash = async (req, res) => {

    const user = req.session.user;

    if(!user){
        return res.redirect("/");
    }
    
    const officers = await adminModel.getOfficers();
    const programmes = await adminModel.getProgrammes();

    res.render ("adminDash", {user, officers, programmes});
};

const getOfficers = async (req, res) => {

    const user = req.session.user;

    if(!user){
        return res.redirect("/");
    }

    const officers = await adminModel.getOfficers();

    res.render ("adminOfficers", {user, officers});
};

export default { getAdminDash, getOfficers };