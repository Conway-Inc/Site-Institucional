var express = require("express");
var router = express.Router();

var linhaController = require("../controllers/linhaController");

// router.get("/listar", function (req, res) {
//     linhaController.listar(req, res);
// });

//Recebendo os dados do html e direcionando para a função cadastrar de linhaController.js

// Criado para o cadastro da Rota - alterarRotas.html
router.post("/cadastrarLinha", function (req, res) {
    linhaController.cadastrarLinha(req, res);
})


module.exports = router;