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
    SELECT t.nome AS nomeTotem, ar.nome AS nomeAeroporto
    FROM Totem AS t
    INNER JOIN Aeroporto AS ar ON t.fkAeroporto = ar.idAeroporto
    INNER JOIN Registro AS r ON t.idTotem = r.fkTotem
    INNER JOIN Alerta AS a ON r.idRegistro = a.fkRegistro
    WHERE a.tipo = 1 AND dataHora = (SELECT MAX(dataHora) FROM Registro) AND t.fkEmpresa = ${idEmpresa}
    GROUP BY t.nome, ar.nome;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarAlertasTotensAtencao(idEmpresa) {
  console.log(
    "Acessei o graficoJoaoModel e executei a função buscarAlertasTotensAtencao(): ",
  );
  var instrucao = `
    SELECT t.nome AS nomeTotem, ar.nome AS nomeAeroporto
    FROM Totem AS t
    INNER JOIN Aeroporto AS ar ON t.fkAeroporto = ar.idAeroporto
    INNER JOIN Registro AS r ON t.idTotem = r.fkTotem
    INNER JOIN Alerta AS a ON r.idRegistro = a.fkRegistro
    WHERE a.tipo = 2 AND dataHora = (SELECT MAX(dataHora) FROM Registro)
    AND NOT EXISTS (
        SELECT 1
        FROM Registro AS r2
        INNER JOIN Alerta AS a2 ON r2.idRegistro = a2.fkRegistro
        WHERE r2.fkTotem = t.idTotem AND a2.tipo = 1 AND dataHora = (SELECT MAX(dataHora) FROM Registro)
    )
    GROUP BY t.nome, ar.nome;
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
