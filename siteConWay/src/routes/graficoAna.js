var express = require("express");
var router = express.Router();

var graficoAnaController = require("../controllers/graficoAnaController");

router.post("/exibirTotensDoAeroporto", function (req, res) {
    graficoAnaController.exibirTotensDoAeroporto(req, res);
});

module.exports = router