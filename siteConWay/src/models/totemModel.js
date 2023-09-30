var database = require("../database/config");

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
  INSERT INTO Totem (nome, fkAeroporto, fkEmpresa) VALUES('${nomeTotem}', '${fkAeroporto}', '${fkEmpresa}' );
  
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarComponente(componente){
  console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarComponente()");
  var instrucao = `
  CALL cadastrar_maquinaComponente (${componente})
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}


module.exports = {
  exibirMunicipios,
  exibirAeroportos,
  cadastrarTotem,
  cadastrarComponente,
};
