var database = require("../database/config");

function exibirTotensEstado(estado) {
  console.log(
    "Acessei o grafiBrunoModel e executei a função exibirTotensEstado(): ",
    estado
  );
  var instrucao = `
    SELECT * FROM vw_totem_estado WHERE estado = '${estado}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function exibirTotensMunicipio(municipio) {
  console.log(
    "Acessei o grafiBrunoModel e executei a função exibirTotensMunicipio(): ",
    municipio
  );
  var instrucao = `
    SELECT * FROM vw_totem_estado WHERE municipio = '${municipio}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function exibirEstadosComTotens() {
  console.log(
    "ACESSEI O graficoBrunoModel \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirEstadosComTotens(): "
  );
  var instrucao = `
    SELECT estado FROM vw_totem_estado GROUP BY estado ORDER BY estado;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function exibirMunicipiosComTotens(estado) {
  console.log(
    "ACESSEI O graficoBrunoModel \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirMunicipiosComTotens(): ",estado
  );
  var instrucao = `
    SELECT municipio FROM vw_totem_estado WHERE estado = '${estado}' GROUP BY municipio ORDER BY municipio;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function exibirAeroportosComTotens(municipio) {
  console.log(
    "ACESSEI O graficoBrunoModel \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirAeroportosComTotens(): ",municipio
  );
  var instrucao = `
    SELECT idAeroporto, nomeAeroporto FROM vw_totem_estado WHERE municipio = '${municipio}' GROUP BY idAeroporto ORDER BY nomeAeroporto;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function valorDisco(idTotem) {
  console.log(
    "ACESSEI O graficoBrunoModel \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function valorDisco(): ",idTotem
  );
  var instrucao = `
    SELECT * FROM vw_disco_atual WHERE idTotem = ${idTotem} LIMIT 1;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  exibirTotensEstado,
  exibirTotensMunicipio,
  exibirEstadosComTotens,
  exibirMunicipiosComTotens,
  exibirAeroportosComTotens,
  valorDisco
};
