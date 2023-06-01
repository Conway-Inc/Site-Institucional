var express = require("express");
var router = express.Router();

var viagemController = require("../controllers/viagemController");

router.get("/horariosPorRota/:codLinha", function(req, res) {
    viagemController.horariosPorRota(req, res);
});

router.get("/mediaPassageirosPorHorario/:codLinha", function(req, res) {
    viagemController.mediaPassageirosPorHorario(req, res);
});

router.get("/fluxoViagens/:codLinha", function(req, res) {
    viagemController.fluxoViagens(req, res);
});

module.exports = router;