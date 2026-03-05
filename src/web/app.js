import express from "express";

const app = express();
const PORT = 4000;
app.set("view engine", "ejs");

import db from "./config/db.js";