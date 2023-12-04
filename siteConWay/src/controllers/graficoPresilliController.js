const { json } = require("express");
var graficoPresilliModel = require("../models/graficoPresilliModel")

function exibirInfoTotens(req, res) {
    var fkEmpresaVar = req.params.fkEmpresaVar;

    graficoPresilliModel.exibirInfoTotens(fkEmpresaVar)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os totens cadastrados: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function infoProcessosTotem(req, res) {
    var idTotem = req.params.idTotem;

    graficoPresilliModel.infoProcessosTotem(idTotem)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os processos do totem: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        })

}

function exibirRegistros(req, res){
    var idTotem = req.params.idTotem;

    graficoPresilliModel.exibirRegistros(idTotem)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os registros do totem: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}


function exibirCpuProcessos(req, res){
    var idTotem = req.params.idTotem;

    graficoPresilliModel.exibirCpuProcessos(idTotem)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os registros do totem: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}


module.exports = {
    exibirInfoTotens,
    infoProcessosTotem,
    exibirRegistros,
    exibirCpuProcessos
};

