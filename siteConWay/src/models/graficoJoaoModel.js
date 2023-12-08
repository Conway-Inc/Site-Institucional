var database = require("../database/config");

function exibirRegistrosTotens(idEmpresa) {
  console.log(`Acessei o graficoJoaoModel.js, executei exibirRegistrosTotens(${idEmpresa})`);
  var instrucao = `
    SELECT * FROM vw_RegistroEstruturado ORDER BY r.fkTotem, r.dataHora ASC OFFSET 0 ROWS WHERE fkEmpresa = ${idEmpresa};`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function exibirRegistrosTotemID(idTotem) {
  console.log(`Acessei o graficoJoaoModel.js, executei exibirRegistrosTotemID(${idTotem})`);
  var instrucao = `
    SELECT * FROM vw_totem${idTotem};`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarTotalTotensEmpresa(idEmpresa) {
  console.log(`Acessei o graficoJoaoModel.js, executei buscarTotalTotensEmpresa(${idEmpresa})`);
  var instrucao = `
    SELECT COUNT(idTotem) AS qtdTotens FROM Totem WHERE fkEmpresa = ${idEmpresa};`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarAlertasTotensCritico(idEmpresa) {
  console.log(`Acessei o graficoJoaoModel.js, executei buscarAlertasTotensCritico(${idEmpresa})`);
  var instrucao = `
    SELECT * FROM vw_totensEmAlerta WHERE tipoAlerta = 1 AND idEmpresa = ${idEmpresa};`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarAlertasTotensAtencao(idEmpresa) {
  console.log(`Acessei o graficoJoaoModel.js, executei buscarAlertasTotensAtencao(${idEmpresa})`);
  var instrucao = `
  SELECT * FROM vw_totensEmAlerta WHERE tipoAlerta = 2 AND idEmpresa = ${idEmpresa};`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarTotemMaisProblematico(idEmpresa) {
  console.log(`Acessei o graficoJoaoModel.js, executei buscarTotemMaisProblematico(${idEmpresa})`);
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
    SELECT nome AS nomeTotem, 
           COUNT(idAlerta) AS totalAlertas 
            FROM vw_alertas WHERE fkEmpresa = ${idEmpresa}
              GROUP BY idTotem, nome
                ORDER BY TotalAlertas DESC
                  OFFSET 0 ROWS
                    FETCH NEXT 1 ROWS ONLY; `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
    SELECT nome AS nomeTotem, 
           COUNT(idAlerta) AS totalAlertas 
            FROM vw_alertas WHERE fkEmpresa = ${idEmpresa}
              GROUP BY idTotem, nomeTotem
                ORDER BY TotalAlertas DESC LIMIT 1;`;
  }
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  exibirRegistrosTotens,
  exibirRegistrosTotemID,
  buscarAlertasTotensCritico,
  buscarAlertasTotensAtencao,
  buscarTotalTotensEmpresa,
  buscarTotemMaisProblematico
};
