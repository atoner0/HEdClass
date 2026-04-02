import express from "express";
import axios from "axios";
import session from "express-session";
import loginRoutes from "./routes/loginRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import officerRoutes from "./routes/officerRoutes.js"
import classificationAPIRoutes from "../api/routes/classificationAPIRoutes.js";

const app = express();
const PORT = 4000;
app.set("view engine", "ejs");

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use(session({ 
  secret : "hedclass",
  resave : false,
  saveUninitialized : true,
  cookie : { maxAge : 1000*1000*60 }
}));

// ROUTES // 
app.use("", loginRoutes);
app.use("/admin", adminRoutes);
app.use("/officer", officerRoutes);
app.use("/api", classificationAPIRoutes)


app.listen(PORT, (err) => {
  console.log(`Web app started on port http://localhost:${PORT}`);
});