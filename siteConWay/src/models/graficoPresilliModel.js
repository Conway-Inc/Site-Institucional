var database = require("../database/config");

function exibirTotensProcesso(fkEmpresaVar){
    var instrucao = `SELECT t.idTotem, t.nome, COUNT(p.idProcesso)'Quantidade' 
    FROM Processo AS p JOIN Registro AS r ON p.fkRegistro = r.idRegistro JOIN Totem AS t ON r.fkTotem = t.idTotem JOIN Empresa AS e ON t.fkEmpresa = e.idEmpresa
    WHERE e.idEmpresa = ${fkEmpresaVar} GROUP BY idTotem`

    return database.executar(instrucao);
}

function exibirProcessos(idTotem){
    var instrucao = `SELECT (SELECT t.nome FROM Totem WHERE idTotem = ${idTotem}) 'nome', COUNT(idProcesso)'Quantidade', dataHora FROM Registro JOIN Totem AS t ON idTotem = fkTotem JOIN Processo ON fkRegistro = idRegistro WHERE idTotem = ${idTotem} GROUP BY dataHora;`

    return database.executar(instrucao);
}

module.exports = {
    exibirTotensProcesso,
    exibirProcessos
};