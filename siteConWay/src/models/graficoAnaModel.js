var database = require("../database/config");

function exibirTotensDoAeroporto(aeroporto) {
    console.log(
        "Acessei o graficoAnaModel e executei a função exibirTotensDoAeroporto(): ",aeroporto
      );
    var instrucao = `
    SELECT * FROM vw_totem_estado 
    JOIN aeroporto ON vw_totem_estado.nomeAeroporto = aeroporto.nome 
    WHERE nomeAeroporto = '${aeroporto}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }
  
  module.exports = {
    exibirTotensDoAeroporto
  };
  