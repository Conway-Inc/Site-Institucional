var database = require("../database/config");

function exibirInfosEmpresa(fkEmpresaVar){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirInfosEmpresa()");
    var instrucao = `
    SELECT * FROM empresa WHERE idEmpresa = '${fkEmpresaVar}'
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    exibirInfosEmpresa
};
  