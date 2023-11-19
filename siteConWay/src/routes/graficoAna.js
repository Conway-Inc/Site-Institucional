var express = require("express");
var router = express.Router();

var graficoAnaController = require("../controllers/graficoAnaController");

router.post("/getTempAeroporto", function (req, res) {
    graficoAnaController.getTempAeroporto(req, res);
});

router.post("/exibirTotensDoAeroporto", function (req, res) {
    graficoAnaController.exibirTotensDoAeroporto(req, res);
});

router.post("/relatarCausaManutencao", function (req, res) {
    graficoAnaController.relatarCausaManutencao(req, res);
});

module.exports = router