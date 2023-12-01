var database = require("../database/config");

function cadastrarFuncionario(nomeFuncVar, emailFuncVar, senhaFuncVar, cpfFuncVar, telFuncVar, dataFuncVar, cargoFuncVar, idFuncionarioVar,fkEmpresa){
    console.log(`Acessei o funcionarioModel.js, executei cadastrarFuncionario(${nomeFuncVar},${emailFuncVar},${senhaFuncVar},${cpfFuncVar},${telFuncVar},${dataFuncVar},${cargoFuncVar},${idFuncionarioVar},${fkEmpresa})`);
    var instrucao = `
    INSERT INTO Funcionario (email, senha, nome, cpf, telefone, dataNascimento, foto, fkGerente, fkEmpresa) 
        VALUES ('${emailFuncVar}', '${senhaFuncVar}', '${nomeFuncVar}', '${cpfFuncVar}', '${telFuncVar}', '${dataFuncVar}', NULL, ${cargoFuncVar}, ${fkEmpresa});`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarFuncionario(nomeFuncVar, emailFuncVar, senhaFuncVar, cpfFuncVar, telFuncVar, dataFuncVar, idFuncionario){
    console.log(`Acessei o funcionarioModel.js, executei atualizarFuncionario(${nomeFuncVar},${emailFuncVar},${senhaFuncVar},${cpfFuncVar},${telFuncVar},${dataFuncVar},${cargoFuncVar},${idFuncionario})`);
    var instrucao = `
    UPDATE Funcionario 
        SET email = '${emailFuncVar}', 
            senha = '${senhaFuncVar}', 
            nome = '${nomeFuncVar}', 
            cpf = '${cpfFuncVar}', 
            telefone = '${telFuncVar}', 
            dataNascimento = '${dataFuncVar}' 
                WHERE idFuncionario = '${idFuncionario}';`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarFuncionario,
    atualizarFuncionario
};
  