import express from "express";
import session from "express-session";
import loginRoutes from "./routes/loginRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import officerRoutes from "./routes/officerRoutes.js"

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
app.use(session({ 
  secret : "hedclass",
  resave : false,
  saveUninitialized : true,
  cookie : { maxAge : 1000*1000*60*60 }
}));

// ROUTES // 
app.use("", loginRoutes);
app.use("/admin", adminRoutes);
app.use("/officer", officerRoutes);


app.listen(PORT, (err) => {
  console.log(`listening on port http://localhost:${PORT}`);
});