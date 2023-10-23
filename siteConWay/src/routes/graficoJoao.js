var express = require("express");
var router = express.Router();

var graficoJoaoController = require("../controllers/graficoJoaoController");

router.get("/exibirRegistrosTotens/:idEmpresa", function (req, res) {
    graficoJoaoController.exibirRegistrosTotens(req, res);
});

router.get("/exibirRegistrosTotemID/:idTotem", function (req, res) {
    graficoJoaoController.exibirRegistrosTotemID(req, res);
});

router.get("/exibirUltimosAlertas/:idEmpresa", function (req, res) {
    graficoJoaoController.exibirUltimosAlertas(req, res);
});

module.exports = router;