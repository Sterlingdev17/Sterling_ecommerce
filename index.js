const express = require("express");
const path = require("path");

// init app

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");

// set up the public folder

app.use(express.static(path.join(__dirname, "public")));
