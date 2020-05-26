const express = require("express");
var router = express.Router();

router.get("/", function(req, res){
    res.send("admin")

})
router.get("/test", function(req, res){
    res.send("admin test")

})



module.exports = router