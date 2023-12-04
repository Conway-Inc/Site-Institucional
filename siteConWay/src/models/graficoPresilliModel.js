var database = require("../database/config");

function exibirInfoTotens(fkEmpresaVar){
    var instrucao = `SELECT idTotem, T.nome FROM Totem T JOIN Empresa ON fkEmpresa = idEmpresa WHERE idEmpresa = ${fkEmpresaVar}`

    return database.executar(instrucao);
}

function infoProcessosTotem(idTotem){
    var instrucao = `SELECT nome, quantidadeProcesso, processoUsoCpu, processoUsoMemoria, dataHora FROM GrupoProcesso JOIN Totem ON fkTotem = idTotem WHERE idTotem = ${idTotem} ORDER BY idGrupoProcesso DESC LIMIT 1;
    `

    return database.executar(instrucao);
}

function exibirRegistros(idTotem){
    if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        var instrucao = `SELECT * FROM view_registrosTotem WHERE fkTotem = ${idTotem} ORDER BY dataHora DESC LIMIT 1`
    } else if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 1 * FROM view_registrosTotem WHERE fkTotem = ${idTotem} ORDER BY dataHora DESC`
    }

    return database.executar(instrucao);
}


module.exports = {
    exibirInfoTotens,
    infoProcessosTotem,
    exibirRegistros
};