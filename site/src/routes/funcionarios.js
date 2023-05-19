var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

router.get("/listarPorID/:idFunc", function(req,res){
    funcionarioController.listarPorID(req, res);
});
router.get("/listarPorEmpresa/:fkEmpresa", function (req, res) {
    funcionarioController.listarPorEmpresa(req, res);
});

module.exports = router;