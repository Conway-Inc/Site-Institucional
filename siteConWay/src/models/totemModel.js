var database = require("../database/config");

function exibirTabelaTotem(idEmpresa) {
  console.log("ACESSEI O TOTEM  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirTabelaTotem()");
    var instrucao = `
    SELECT tot.idTotem, tot.nome, aro.nome AS aeroportoTotem, emp.nome AS empresaTotem
    FROM Totem tot INNER JOIN aeroporto aro ON tot.fkAeroporto = aro.idAeroporto INNER JOIN empresa emp
    ON tot.fkEmpresa = emp.idEmpresa WHERE tot.fkEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirMunicipios(estado) {
  console.log(
    "ACESSEI O graficoBrunoModel \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirMunicipios(): ",estado
  );
  var instrucao = `
    SELECT municipio FROM vw_aeroportos WHERE estado = '${estado}' GROUP BY municipio ORDER BY municipio;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function exibirAeroportos(municipio) {
  console.log(
    "ACESSEI O graficoBrunoModel \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirMunicipios(): ",municipio
  );
  var instrucao = `
    SELECT idAeroporto, nome FROM vw_aeroportos WHERE municipio = '${municipio}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarTotem(nomeTotem, fkAeroporto, fkEmpresa){
  console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarTotem()");
  var instrucao = `
  EXEC cadastrarTotem('${nomeTotem}', '${fkAeroporto}', '${fkEmpresa}' );
  
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function criarViewTotem(idTotem){
  console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarComponente()");
  var instrucao = `
    CREATE VIEW vw_totem${idTotem} AS SELECT * FROM vw_RegistroEstruturado WHERE idTotem = ${idTotem};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarComponente(componente){
  console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarComponente()");
  var instrucao = `
  EXEC cadastrar_maquinaComponente (${componente})
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarMetricas(){
  console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarTotem()");
  var instrucao = `
  SELECT idComponente * FROM TotemComponete;
  INSERT INTO TotemComponete(valor, alerta, critico, fkComponente, fkTotem) VALUES()
  `
}


module.exports = {
  exibirTabelaTotem,
  exibirMunicipios,
  exibirAeroportos,
  cadastrarTotem,
  cadastrarComponente,
  criarViewTotem,
  cadastrarMetricas
};
