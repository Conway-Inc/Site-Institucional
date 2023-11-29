var express = require("express");
var router = express.Router();

const graficoBiaController = require('../controllers/graficoBiaController');

router.get("/exibirTabelaTotensTemperaturaAlerta/:idEmpresa", function (req, res) {
    graficoBiaController.exibirTabelaTotensTemperaturaAlerta(req, res);
});

router.get("/exibirTabelaTotensTemperaturaCritico/:idEmpresa", function (req, res) {
    graficoBiaController.exibirTabelaTotensTemperaturaCritico(req, res);
});

router.post("/getValorTotalTotens", function (req, res) {
    graficoBiaController.getValorTotalTotens(req, res);
});

router.post("/getValorTotalTotensAlerta", function (req, res) {
    graficoBiaController.getValorTotalTotensAlerta(req, res);
});

router.post("/getValorTotalTotensCritico", function (req, res) {
    graficoBiaController.getValorTotalTotensCritico(req, res);
});


module.exports = router;