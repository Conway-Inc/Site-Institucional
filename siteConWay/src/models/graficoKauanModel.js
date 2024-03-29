var database = require("../database/config");

function buscarTotens() {
  console.log(`Acessei o graficoKauanModel.js, executei buscarTotens()`);
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
      SELECT * FROM infosTotem ORDER BY idTotem ASC;`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
      SELECT
      nome,
      COUNT(CASE WHEN valor >= 85.00 AND comp = 1 THEN 1 ELSE NULL END) AS alertaCpu,
      COUNT(CASE WHEN valor >= 85.00 AND comp = 2 THEN 1 ELSE NULL END) AS alertaMem,
      COUNT(CASE WHEN valor >= 85.00 AND comp = 3 THEN 1 ELSE NULL END) AS alertaDisco
        FROM vw_alertas 
          GROUP BY idTotem
            ORDER BY idTotem ASC;`;
  }
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarCompProblematico() {
  console.log(`Acessei o graficoKauanModel.js, executei buscarCompProblematico()`);
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
      SELECT * FROM componenteProblematico;`;
  }
  var instrucao = `
    WITH RankedComponents AS (
      SELECT idTotem,
             comp AS componente_mais_problematico,
             COUNT(comp) AS quantidade_de_ocorrencias,
             ROW_NUMBER() OVER (PARTITION BY idTotem ORDER BY COUNT(comp) DESC) AS rn
              FROM vw_alertas
                GROUP BY idTotem, comp)
      SELECT idTotem, componente_mais_problematico
        FROM RankedComponents
          WHERE rn = 1;`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarMaiorRegistro() {
  console.log(`Acessei o graficoKauanModel.js, executei buscarMaiorRegistro()`);
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
    SELECT * FROM maximoValor;`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
      SELECT idTotem, MAX(valor) AS max_valor
        FROM vw_alertas 
          WHERE comp IN (
            SELECT componente_mais_problematico
              FROM (
                SELECT idTotem,
                       comp AS componente_mais_problematico,
                       COUNT(comp) AS quantidade_de_ocorrencias,
                       ROW_NUMBER() OVER (PARTITION BY idTotem ORDER BY COUNT(comp) DESC) AS rn
                        FROM vw_alertas
                          GROUP BY idTotem, comp) 
                RankedComponents
                  WHERE rn = 1)
            GROUP BY idTotem;`;    
  }
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function plotarGrafico(id) {
  console.log(`Acessei o graficoKauanModel.js, executei plotarGrafico(${id})`);
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
      SELECT TOP 3600
              cpu,
              memoria,
              FORMAT(data, 'dd MMM, HH:mm') as data
                FROM vw_RegistroEstruturado
                  WHERE idTotem = ${id}
                    ORDER BY data ASC;`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
    SELECT cpu, 
           memoria,
           DATE_FORMAT(data, '%d de %M, %k:%i') as data 
            FROM vw_RegistroEstruturado 
              WHERE idTotem = ${id} LIMIT 3600;`;
  }
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarRegistroUltimoDia(id) {
  console.log(`Acessei o graficoKauanModel.js, executei buscarRegistroUltimoDia(${id})`);
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
    SELECT TOP 43200
            cpu,
            memoria,
            FORMAT(data, 'dd MMM, HH:mm') as data
              FROM vw_RegistroEstruturado
                WHERE idTotem = ${id}
                  ORDER BY data DESC;`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
    SELECT cpu, 
           memoria, 
           DATE_FORMAT(data, '%d de %M, %k:%i') as data 
            FROM vw_RegistroEstruturado 
              WHERE idTotem = ${id} LIMIT 43200;`;
  }
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function atualizarGrafico(idTotem) {
  console.log(`Acessei o graficoKauanModel.js, executei atualizarGrafico(${idTotem})`);
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
      SELECT cpu, 
             memoria, 
             FORMAT(data, 'dd MMM, HH:mm') as data 
              FROM vw_RegistroEstruturado 
                WHERE idTotem = ${idTotem}
                  ORDER BY data DESC 
                    OFFSET 0 ROWS
                      FETCH NEXT 1 ROWS ONLY;`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
      SELECT cpu, 
             memoria, 
             DATE_FORMAT(data, '%d de %M, %k:%i') as data 
              FROM vw_RegistroEstruturado WHERE idTotem = ${idTotem}
                ORDER BY data DESC LIMIT 1;`;
  } 
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  buscarTotens,
  buscarCompProblematico,
  buscarMaiorRegistro,
  plotarGrafico,
  buscarRegistroUltimoDia,
  atualizarGrafico
};