var express = require("express");
var router = express.Router();

var graficoAnaController = require("../controllers/graficoAnaController");

router.post("/exibirTotensDoAeroporto", function (req, res) {
    graficoAnaController.exibirTotensDoAeroporto(req, res);
});

router.post("/relatarCausaManutencao", function (req, res) {
    graficoAnaController.relatarCausaManutencao(req, res);
});

router.get("/exibirListaTotensManutencao/:idEmpresa", function (req, res) {
    graficoAnaController.exibirListaTotensManutencao(req, res);
});

router.post("/buscarInformacoes", function (req, res) {
    graficoAnaController.buscarInformacoes(req, res);
});

router.post("/exibirTotensPendentes", function (req, res) {
    graficoAnaController.exibirTotensPendentes(req, res);
});

router.post("/aprovarManutencao", function (req, res) {
    graficoAnaController.aprovarManutencao(req, res);
});

router.post("/reprovarManutencao", function (req, res) {
    graficoAnaController.reprovarManutencao(req, res);
});

router.get("/listarAprovacoesEReprovacoes/:idEmpresa", function (req, res) {
    graficoAnaController.listarAprovacoesEReprovacoes(req, res);
});

module.exports = router