var database = require("../database/config");

function exibirTabelaTotem(idEmpresa) {
  console.log(`Acessei o totemModel.js, executei exibirTabelaTotem(${idEmpresa})`);
  var instrucao = `
    SELECT tot.idTotem, tot.nome, aro.nome AS aeroportoTotem, emp.nome AS empresaTotem
    FROM Totem tot INNER JOIN aeroporto aro ON tot.fkAeroporto = aro.idAeroporto INNER JOIN empresa emp
    ON tot.fkEmpresa = emp.idEmpresa WHERE tot.fkEmpresa = ${idEmpresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function exibirMunicipios(estado) {
  console.log(`Acessei o totemModel.js, executei exibirMunicipios(${estado})`);

  var instrucao = `
    SELECT municipio FROM vw_aeroportos WHERE estado = '${estado}' GROUP BY municipio ORDER BY municipio;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function exibirAeroportos(municipio) {
  console.log(`Acessei o totemModel.js, executei exibirAeroportos(${municipio})`);
  var instrucao = `
    SELECT idAeroporto, nome FROM vw_aeroportos WHERE municipio = '${municipio}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarTotem(nomeTotem, fkAeroporto, fkEmpresa) {
  console.log(`Acessei o totemModel.js, executei cadastrarTotem(${nomeTotem},${fkAeroporto},${fkEmpresa})`);
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
    EXEC cadastrarTotem('${nomeTotem}', '${fkAeroporto}', '${fkEmpresa}' );`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
    CALL cadastrarTotem('${nomeTotem}', '${fkAeroporto}', '${fkEmpresa}' );`;
  }
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function criarViewTotem(idTotem) {
  console.log(`Acessei o totemModel.js, executei criarViewTotem(${idTotem})`);
  var instrucao = `
    CREATE VIEW vw_totem${idTotem} AS SELECT * FROM vw_RegistroEstruturado WHERE idTotem = ${idTotem};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarComponente(componente) {
  console.log(`Acessei o totemModel.js, executei cadastrarComponente(${componente})`);
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
    EXEC cadastrar_maquinaComponente (${componente});`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
    CALL cadastrar_maquinaComponente (${componente});`;
  }
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  exibirTabelaTotem,
  exibirMunicipios,
  exibirAeroportos,
  cadastrarTotem,
  cadastrarComponente,
  criarViewTotem
};
