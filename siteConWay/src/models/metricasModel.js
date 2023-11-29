var database = require("../database/config");

function cadastrarMetricasCpu(alertaCpu, criticoCpu, fkEmpresa){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMetricasCpu()");

    var instrucao = `
    UPDATE TotemComponente
    INNER JOIN Totem ON TotemComponente.fkTotem = Totem.idTotem
    SET TotemComponente.alerta = ${alertaCpu}, TotemComponente.critico = ${criticoCpu}
    WHERE Totem.fkEmpresa = ${fkEmpresa} AND TotemComponente.fkComponente = 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarMetricasMemo(alertaMemo, criticoMemo, fkEmpresa){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMetricasCpu()");

    var instrucao = `
    UPDATE TotemComponente
    INNER JOIN Totem ON TotemComponente.fkTotem = Totem.idTotem
    SET TotemComponente.alerta = ${alertaMemo}, TotemComponente.critico = ${criticoMemo}
    WHERE Totem.fkEmpresa = ${fkEmpresa} AND TotemComponente.fkComponente = 2;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarMetricasDisco(alertaDisco, criticoDisco, fkEmpresa){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMetricasCpu()");

    var instrucao = `
    UPDATE TotemComponente
    INNER JOIN Totem ON TotemComponente.fkTotem = Totem.idTotem
    SET TotemComponente.alerta = ${alertaDisco}, TotemComponente.critico = ${criticoDisco}
    WHERE Totem.fkEmpresa = ${fkEmpresa} AND TotemComponente.fkComponente = 3;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarMetricasCpu,
    cadastrarMetricasMemo,
    cadastrarMetricasDisco
};