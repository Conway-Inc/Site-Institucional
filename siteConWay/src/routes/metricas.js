var express = require("express");
var router = express.Router();

router.post("/cadastrarMetricas", function(req,res){
    metricasController.cadastrarMetrica(req,res)
});

module.exports = router;