var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.get("/exibirFuncionarios/:fkEmpresaVar", function(req,res){
    empresaController.exibirFuncionarios(req,res)
});

router.get("/exibirInfosEmpresa/:fkEmpresaVar", function(req,res){
    empresaController.exibirInfosEmpresa(req,res)
});

module.exports = router;