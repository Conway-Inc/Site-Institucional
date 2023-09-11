var express = require("express");
var router = express.Router();

var internoController = require("../controllers/internoController");

router.post("/autenticar", function (req, res) {
    internoController.entrar(req, res);
});

router.delete("/excluirFuncionario/:idFuncionario", function (req, res) {
    internoController.excluirUsuario(req, res);
});

router.post("/cadastrar", (req,res) => {
    internoController.cadastrarEmpresa(req, res);
})


module.exports = router;