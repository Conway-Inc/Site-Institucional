var database = require("../database/config");

function listarPorParametro(param, value) {
    console.log("Selecionando uma lista de usuários no banco");
    var instrucao = `
        SELECT * FROM Funcionario WHERE ${param} = ${value};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listarPorParametro
}