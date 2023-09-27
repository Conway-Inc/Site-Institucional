var express = require("express");
var router = express.Router();

var graficoBrunoController = require("../controllers/graficoBrunoController");

router.post("/exibirMunicipios/:estado", function (req, res) {
    graficoBrunoController.exibirMunicipios(req, res);
});

module.exports = router;