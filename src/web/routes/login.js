import express from "express";
import db from "../config/db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/",  (req, res) => {
    if (req.session.user){
        if(req.session.user.role === "admin"){
            res.redirect("/admin");
        } else {
            res.redirect("/officer");
        }
    } else {
       res.render("login"); 
    }
  
});

router.post("/", async (req, res) => {
  try{
    const {userEmail, password} = req.body;

    const fullEmail = userEmail + "@hedclass.com";

    const userSQL = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.promise().query(userSQL, [fullEmail]);

    if (rows.length === 0){
        return res.redirect("/");
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    console.log("Password entered:", password);
    console.log("Hash from DB:", user.password_hash);
    console.log("Password match result:", passwordMatch);

    if (!passwordMatch){
        return res.redirect("/");
    }

    req.session.user = {
        id: user.id,
        email: user.email,
        role: user.role
    };

    if(user.role === "admin"){
        res.redirect("/admin");
    } else {
        res.redirect("/officer");
    }

} catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
}
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect("/");
}); 

export default router;