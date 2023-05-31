var database = require("../database/config");

function fluxoViagens(codLinha){
    console.log("ACESSEI O LINHA MODEL \n", codLinha)
    var instrucao = 
    `select * from vwFluxo where CodLinha = '${codLinha}';`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    fluxoViagens
};
  