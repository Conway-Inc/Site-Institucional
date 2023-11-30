var database = require("../database/config");

function exibirTotensProcesso(fkEmpresaVar){
    var instrucao = `SELECT t.idTotem, t.nome, COUNT(p.idProcesso)'Quantidade' 
    FROM Processo AS p JOIN Registro AS r ON p.fkRegistro = r.idRegistro JOIN Totem AS t ON r.fkTotem = t.idTotem JOIN Empresa AS e ON t.fkEmpresa = e.idEmpresa
    WHERE e.idEmpresa = ${fkEmpresaVar} GROUP BY idTotem`

    return database.executar(instrucao);
}

function exibirProcessos(idTotem){
    var instrucao = `SELECT (SELECT t.nome FROM Totem WHERE idTotem = ${idTotem}) 'nome', COUNT(idProcesso)'Quantidade', dataHora FROM Registro JOIN Totem AS t ON idTotem = fkTotem JOIN Processo ON fkRegistro = idRegistro WHERE idTotem = ${idTotem} GROUP BY dataHora LIMIT 10`

    return database.executar(instrucao);
}


function exibirRegistrosCpu(idTotem){
    var instrucao = `SELECT valor FROM Registro AS r JOIN Totem AS t ON fkTotem = idTotem 
    JOIN Componente AS c ON fkComponente = idComponente WHERE idTotem = ${idTotem} AND c.nome = "CPU" ORDER BY idRegistro DESC LIMIT 1 `

    return database.executar(instrucao);
}

function exibirRegistrosDisco(idTotem){
    var instrucao = `SELECT valor FROM Registro AS r JOIN Totem AS t ON fkTotem = idTotem 
    JOIN Componente AS c ON fkComponente = idComponente WHERE idTotem = ${idTotem} AND c.nome = "Disco" ORDER BY idRegistro DESC LIMIT 1;`

    return database.executar(instrucao);
}

function exibirRegistrosMemoria(idTotem){
    var instrucao = `SELECT valor FROM Registro AS r JOIN Totem AS t ON fkTotem = idTotem 
    JOIN Componente AS c ON fkComponente = idComponente WHERE idTotem = ${idTotem} AND c.nome = "Memoria" ORDER BY idRegistro DESC LIMIT 1;`

    return database.executar(instrucao);
}

module.exports = {
    exibirTotensProcesso,
    exibirProcessos,
    exibirRegistrosCpu,
    exibirRegistrosDisco,
    exibirRegistrosMemoria
};