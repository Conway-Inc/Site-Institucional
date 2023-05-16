var database = require("../database/config");

function listarPorEmpresa(fkEmpresa) {
    console.log("Selecionando uma lista de usuários no banco");
    var instrucao = `
        SELECT * FROM funcionario WHERE fkEmpresa = ${fkEmpresa};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listarPorEmpresa
}