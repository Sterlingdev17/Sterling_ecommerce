const express = require("express");
var router = express.Router();

router.get("/", function(req, res){
    res.send("admin")

})




module.exports = router