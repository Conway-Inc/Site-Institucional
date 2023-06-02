var express = require("express");
var router = express.Router();

var linhaPontoController = require("../controllers/linhaPontoController");

// router.get("/listar", function (req, res) {
//     linhaController.listar(req, res);
// });

//Recebendo os dados do html e direcionando para a função cadastrar de linhaController.js

// Criado para o cadastro da Rota - alterarRotas.html
router.post("/cadastrarPontoLinha", function (req, res) {
    linhaPontoController.cadastrarPontoLinha(req, res);
})

router.get("/listarLinhaPonto", function (req, res){
    linhaPontoController.listarLinhaPonto(req, res);
});

router.post("/autenticar", function (req, res){
    linhaPontoController.selectLinha(req, res);
})


module.exports = router;