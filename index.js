const express = require("express");
const path = require("path");

// init app
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");

// set up the public folder
app.use(express.static(path.join(__dirname, "public")));


// start server
app.get('/', function(req, res) {
    res.send("work");
});

const port = 3000;
app.listen(port, function(){
    console.log("server listening......" + port)
})
