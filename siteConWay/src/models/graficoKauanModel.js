var database = require("../database/config");

function buscarTotens(idEmpresa) {
  console.log(
    "Acessei o graficoKauanModel e executei a função buscarTotens(): ",
  );
  var instrucao = `
    SELECT COUNT(idTotem) AS qtdTotens FROM Totem WHERE fkEmpresa = ${idEmpresa};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
    buscarTotens  
  };