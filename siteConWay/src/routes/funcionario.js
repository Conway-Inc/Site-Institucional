var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");


router.post("/cadastrarFuncionario", function(req,res){
    funcionarioController.cadastrarFuncionario(req,res)
});

module.exports = router;