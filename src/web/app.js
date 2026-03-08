import express from "express";
import session from "express-session";

const app = express();
const PORT = 4000;
app.set("view engine", "ejs");

import db from "./config/db.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended : true}));
app.use(session({ 
  secret : "hedclass",
  resave : false,
  saveUninitialized : true,
  cookie : { maxAge : 600000 }
}));

// LOGIN // 
app.get("/",  (req, res) => {
  res.render("login");
});

app.post("/", async (req, res) => {
  const {userEmail, password} = req.body;

  const fullEmail = userEmail + "@test.com";

  const userSQL = "SELECT * FROM users WHERE email = ? AND passw = ?";
  const [rows] = await db.promise().query(userSQL, [fullEmail, password]);
  if(rows.length > 0) {
    req.session.userData = rows[0];

    if(rows[0].role === "admin"){
      res.redirect("/admin");
    } else {
      res.redirect("/officer");
    }
    //res.send(rows[0].role);
  }else{
    res.redirect("/");
  }
});

app.listen(PORT, (err) => {
  console.log(`listening on port http://localhost:${PORT}`);
});