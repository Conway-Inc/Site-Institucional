var database = require("../database/config");

function exibirInfosEmpresa(fkEmpresaVar){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirInfosEmpresa()");
    var instrucao = `
    SELECT * FROM Empresa WHERE idEmpresa = '${fkEmpresaVar}'
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirFuncionarios(fkGerente, fkEmpresaVar){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirInfosEmpresa()");
    var instrucao = `
    SELECT F.nome, F.fkGerente, F.cpf, F.telefone, F.dataNascimento, F.email FROM Funcionario AS F JOIN Empresa ON fkEmpresa = idEmpresa WHERE fkGerente != ${fkGerente} AND fkEmpresa = ${fkEmpresaVar};`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirGerentes(){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirInfosEmpresa()");
    var instrucao = `
    SELECT F.nome, F.fkGerente, F.cpf, F.telefone, F.dataNascimento, F.email FROM Funcionario AS F JOIN Empresa ON fkEmpresa = idEmpresa WHERE fkGerente = 1;`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    exibirInfosEmpresa,
    exibirFuncionarios,
    exibirGerentes
};
  
