var express = require("express");
var router = express.Router();

var graficoBrunoController = require("../controllers/graficoBrunoController");

router.get("/exibirTotensTodos", function (req, res) {
    graficoBrunoController.exibirTotensTodos(req, res);
});

router.get("/exibirTotensEstado/:estado", function (req, res) {
    graficoBrunoController.exibirTotensEstado(req, res);
});

router.get("/exibirTotensMunicipio/:municipio", function (req, res) {
    graficoBrunoController.exibirTotensMunicipio(req, res);
});

router.get("/exibirEstadosComTotens", function (req, res) {
    graficoBrunoController.exibirEstadosComTotens(req, res);
});

router.get("/exibirMunicipiosComTotens/:estado", function (req, res) {
    graficoBrunoController.exibirMunicipiosComTotens(req, res);
});

router.get("/exibirAeroportosComTotens/:municipio", function (req, res) {
    graficoBrunoController.exibirAeroportosComTotens(req, res);
});

router.get("/valorDisco/:idTotem", function (req, res) {
    graficoBrunoController.valorDisco(req, res);
});

router.get("/metricasGerais/:tipotexto", function (req, res) {
    graficoBrunoController.metricasGerais(req, res);
});

module.exports = router;