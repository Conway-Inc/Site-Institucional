var express = require("express");
var router = express.Router();

var graficoAnaController = require("../controllers/graficoAnaController");

router.post("/getTempAeroporto", function (req, res) {
    graficoAnaController.getTempAeroporto(req, res);
});

module.exports = router