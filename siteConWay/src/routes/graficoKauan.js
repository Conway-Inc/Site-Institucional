 var express = require("express");
 var router = express.Router();

 var graficoKauanController = require("../controllers/graficoKauanController");

 router.get("/buscarTotens", function (req, res) {
    graficoKauanController.buscarTotens(req, res);
});

module.exports = router;