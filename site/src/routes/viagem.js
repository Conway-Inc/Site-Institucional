var express = require("express");
var router = express.Router();

var viagemController = require("../controllers/viagemController");

router.get("/fluxoViagens/:codLinha", function(req, res) {
    viagemController.fluxoViagens(req, res);
});

module.exports = router;