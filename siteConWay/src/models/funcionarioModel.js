var database = require("../database/config");

function cadastrarFuncionario(nomeFuncVar, emailFuncVar, senhaFuncVar, cpfFuncVar, telFuncVar, dataFuncVar, cargoFuncVar, idFuncionarioVar,fkEmpresa){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarTotem()");

    var instrucao = `INSERT INTO Funcionario (email, senha, nome, cpf, telefone, dataNascimento, foto, fkGerente, fkEmpresa) 
    VALUES('${emailFuncVar}', '${senhaFuncVar}', '${nomeFuncVar}', '${cpfFuncVar}', '${telFuncVar}', '${dataFuncVar}', NULL, ${cargoFuncVar}, ${fkEmpresa});
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarFuncionario(nomeFuncVar, emailFuncVar, senhaFuncVar, cpfFuncVar, telFuncVar, dataFuncVar, idFuncionario){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarTotem()");
    var instrucao = `
    UPDATE Funcionario SET email = '${emailFuncVar}', senha = '${senhaFuncVar}', nome = '${nomeFuncVar}', cpf = '${cpfFuncVar}', telefone = '${telFuncVar}', dataNascimento = '${dataFuncVar}' WHERE idFuncionario = '${idFuncionario}';
    
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarFuncionario,
    atualizarFuncionario
};
  