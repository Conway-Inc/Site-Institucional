 var express = require("express");
 var router = express.Router();

 router.get("/buscarTotens/:idEmpresa", function (req, res) {
    graficoJoaoController.buscarTotens(req, res);
});

module.exports = router;