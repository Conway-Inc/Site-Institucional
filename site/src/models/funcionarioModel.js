var database = require("../database/config");

function listar(param,valor) {
    console.log("Selecionando uma lista de usuários no banco");
    var instrucao = `
        SELECT * FROM funcionario;
    `;
    if(param != null && valor != null){
        instrucao += `
         WHERE ${param} = ${valor}
        `;
    }
    return database.executar(instrucao);
}

function listarFuncPor