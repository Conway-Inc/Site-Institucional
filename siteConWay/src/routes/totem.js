var express = require("express");
var router = express.Router();

var totemController = require("../controllers/totemController");

router.get("/exibirTabelaTotem/:idEmpresa", function (req, res) {
    totemController.exibirTabelaTotem(req, res);
});
router.get("/exibirMunicipios/:estado", function (req, res) {
    totemController.exibirMunicipios(req, res);
});
router.get("/exibirAeroportos/:municipio", function (req, res) {
    totemController.exibirAeroportos(req, res);
});
router.post("/cadastrarTotem", function(req,res){
    totemController.cadastrarTotem(req,res)
});

router.post("/cadastrarMetricas", function(req,res){
    totemController.cadastrarMetrica(req,res)
});

router.post("/cadastrarComponente", function(req,res){
    totemController.cadastrarComponente(req,res)
});

router.post("/criarViewTotem", function(req,res){
    totemController.criarViewTotem(req,res)
});

module.exports = router;