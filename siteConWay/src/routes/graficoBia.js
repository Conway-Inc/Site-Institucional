var express = require("express");
var router = express.Router();

router.get("/exibirTabelaTotensTemperaturaAlerta/:idEmpresa", function (req, res) {
    graficoBiaController.exibirTabelaTotensTemperaturaAlerta(req, res);
});

module.exports = router;