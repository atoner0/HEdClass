import loginModel from "../models/loginModel.js";
import bcrypt from "bcrypt";

const getLogin = async (req, res) => {
    res.render ("login");
};

const checkLoginDetails = async (req,res) => {
  try{
    const {userEmail, password} = req.body;

    const fullEmail = userEmail + "@hedclass.com";

    const data = await loginModel.getUser(fullEmail);

    if (data.length === 0){
        return res.redirect("/");
    }

    const user = data[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    // console.log("Password entered:", password);
    // console.log("Hash from DB:", user.password_hash);
    // console.log("Password match result:", passwordMatch);

    if (!passwordMatch){
        return res.redirect("/");
    }

    req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    };

    if(user.role === "admin"){
        res.redirect("/admin");
    } else {
        res.redirect("/officer");
    }

} catch (err) {
  console.error("Controller error:", err);
  return res.status(500).send("Server error");
}};

const logout = async (req, res) => {
    req.session.destroy();
    res.redirect("/");
}; 

export default { getLogin, checkLoginDetails, logout };