const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const config = require("./config/database");

//connect to db
mongoose.connect(config.database, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongo database")
});

// init app
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up the public folder
app.use(express.static(path.join(__dirname, "public")));


// start server

//set route
const pages = require("./routes/pages");
const adminPages = require("./routes/adminPages");

app.use("/admin/pages", adminPages);
app.use("/", pages);

const port = 3000;
app.listen(port, function(){
    console.log("server listening......" + port)
})
