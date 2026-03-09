import express from "express";
import session from "express-session";
import login from "./routes/login.js"

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
  cookie : { maxAge : 1000*60*60*1 }
}));

// LOGIN // 
app.use("", login);


app.listen(PORT, (err) => {
  console.log(`listening on port http://localhost:${PORT}`);
});