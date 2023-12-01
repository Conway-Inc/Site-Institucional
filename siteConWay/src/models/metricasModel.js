var database = require("../database/config");

function cadastrarMetricasCpu(alertaCpu, criticoCpu, fkEmpresa){
    console.log(`Acessei o metricasModel.js, executei cadastrarMetricasCpu(${alertaCpu},${criticoCpu},${fkEmpresa})`);
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
    console.log(`Acessei o metricasModel.js, executei cadastrarMetricasMemo(${alertaMemo},${criticoMemo},${fkEmpresa})`);
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
    console.log(`Acessei o metricasModel.js, executei cadastrarMetricasDisco(${alertaDisco},${criticoDisco},${fkEmpresa})`);
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