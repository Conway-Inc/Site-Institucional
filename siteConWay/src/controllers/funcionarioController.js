var funcionarioModel = require("../models/funcionarioModel");

function cadastrarFuncionario(req, res) {
    var nomeFuncVar = req.body.nomeFuncVarServer;
    var emailFuncVar = req.body.emailFuncVarServer;
    var senhaFuncVar = req.body.senhaFuncVarServer;
    var cpfFuncVar = req.body.cpfFuncVarServer;
    var telFuncVar = req.body.telFuncVarServer;
    var dataFuncVar = req.body.dataFuncVarServer;
    var cargoFuncVar = req.body.cargoFuncVarServer;    
    var idFuncionarioVar = req.body.idFuncionarioVarServer;
    var fkEmpresa = req.body.fkEmpresaServer;

    
    if (nomeFuncVar == undefined) {
        res.status(400).send("O nome está undefined")
    } else if (emailFuncVar == undefined) {
        res.status(400).send("O e-mail está undefined")
    } else if (senhaFuncVar == undefined) {
        res.status(400).send("A senha está undefined")
    } else if (cpfFuncVar == undefined) {
        res.status(400).send("O CPF está undefined")
    } else if (telFuncVar == undefined) {
        res.status(400).send("O telefone está undefined")
    } else if (dataFuncVar == undefined) {
        res.status(400).send("A data está undefined")
    } else if (cargoFuncVar == undefined){
        res.status(400).send("O cargo está undefined")
    } else if (idFuncionarioVar == undefined){
        res.status(400).send("O idFuncionário está undefined")
    }
    else {
        funcionarioModel.cadastrarFuncionario(nomeFuncVar, emailFuncVar, senhaFuncVar, cpfFuncVar, telFuncVar, dataFuncVar, cargoFuncVar, idFuncionarioVar, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro!Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).send(erro.sqlMessage);
                }
            )
    }
}

function atualizarFuncionario(req,res){
    var nomeFuncVar = req.body.nomeFuncVarServer;
    var emailFuncVar = req.body.emailFuncVarServer;
    var senhaFuncVar = req.body.senhaFuncVarServer;
    var cpfFuncVar = req.body.cpfFuncVarServer;
    var telFuncVar = req.body.telFuncVarServer;
    var dataFuncVar = req.body.dataFuncVarServer;
    var idFuncionarioVar = req.body.idFuncionarioServer;

    if (nomeFuncVar == undefined) {
        res.status(400).send("O nome está undefined")
    } else if (emailFuncVar == undefined) {
        res.status(400).send("O e-mail está undefined")
    } else if (senhaFuncVar == undefined) {
        res.status(400).send("A senha está undefined")
    } else if (cpfFuncVar == undefined) {
        res.status(400).send("O CPF está undefined")
    } else if (telFuncVar == undefined) {
        res.status(400).send("O telefone está undefined")
    } else if (dataFuncVar == undefined) {
        res.status(400).send("A data está undefined")
    } else if (idFuncionarioVar == undefined) {
        res.status(400).send("O id do funcionário está undefined")
    } else {
        funcionarioModel.atualizarFuncionario(nomeFuncVar, emailFuncVar, senhaFuncVar, cpfFuncVar, telFuncVar, dataFuncVar, idFuncionarioVar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao atualizar o cadastro!Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).send(erro.sqlMessage);
                }
            )
    }
}

module.exports = {
    cadastrarFuncionario,
    atualizarFuncionario
};
