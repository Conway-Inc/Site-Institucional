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

function buscarCompProblematico() {
  console.log(
    "Acessei o graficoKauanModel e executei a função buscarCompProblematico(): ",
  );
  var instrucao = `
    WITH RankedComponents AS (
      SELECT
          idTotem,
          comp AS componente_mais_problematico,
          COUNT(comp) AS quantidade_de_ocorrencias,
          ROW_NUMBER() OVER (PARTITION BY idTotem ORDER BY COUNT(comp) DESC) AS rn
      FROM vw_alertas
      GROUP BY idTotem, comp
    )
    SELECT idTotem, componente_mais_problematico
    FROM RankedComponents
    WHERE rn = 1;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarMaiorRegistro() {
  console.log(
    "Acessei o graficoKauanModel e executei a função buscarMaiorRegistro(): ",
  );
  var instrucao = `
  SELECT idTotem, MAX(valor) AS max_valor
  FROM vw_alertas 
    WHERE comp IN (
        SELECT componente_mais_problematico
        FROM (
            SELECT
                idTotem,
                comp AS componente_mais_problematico,
                COUNT(comp) AS quantidade_de_ocorrencias,
                ROW_NUMBER() OVER (PARTITION BY idTotem ORDER BY COUNT(comp) DESC) AS rn
            FROM vw_alertas
            GROUP BY idTotem, comp
        ) RankedComponents
        WHERE rn = 1
  )
  GROUP BY idTotem;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function plotarGrafico(id) {
  console.log(
    "Acessei o graficoKauanModel e executei a função buscarMaiorRegistro(): ",
  );
  var instrucao = `
  SELECT cpu, memoria, data FROM vw_registroEstruturado WHERE idTotem = ${id};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
    buscarTotens,
    buscarCompProblematico,
    buscarMaiorRegistro,
    plotarGrafico
  };