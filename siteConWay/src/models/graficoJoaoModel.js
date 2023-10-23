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

function exibirUltimosAlertas(idEmpresa) {
  console.log(
    "Acessei o graficoJoaoModel e executei a função exibirRegistrosTotens(): ",
  );
  var instrucao = `
  SELECT C.nome, T.nome, R.valor, AR.nome, R.dataHora FROM Alerta AS A JOIN Registro AS R ON A.fkRegistro = R.idRegistro JOIN Componente AS C ON R.fkComponente = C.idComponente JOIN Totem AS T ON R.fkTotem = T.idTotem JOIN Aeroporto AS AR ON T.fkAeroporto = AR.idAeroporto WHERE dataHora = (SELECT MAX(dataHora) FROM Registro) AND fkEmpresa = ${idEmpresa};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}


module.exports = {
  exibirRegistrosTotens,
  exibirRegistrosTotemID,
  exibirUltimosAlertas
};
