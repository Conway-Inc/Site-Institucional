var express = require("express");
var router = express.Router();
    
var graficoPresilliController = require("../controllers/graficoPresilliController");

router.get("/exibirTotensProcesso/:fkEmpresaVar", function(req, res){
    graficoPresilliController.exibirTotensProcesso(req, res);
});

router.get("/exibirProcessos/:idTotem", function(req, res){
    graficoPresilliController.exibirProcessos(req, res);
});

router.get("/exibirRegistrosCpu/:idTotem", function(req,res){
    graficoPresilliController.exibirRegistrosCpu(req, res);
})

router.get("/exibirRegistrosDisco/:idTotem", function(req,res){
    graficoPresilliController.exibirRegistrosDisco(req, res);
})

router.get("/exibirRegistrosMemoria/:idTotem", function(req,res){
    graficoPresilliController.exibirRegistrosMemoria(req, res);
})

module.exports = router;