var database = require("../database/config");

function exibirTotensDoAeroporto(aeroporto) {
    console.log(
        "Acessei o graficoAnaModel e executei a função exibirTotensDoAeroporto(): ",aeroporto
      );
    var instrucao = `
    SELECT nomeTotem FROM vw_totem_estado WHERE nomeAeroporto = '${aeroporto}' GROUP BY nomeTotem ORDER BY nomeTotem;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }
  
  module.exports = {
    exibirTotensDoAeroporto
  };
  