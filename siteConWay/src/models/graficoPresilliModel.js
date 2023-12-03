var database = require("../database/config");

function exibirTotensProcesso(fkEmpresaVar){
    var instrucao = `SELECT * FROM view_infoTotem`

    return database.executar(instrucao);
}

function exibirProcessos(idTotem){
    var instrucao = `SELECT (SELECT t.nome FROM Totem WHERE idTotem = ${idTotem}) 'nome', COUNT(idProcesso)'Quantidade', dataHora FROM Registro JOIN Totem AS t ON idTotem = fkTotem JOIN Processo ON fkRegistro = idRegistro WHERE idTotem = ${idTotem} GROUP BY dataHora LIMIT 10`

    return database.executar(instrucao);
}




module.exports = {
    exibirTotensProcesso,
    exibirProcessos
};