var express = require("express");
var router = express.Router();
    
var graficoPresilliController = require("../controllers/graficoPresilliController");

router.get("/exibirTotensProcesso/:fkEmpresaVar", function(req, res){
    graficoPresilliController.exibirTotensProcesso(req, res);
});

module.exports = router;