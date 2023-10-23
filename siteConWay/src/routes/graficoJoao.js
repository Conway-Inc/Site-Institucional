var express = require("express");
var router = express.Router();

var graficoJoaoController = require("../controllers/graficoJoaoController");

router.get("/exibirRegistrosTotens/:idEmpresa", function (req, res) {
    graficoJoaoController.exibirRegistrosTotens(req, res);
});

router.get("/exibirRegistrosTotemID/:idTotem", function (req, res) {
    graficoJoaoController.exibirRegistrosTotemID(req, res);
});

router.get("/buscarUltimosAlertasComponentes/:idEmpresa", function (req, res) {
    graficoJoaoController.buscarUltimosAlertasComponentes(req, res);
});

router.get("/buscarTotalTotensEmpresa/:idEmpresa", function (req, res) {
    graficoJoaoController.buscarTotalTotensEmpresa(req, res);
});

router.get("/buscarTotensEmAlerta/:idEmpresa", function (req, res) {
    graficoJoaoController.buscarTotensEmAlerta(req, res);
});

router.get("/buscarTotemMaisProblematico/:idEmpresa", function (req, res) {
    graficoJoaoController.buscarTotemMaisProblematico(req, res);
});
module.exports = router;