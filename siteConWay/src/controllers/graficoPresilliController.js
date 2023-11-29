var graficoPresilliModel = require("../models/graficoPresilliModel")

function exibirTotensProcesso(req, res) {
    var fkEmpresaVar = req.params.fkEmpresaVar;
    
    graficoPresilliModel.exibirTotensProcesso(fkEmpresaVar)
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

module.exports = {
    exibirTotensProcesso
};

