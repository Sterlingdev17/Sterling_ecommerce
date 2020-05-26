const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const config = require("./config/database");
const bodyParser = require("body-parser");
const session = require("express-session");
const expressValidator = require("express-validator");

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


// bodyparser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

  //express validators
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split(".")
        , root = namespace.shift()
        , formParam = root;

        while(namespace.lenght){
          formParam += " [" + namespace.shift() + "] " ;

        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }

}));

// express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

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
