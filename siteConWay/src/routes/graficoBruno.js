var express = require("express");
var router = express.Router();

var graficoBrunoController = require("../controllers/graficoBrunoController");

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

router.get("/valorTotem/:idTotem", function (req, res) {
    graficoBrunoController.valorTotem(req, res);
});

router.post("/exibirOptionsMesAno", function (req, res) {
    graficoBrunoController.exibirOptionsMesAno(req, res);
});

router.post("/metricasGerais", function (req, res) {
    graficoBrunoController.metricasGerais(req, res);
});

router.post("/dadosRelatorio", function (req, res) {
    graficoBrunoController.dadosRelatorio(req, res);
});


module.exports = router;