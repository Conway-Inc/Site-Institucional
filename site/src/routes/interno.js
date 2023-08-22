var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/internoController");

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.delete("/excluirFuncionario/:idFuncionario", function (req, res) {
    usuarioController.excluirUsuario(req, res);
});

router.post("/cadastrar", (req,res) => {
    usuarioController.cadastrarUsuario(req, res);
})


module.exports = router;