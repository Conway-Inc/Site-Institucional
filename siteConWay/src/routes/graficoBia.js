var express = require("express");
var router = express.Router();

const graficoBiaController = require('../controllers/graficoBiaController');

router.get("/exibirTabelaTotensTemperaturaAlerta/:idEmpresa", function (req, res) {
    graficoBiaController.exibirTabelaTotensTemperaturaAlerta(req, res);
});

router.get("/exibirTabelaTotensTemperaturaCritico/:idEmpresa", function (req, res) {
    graficoBiaController.exibirTabelaTotensTemperaturaCritico(req, res);
});

module.exports = router;