var database = require("../database/config");

function buscarTotens() {
  console.log(
    "Acessei o graficoKauanModel e executei a função buscarTotens(): ",
  );
  var instrucao = `
  SELECT
	  nome,
      COUNT(CASE WHEN valor >= 0.00 AND comp = 1 THEN 1 ELSE NULL END) AS alertaCpu,
      COUNT(CASE WHEN valor >= 0.00 AND comp = 2 THEN 1 ELSE NULL END) AS alertaMem,
      COUNT(CASE WHEN valor >= 0.00 AND comp = 3 THEN 1 ELSE NULL END) AS alertaDisco
		FROM vw_alertas 
            GROUP BY idTotem
              ORDER BY idTotem ASC;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
    buscarTotens  
  };