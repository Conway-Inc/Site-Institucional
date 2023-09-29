var express = require("express");
var router = express.Router();

var totemController = require("../controllers/totemController");

router.get("/exibirMunicipios/:estado", function (req, res) {
    totemController.exibirMunicipios(req, res);
});
router.get("/exibirAeroportos/:municipio", function (req, res) {
    totemController.exibirAeroportos(req, res);
});
module.exports = router;