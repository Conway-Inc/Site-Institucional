var database = require("../database/config");

function getValorTotalTotens(fkEmpresaServer){
  console.log(`Acessei o graficoBiaModel.js, executei getValorTotalTotens(${fkEmpresaServer})`);
  var instrucao = `
  SELECT quantidade_totens.quantidadeTotensCount
    FROM (SELECT COUNT(*) as quantidadeTotensCount 
            FROM Totem
              WHERE fkEmpresa = ${fkEmpresaServer}) 
                as quantidade_totens;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function getValorTotalTotensAlerta(fkEmpresaServer){
  console.log(`Acessei o graficoBiaModel.js, executei getValorTotalTotensAlerta(${fkEmpresaServer})`);
  var instrucao = `
  SELECT quantidade_registrosAlerta.quantidadeRegistrosAlertaCount
    FROM (SELECT COUNT(*) as quantidadeRegistrosAlertaCount
           FROM Totem tot
            INNER JOIN Registro reg ON tot.idTotem = reg.fkTotem
              WHERE reg.fkComponente = 4 AND 
              (reg.valor >= 75 AND reg.valor <= 78.99) AND 
              tot.fkEmpresa = '${fkEmpresaServer}') 
                AS quantidade_registrosAlerta;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function getValorTotalTotensCritico(fkEmpresaServer){
  console.log(`Acessei o graficoBiaModel.js, executei getValorTotalTotensCritico(${fkEmpresaServer})`);
  var instrucao = `
  SELECT 
    quantidade_registrosCritico.quantidadeRegistrosCriticoCount
  FROM
    (SELECT COUNT(*) as quantidadeRegistrosCriticoCount
    FROM Totem tot
    INNER JOIN Registro reg ON tot.idTotem = reg.fkTotem
    WHERE reg.fkComponente = 4 AND (reg.valor >= 79) AND tot.fkEmpresa = '${fkEmpresaServer}') AS quantidade_registrosCritico;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function exibirTabelaTotensTemperaturaAlerta(idEmpresa) {
  console.log(`Acessei o graficoBiaModel.js, executei exibirTabelaTotensTemperaturaAlerta(${idEmpresa})`);
    var instrucao = `
    SELECT tot.idTotem, tot.nome AS nomeTotem, reg.valor AS temperatura
    FROM Totem tot
    INNER JOIN Registro reg ON tot.idTotem = reg.fkTotem
    WHERE reg.fkComponente = 4 AND (reg.valor >= 75 AND reg.valor <= 78.99) AND tot.fkEmpresa = ${idEmpresa};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirTabelaTotensTemperaturaCritico(idEmpresa) {
  console.log(`Acessei o graficoBiaModel.js, executei exibirTabelaTotensTemperaturaCritico(${idEmpresa})`);
    var instrucao = `
    SELECT tot.idTotem, tot.nome AS nomeTotem, reg.valor AS temperatura
    FROM Totem tot
    INNER JOIN Registro reg ON tot.idTotem = reg.fkTotem
    WHERE reg.fkComponente = 4 AND (reg.valor >= 79) AND tot.fkEmpresa = ${idEmpresa};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function plotarTemperaturaAtualizada(idEmpresa) {
  console.log(`Acessei o graficoBiaModel.js, executei plotarTemperaturaAtualizada(${idEmpresa})`);
    var instrucao = `
    SELECT
      temperatura
    FROM
      vw_RegistroEstruturado
    WHERE
      idTotem = ${idEmpresa};`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
  getValorTotalTotens,
  getValorTotalTotensAlerta,
  getValorTotalTotensCritico,  
  exibirTabelaTotensTemperaturaAlerta,
  exibirTabelaTotensTemperaturaCritico,
  plotarTemperaturaAtualizada
};