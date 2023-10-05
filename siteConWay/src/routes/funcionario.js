var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");


router.post("/cadastrarFuncionario", function(req,res){
    funcionarioController.cadastrarFuncionario(req,res)
});
router.post("/atualizarFuncionario", function(req,res){
    funcionarioController.atualizarFuncionario(req,res)
});

module.exports = router;