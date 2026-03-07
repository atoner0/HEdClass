import express from "express";

const app = express();
const PORT = 4000;
app.set("view engine", "ejs");

import db from "./config/db.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.get("/login",  (req, res) => {
  res.render("enter");
});

app.post("/login", async (req, res) => {
  const {userField} = req.body;
  const userSQL = "SELECT * FROM users WHERE email = ?";
  const [rows] = await db.promise().query(userSQL, [userField]);
  if(rows.length > 0) {
    req.session.userData = rows[0];

    if(rows[0].role === "admin"){
      res.redirect("/admin");
    } else {
      res.redirect("/officer");
    }
    //res.send(rows[0].role);
  }else{
    res.redirect("/login");
  }
});