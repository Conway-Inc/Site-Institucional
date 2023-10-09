var empresaModel = require("../models/empresaModel");

function exibirFuncionarios(req, res) {
    var fkEmpresa = req.params.fkEmpresaVar

    console.log("sua FK" + fkEmpresa)

    if (fkEmpresa == undefined) {
        res.status(400).send("Não foi possível encontrar a Foreign Key desta empresa")
    } else {
        empresaModel.exibirFuncionarios(fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao localizar esta empresa!Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).send(erro.sqlMessage);
                }
            )
    }
}


function exibirInfosEmpresa(req, res) {
    var fkEmpresa = req.params.fkEmpresaVar
    console.log("sua FK" + fkEmpresa)
    if (fkEmpresa == undefined) {
        res.status(400).send("Não foi possível encontrar a Foreign Key desta empresa")
    } else {
        empresaModel.exibirInfosEmpresa(fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao localizar esta empresa!Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).send(erro.sqlMessage);
                }
            )
    }

}

module.exports = {
    exibirInfosEmpresa,
    exibirFuncionarios
};