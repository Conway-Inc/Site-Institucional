var database = require("../database/config");

function cadastrarFuncionario(nomeFuncVar, emailFuncVar, senhaFuncVar, cpfFuncVar, telFuncVar, dataFuncVar, fkEmpresa){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarTotem()");
    var instrucao = `
    INSERT INTO Funcionario (email, senha, nome, cpf, telefone, dataNascimento, foto, fkGerente, fkEmpresa) 
    VALUES('${emailFuncVar}', '${senhaFuncVar}', '${nomeFuncVar}', '${cpfFuncVar}', '${telFuncVar}', '${dataFuncVar}', NULL,  ${fkEmpresa});
    
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarFuncionario
};
  