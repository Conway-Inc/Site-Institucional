var database = require("../database/config");

// function exibirTotensTodos() {
//   console.log(
//     "Acessei o graficoBrunoModel e executei a função exibirTotensTodos(): "
//   );
//   var instrucao = `
//     SELECT * FROM vw_totem_estado;
//     `;
//   console.log("Executando a instrução SQL: \n" + instrucao);
//   return database.executar(instrucao);
// }

// function exibirTotensEstado(estado) {
//   console.log(
//     "Acessei o graficoBrunoModel e executei a função exibirTotensEstado(): ",
//     estado
//   );
//   var instrucao = `
//     SELECT * FROM vw_totem_estado WHERE estado = '${estado}';
//     `;
//   console.log("Executando a instrução SQL: \n" + instrucao);
//   return database.executar(instrucao);
// }

// function exibirTotensMunicipio(municipio) {
//   console.log(
//     "Acessei o graficoBrunoModel e executei a função exibirTotensMunicipio(): ",
//     municipio
//   );
//   var instrucao = `
//     SELECT * FROM vw_totem_estado WHERE municipio = '${municipio}';
//     `;
//   console.log("Executando a instrução SQL: \n" + instrucao);
//   return database.executar(instrucao);
// }

// function exibirTotensAeroportos(aeroporto) {
//   console.log(
//     "Acessei o graficoBrunoModel e executei a função exibirTotensAeroportos(): ",
//     aeroporto
//   );
//   var instrucao = `
//     SELECT * FROM vw_totem_estado WHERE nomeAeroporto = '${aeroporto}';
//     `;
//   console.log("Executando a instrução SQL: \n" + instrucao);
//   return database.executar(instrucao);
// }

function exibirEstadosComTotens() {
  console.log(
    "Acessei o graficoBrunoModel e executei a função exibirEstadosComTotens(): ",
  );
  var instrucao = `
    SELECT estado FROM vw_totem_estado GROUP BY estado ORDER BY estado;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function exibirMunicipiosComTotens(estado) {
  console.log(
    "Acessei o graficoBrunoModel e executei a função exibirMunicipiosComTotens(): ",estado
  );
  var instrucao = `
    SELECT municipio FROM vw_totem_estado WHERE estado = '${estado}' GROUP BY municipio ORDER BY municipio;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function exibirAeroportosComTotens(municipio) {
  console.log(
    "Acessei o graficoBrunoModel e executei a função exibirAeroportosComTotens(): ",municipio
  );
  var instrucao = `
    SELECT idAeroporto, nomeAeroporto FROM vw_totem_estado WHERE municipio = '${municipio}' GROUP BY idAeroporto ORDER BY nomeAeroporto;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function valorDisco(idTotem) {
  console.log(
    "Acessei o graficoBrunoModel e executei a função valorDisco(): ",idTotem
  );
  var instrucao = `
    SELECT * FROM vw_disco_atual WHERE idTotem = ${idTotem} LIMIT 1;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function valorTotem(idTotem) {
  console.log(
    "Acessei o graficoBrunoModel e executei a função valorDisco(): ",idTotem
  );
  var instrucao = `
    SELECT * FROM vw_RegistroEstruturado WHERE id = ${idTotem} ORDER BY data DESC;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function metricasGerais(tipo,texto) {
  console.log(
    "Acessei o graficoBrunoModel e executei a função metricasGerais(): ",tipo,texto
  );
  var instrucao = `
    SELECT
      ${tipo} as tipo,
      COUNT(CASE WHEN valor BETWEEN 85 AND 94 THEN 1 ELSE NULL END) AS alerta,
      COUNT(CASE WHEN valor >= 95 THEN 1 ELSE NULL END) AS critico
        FROM vw_alertas 
          WHERE ${texto} AND comp = 2
            GROUP BY ${tipo}
              ORDER BY ${tipo} ASC;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function dadosRelatorio(comp,mes,ano,fkEmpresa,texto) {
  console.log(
    "Acessei o graficoBrunoModel e executei a função dadosRelatorio(): ",comp,ano,mes,fkEmpresa
  );
  var instrucao = `
    SELECT
      DAY(dataHora) AS dia,
      COUNT(CASE WHEN valor BETWEEN 85 AND 94 THEN 1 ELSE NULL END) AS alerta,
      COUNT(CASE WHEN valor >= 95 THEN 1 ELSE NULL END) AS critico,
      COUNT(CASE WHEN valor >= 85 THEN 1 ELSE NULL END) AS total
        FROM vw_alertas
          WHERE MONTH(dataHora) = ${mes} AND YEAR(dataHora) = ${ano} AND comp = ${comp} AND fkEmpresa = ${fkEmpresa} AND ${texto}
            GROUP BY MONTH(dataHora), DAY(dataHora) 
              ORDER BY dia ASC;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  exibirEstadosComTotens,
  exibirMunicipiosComTotens,
  exibirAeroportosComTotens,
  valorDisco,
  valorTotem,
  metricasGerais,
  dadosRelatorio
};
