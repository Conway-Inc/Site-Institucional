var express = require("express");
var router = express.Router();

var graficoJoaoController = require("../controllers/graficoJoaoController");

router.get("/exibirRegistrosTotens", function (req, res) {
    graficoJoaoController.exibirRegistrosTotens(req, res);
});

module.exports = router;