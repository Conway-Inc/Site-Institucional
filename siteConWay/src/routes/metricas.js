var express = require("express");
var router = express.Router();

var metricasController = require("../controllers/metricasController");

router.post("/cadastrarMetricasCpu", function(req,res){
    metricasController.cadastrarMetricasCpu(req,res)
});

router.post("/cadastrarMetricasMemo", function(req,res){
    metricasController.cadastrarMetricasMemo(req,res)
});

router.post("/cadastrarMetricasDisco", function(req,res){
    metricasController.cadastrarMetricasDisco(req,res)
});

module.exports = router;