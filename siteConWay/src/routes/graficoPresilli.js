var express = require("express");
var router = express.Router();
    
var graficoPresilliController = require("../controllers/graficoPresilliController");

router.get("/exibirInfoTotens/:fkEmpresaVar", function(req, res){
    graficoPresilliController.exibirInfoTotens(req, res);
});

router.get("/exibirProcessos/:idTotem", function(req, res){
    graficoPresilliController.exibirProcessos(req, res);
});


module.exports = router;