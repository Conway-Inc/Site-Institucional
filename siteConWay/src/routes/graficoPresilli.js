var express = require("express");
var router = express.Router();
    
var graficoPresilliController = require("../controllers/graficoPresilliController");

router.get("/exibirInfoTotens/:fkEmpresaVar", function(req, res){
    graficoPresilliController.exibirInfoTotens(req, res);
});

router.get("/exibirRegistros/:idTotem", function(req, res){
    graficoPresilliController.exibirRegistros(req,res)
})

router.get("/infoProcessosTotem/:idTotem", function(req, res){
    graficoPresilliController.infoProcessosTotem(req, res);
});


module.exports = router;