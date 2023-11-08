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

function exibirOptionsMesAno(fkEmpresa) {
  console.log(
    "Acessei o graficoBrunoModel e executei a função dadosRelatorio(): ",fkEmpresa
  );
  var instrucao = `
    SELECT
      YEAR(dataHora) AS ano,
      MONTH(dataHora) AS mes
        FROM vw_alertas
          WHERE fkEmpresa = ${fkEmpresa}
            GROUP BY YEAR(dataHora), MONTH(dataHora)
              ORDER BY ano ASC;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function metricasGerais(tipo,texto,ano,mes) {
  console.log(
    "Acessei o graficoBrunoModel e executei a função metricasGerais(): ",tipo,texto,ano,mes
  );
  var instrucao = `
    SELECT
      ${tipo} as tipo,
      COUNT(CASE WHEN valor BETWEEN 85 AND 94 AND comp = 1 THEN 1 ELSE NULL END) AS alertaCpu,
      COUNT(CASE WHEN valor BETWEEN 85 AND 94 AND comp = 2 THEN 1 ELSE NULL END) AS alertaMem,
      COUNT(CASE WHEN valor >= 95 AND comp = 1 THEN 1 ELSE NULL END) AS criticoCpu,
      COUNT(CASE WHEN valor >= 95 AND comp = 2 THEN 1 ELSE NULL END) AS criticoMem
        FROM vw_alertas 
          WHERE ${texto} AND YEAR(dataHora) = ${ano} AND MONTH(dataHora) = ${mes}
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
      COUNT(CASE WHEN valor >= 95 THEN 1 ELSE NULL END) AS critico
        FROM vw_alertas
          WHERE MONTH(dataHora) = ${mes} AND YEAR(dataHora) = ${ano} AND comp = ${comp} AND fkEmpresa = ${fkEmpresa} AND ${texto}
            GROUP BY MONTH(dataHora), DAY(dataHora) 
              ORDER BY dia ASC;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function dadosMesAnterior(tipo,texto,ano,mes) {
  console.log(
    "Acessei o graficoBrunoModel e executei a função dadosMesAnterior(): ",tipo,texto,ano,mes
  );
  var instrucao = `
  SELECT SUM(alertaCpu) as alertaCpuAnt,
	   SUM(criticoCpu) as criticoCpuAnt,
	   SUM(alertaMem) as alertaMemAnt,
	   SUM(criticoMem)  as criticoMemAnt
			FROM (
        SELECT
          ${tipo} as tipo,
          COUNT(CASE WHEN valor BETWEEN 85 AND 94 AND comp = 1 THEN 1 ELSE NULL END) AS alertaCpu,
          COUNT(CASE WHEN valor BETWEEN 85 AND 94 AND comp = 2 THEN 1 ELSE NULL END) AS alertaMem,
          COUNT(CASE WHEN valor >= 95 AND comp = 1 THEN 1 ELSE NULL END) AS criticoCpu,
          COUNT(CASE WHEN valor >= 95 AND comp = 2 THEN 1 ELSE NULL END) AS criticoMem
            FROM vw_alertas 
              WHERE ${texto} AND YEAR(dataHora) = ${ano} AND MONTH(dataHora) = ${mes}
                GROUP BY ${tipo}
                  ORDER BY ${tipo} ASC) as xpto;
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
  exibirOptionsMesAno,
  metricasGerais,
  dadosRelatorio,
  dadosMesAnterior
};
