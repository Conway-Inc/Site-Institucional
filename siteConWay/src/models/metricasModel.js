var database = require("../database/config");

function cadastrarMetricasCpu(alertaCpu, criticoCpu, fkEmpresa){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMetricasCpu()");

    var instrucao = ``;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarMetricasMemo(alertaMemo, criticoMemo, fkEmpresa){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMetricasCpu()");

    var instrucao = ``;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarMetricasDisco(alertaDisco, criticoDisco, fkEmpresa){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMetricasCpu()");

    var instrucao = ``;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarMetricasCpu,
    cadastrarMetricasMemo,
    cadastrarMetricasDisco
};