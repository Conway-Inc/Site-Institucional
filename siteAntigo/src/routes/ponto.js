var express = require("express");
var router = express.Router();

var pontoController = require("../controllers/pontoController");

// router.get("/listar", function (req, res) {
//     linhaController.listar(req, res);
// });

//Recebendo os dados do html e direcionando para a função cadastrar de pontoController.js

// Criado para o cadastro da Rota - alterarRotas.html
router.post("/cadastrarPonto", function (req, res) {
    pontoController.cadastrarPonto(req, res);
});

router.get("/listar", function (req, res){
    pontoController.listar(req, res);
});

router.get("/listarPorNome/:nomePontoVetor", function(req, res) {
    pontoController.selectPontosVetor(req, res);
});

router.get("/listarPorCodLinha/:codLinha", function (req, res){
    pontoController.listarPorCodLinha(req, res);
});

router.post("/listarId", function (req, res){
    pontoController.listarId(req, res);
});


module.exports = router;