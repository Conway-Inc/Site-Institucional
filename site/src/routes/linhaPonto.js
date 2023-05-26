var express = require("express");
var router = express.Router();

var linhaPontoController = require("../controllers/linhaPontoController");

// router.get("/listar", function (req, res) {
//     linhaController.listar(req, res);
// });

//Recebendo os dados do html e direcionando para a função cadastrar de linhaController.js

// Criado para o cadastro da Rota - alterarRotas.html
router.post("/cadastrarLinhaPonto", function (req, res) {
    linhaPontoController.cadastrarLinhaPonto(req, res);
})

router.post("/autenticar", function (req, res){
    linhaPontoController.selectLinha(req, res);
})


module.exports = router;