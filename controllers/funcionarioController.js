var funcionarioModel = require("../models/funcionarioModel");

var sessoes = [];

function listarPorID(req, res){
    var idFunc = req.params.idFunc;

    funcionarioModel.listarPorParametro('idFuncionario',idFunc)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarPorEmpresa(req, res){
    var fkEmpresa = req.params.fkEmpresa;

    funcionarioModel.listarPorParametro('fkEmpresa',fkEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarPorID,
    listarPorEmpresa
}