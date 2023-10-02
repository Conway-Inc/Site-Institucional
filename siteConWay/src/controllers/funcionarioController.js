var funcionarioModel = require("../models/funcionarioModel");

function cadastrarTotem(req, res){
    var nomeFuncVar = req.body.nomeFuncServer;
    var emailFuncVar = req.body.emailServer;
    var senhaFuncVar = req.body.senhaServer;
    var cpfFuncVar = req.body.cpfServer;
    var telFuncVar = req.body.telServer;
    var dataFuncVar = req.body.dataServer;
    
    var fkEmpresa = req.body.fkEmpresaServer;


    if (nomeFuncVar == undefined) {
        res.status(400).send("O nome está undefined")
    } else if(emailFuncVar == undefined){
        res.status(400).send("O e-mail está undefined")
    } else if (senhaFuncVar == undefined){
      res.status(400).send("A senha está undefined")
    } else if (cpfFuncVar == undefined){
        res.status(400).send("O CPF está undefined")
    } else if (telFuncVar == undefined){
        res.status(400).send("O telefone está undefined")
    } else if (dataFuncVar == undefined){
        res.status(400).send("A data está undefined")
    } else {
        funcionarioModel.cadastrarFuncionario(nomeFuncVar, emailFuncVar, senhaFuncVar, cpfFuncVar, telFuncVar, dataFuncVar, fkEmpresa)
            .then(
                function(resultado){
                    res.json(resultado);
                }
            ).catch(
                function(erro){
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro!Erro: ",
                    erro.sqlMessage
                    );
                    res.status(500).send(erro.sqlMessage);
                }
            )
    }
  }

module.exports = {
    cadastrarFuncionario,
};
  