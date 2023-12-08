var database = require("../database/config");

function exibirInfosEmpresa(fkEmpresaVar){
    console.log(`Acessei o empresaModel.js, executei exibirInfosEmpresa(${fkEmpresaVar})`);
    var instrucao = `
        SELECT * 
            FROM Empresa 
                WHERE idEmpresa = '${fkEmpresaVar}'`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirFuncionarios(fkGerente, fkEmpresaVar){
    console.log(`Acessei o empresaModel.js, executei exibirFuncionarios(${fkGerente},${fkEmpresaVar})`);
    var instrucao = `
        SELECT F.nome, 
               F.fkGerente, 
               F.cpf, F.telefone, 
               F.dataNascimento, 
               F.email 
                FROM Funcionario AS F JOIN Empresa 
                    ON fkEmpresa = idEmpresa 
                        WHERE fkGerente != ${fkGerente} AND 
                              fkEmpresa = ${fkEmpresaVar};`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirGerentes(){
    console.log(`Acessei o empresaModel.js, executei exibirGerentes()`);
    var instrucao = `
        SELECT F.nome, 
            F.fkGerente, 
            F.cpf, 
            F.telefone, 
            F.dataNascimento, 
            F.email 
                    FROM Funcionario AS F JOIN Empresa 
                        ON fkEmpresa = idEmpresa 
                            WHERE fkGerente = 1;`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    exibirInfosEmpresa,
    exibirFuncionarios,
    exibirGerentes
};
  
