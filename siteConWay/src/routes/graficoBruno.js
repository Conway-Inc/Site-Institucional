var express = require("express");
var router = express.Router();

var graficoBrunoController = require("../controllers/graficoBrunoController");

router.get("/exibirTotensEstado/:estado", function (req, res) {
    graficoBrunoController.exibirTotensEstado(req, res);
});

module.exports = router;