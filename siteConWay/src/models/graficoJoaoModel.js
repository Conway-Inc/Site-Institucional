var database = require("../database/config");

function exibirRegistrosTotens(idEmpresa) {
  console.log(
    "Acessei o graficoJoaoModel e executei a função exibirRegistrosTotens(): ",
  );
  var instrucao = `
    SELECT * FROM vw_RegistroEstruturado WHERE fkEmpresa = ${idEmpresa};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function exibirRegistrosTotemID(idTotem) {
  console.log(
    "Acessei o graficoJoaoModel e executei a função exibirRegistrosTotemID(): ",
  );
  var instrucao = `
    SELECT * FROM vw_totem${idTotem};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarTotalTotensEmpresa(idEmpresa) {
  console.log(
    "Acessei o graficoJoaoModel e executei a função buscarTotalTotensEmpresa(): ",
  );
  var instrucao = `
    SELECT COUNT(idTotem) AS qtdTotens FROM Totem WHERE fkEmpresa = ${idEmpresa};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarAlertasTotensCritico(idEmpresa) {
  console.log(
    "Acessei o graficoJoaoModel e executei a função buscarAlertasTotensCritico(): ",
  );
  var instrucao = `
    SELECT * FROM vw_totensEmAlerta WHERE tipoAlerta = 1 AND idEmpresa = ${idEmpresa};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarAlertasTotensAtencao(idEmpresa) {
  console.log(
    "Acessei o graficoJoaoModel e executei a função buscarAlertasTotensAtencao(): ",
  );
  var instrucao = `
  SELECT * FROM vw_totensEmAlerta WHERE tipoAlerta = 2 AND idEmpresa = ${idEmpresa};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarTotemMaisProblematico(idEmpresa) {
  console.log(
    "Acessei o graficoJoaoModel e executei a função buscarTotemMaisProblematico(): ",
  );
  var instrucao = `
    SELECT t.nome AS nomeTotem, COUNT(a.idAlerta) AS totalAlertas
    FROM Totem AS t
    LEFT JOIN Registro AS r ON t.idTotem = r.fkTotem
    LEFT JOIN Alerta AS a ON r.idRegistro = a.fkRegistro
    WHERE t.fkEmpresa = ${idEmpresa}
    GROUP BY t.idTotem, t.nome
    ORDER BY TotalAlertas DESC
    LIMIT 1; 
  `;
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
