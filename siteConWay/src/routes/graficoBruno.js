var express = require("express");
var router = express.Router();

var graficoBrunoController = require("../controllers/graficoBrunoController");

router.get("/exibirMunicipios/:estado", function (req, res) {
    graficoBrunoController.exibirMunicipios(req, res);
});
router.get("/exibirAeroportos/:municipio", function (req, res) {
    graficoBrunoController.exibirAeroportos(req, res);
});
module.exports = router;