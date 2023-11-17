var database = require("../database/config");

function getTempAeroporto(aeroporto) {
    console.log(
        "Acessei o graficoAnaModel e executei a função getTempAeroporto(): ",aeroporto
      );
      var instrucao = `
      SELECT * 
      FROM temperaturaAeroporto 
      JOIN aeroporto ON temperaturaAeroporto.fkAeroporto = aeroporto.idAeroporto 
      WHERE aeroporto.idAeroporto = (SELECT idAeroporto FROM aeroporto WHERE nome = '${aeroporto}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }
  
  module.exports = {
    getTempAeroporto
  };
  