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

function buscarUltimosAlertasComponentes(idEmpresa) {
  console.log(
    "Acessei o graficoJoaoModel e executei a função buscarUltimosAlertas(): ",
  );
  var instrucao = `
    SELECT C.nome AS nomeComponente, T.nome AS nomeTotem, R.valor, AR.nome AS nomeAeroporto, R.dataHora, A.tipo AS tipoAlerta FROM Alerta AS A 
    JOIN Registro AS R ON A.fkRegistro = R.idRegistro 
    JOIN Componente AS C ON R.fkComponente = C.idComponente 
    JOIN Totem AS T ON R.fkTotem = T.idTotem 
    JOIN Aeroporto AS AR ON T.fkAeroporto = AR.idAeroporto 
    WHERE dataHora = (SELECT MAX(dataHora) FROM Registro) AND fkEmpresa = ${idEmpresa}
    ORDER BY tipoAlerta;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarTotensEmAlerta(idEmpresa) {
  console.log(
    "Acessei o graficoJoaoModel e executei a função buscarTotensEmAlerta(): ",
  );
  var instrucao = `
    SELECT T.* FROM Totem AS T 
    RIGHT JOIN Registro AS R ON T.idTotem = R.fkTotem 
    RIGHT JOIN Alerta AS A ON A.fkRegistro = R.idRegistro 
    WHERE dataHora = (SELECT MAX(dataHora) FROM Registro) AND fkEmpresa = ${idEmpresa}
    GROUP BY T.idTotem;   
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
  buscarUltimosAlertasComponentes,
  buscarTotalTotensEmpresa,
  buscarTotensEmAlerta,
  buscarTotemMaisProblematico
};
