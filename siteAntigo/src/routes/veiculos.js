var express = require("express");
var router = express.Router();

var veiculoController = require("../controllers/veiculoController");

router.get("/", function (req, res) {
    veiculoController.testar(req, res);
});

router.get("/listar/:fkEmpresa", function (req, res) {
    veiculoController.listar(req, res);
});

router.post("/cadastrarVeiculo", function (req, res) {
    veiculoController.cadastrarVeiculo(req, res);
})

router.put("/alterarVeiculo/:idVeiculo", function (req, res) {
    veiculoController.alterarVeiculo(req, res);
})

router.delete("/excluirVeiculo/:idVeiculo", function (req, res) {
    veiculoController.excluirVeiculo(req, res);
});

router.get("/graficoModelo/:codLinha/:horario", function(req, res) {
    veiculoController.graficoModelo(req, res);
});

module.exports = router;