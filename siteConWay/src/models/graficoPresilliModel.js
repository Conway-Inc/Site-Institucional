var database = require("../database/config");

function exibirTotensProcesso(fkEmpresaVar){
    var instrucao = `SELECT t.idTotem, t.nome, COUNT(p.idProcesso)'Quantidade' 
    FROM Processo AS p JOIN Registro AS r ON p.fkRegistro = r.idRegistro JOIN Totem AS t ON r.fkTotem = t.idTotem JOIN Empresa AS e ON t.fkEmpresa = e.idEmpresa
    WHERE e.idEmpresa = ${fkEmpresaVar} GROUP BY idTotem`

    return database.executar(instrucao);
}

function exibirProcessos(idTotem){
    console.log("ACESSI O MODEL AQUI NO PRESILLI")

    var instrucao = `SELECT t.idTotem, e.nome, t.nome, COUNT(p.idProcesso)'Quantidade' 
    FROM Processo AS p JOIN Registro AS r ON p.fkRegistro = r.idRegistro JOIN Totem AS t ON r.fkTotem = t.idTotem JOIN Empresa AS e ON t.fkEmpresa = e.idEmpresa
    WHERE t.idtotem= ${idTotem}`

    return database.executar(instrucao);
}

module.exports = {
    exibirTotensProcesso,
    exibirProcessos
};