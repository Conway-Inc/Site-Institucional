var database = require("../database/config");

function getValorTotalTotens(fkEmpresaServer){
  console.log(
    "Acessei o graficoBiaModel e executei a função atualizarValorTotens: ",
    fkEmpresaServer
  );
  var instrucao = `
    SELECT COUNT(*) AS quantidade_totens
    FROM Totem
    WHERE fkEmpresa = '${ fkEmpresaServer}'
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function exibirTabelaTotensTemperaturaAlerta(idEmpresa) {
  console.log("ACESSEI O TOTEM  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirTabelaTotensTemperaturaAlerta()");
    var instrucao = `
    SELECT tot.idTotem, tot.nome AS nomeTotem, reg.valor AS temperatura
    FROM Totem tot
    INNER JOIN Registro reg ON tot.idTotem = reg.fkTotem
    WHERE reg.fkComponente = 4 AND (reg.valor >= 75 AND reg.valor <= 78.99) AND tot.fkEmpresa = ${idEmpresa};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirTabelaTotensTemperaturaCritico(idEmpresa) {
  console.log("ACESSEI O TOTEM  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirTabelaTotensTemperaturaCritico()");
    var instrucao = `
    SELECT tot.idTotem, tot.nome AS nomeTotem, reg.valor AS temperatura
    FROM Totem tot
    INNER JOIN Registro reg ON tot.idTotem = reg.fkTotem
    WHERE reg.fkComponente = 4 AND (reg.valor >= 79) AND tot.fkEmpresa = ${idEmpresa};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
  getValorTotalTotens,  
  exibirTabelaTotensTemperaturaAlerta,
    exibirTabelaTotensTemperaturaCritico
};