var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarFuncionario", function (req, res) {
    usuarioController.cadastrarFuncionario(req, res);
})

router.post("/cadastrarRepresentante", function (req, res) {
    usuarioController.cadastrarRepresentante(req, res);
})
router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})
router.put("/alterarFuncionario/:idFuncionario", function (req, res) {
    usuarioController.alterarFuncionario(req, res);
})
router.get("/capturarIdEmpresa/:cnpj", function (req, res) {
    usuarioController.capturarIdEmpresa(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/cadastrarFuncionarioAirway", function (req, res) {
    usuarioController.cadastrarFuncionarioAirway(req, res);
});

router.post("/cadastrarTotem", function (req, res) {
    usuarioController.cadastrarTotem(req, res);
});

router.delete("/excluirFuncionario/:idFuncionario", function (req, res) {
    usuarioController.excluirFuncionario(req, res);
});


module.exports = router;