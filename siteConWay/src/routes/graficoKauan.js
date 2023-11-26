 var express = require("express");
 var router = express.Router();

 var graficoKauanController = require("../controllers/graficoKauanController");

 router.get("/buscarTotens", function (req, res) {
    graficoKauanController.buscarTotens(req, res);
});
router.get("/buscarCompProblematico", function (req, res) {
    graficoKauanController.buscarCompProblematico(req, res);
});
router.get("/buscarMaiorRegistro", function (req, res) {
    graficoKauanController.buscarMaiorRegistro(req, res);
});
module.exports = router;