var express = require("express");
var router = express.Router();

router.post("/cadastrarFuncionario", function(req,res){
    funcionarioController.cadastrarFuncionario(req,res)
});