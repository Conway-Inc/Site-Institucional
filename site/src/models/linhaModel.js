var database = require("../database/config");


function listar(idEmpresa) {
  console.log(
    "ACESSEI O LINHA  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucao = `
        SELECT * FROM vwCardMenuDashboard WHERE idEmpresa = ${idEmpresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

// ADIÇÃO DA FUNÇÃO CADASTRAR ROTAS
function cadastrarLinha(nomeRota, tipoLinha, pontoInicial, pontoFinal, fkEmpresa) {
  console.log(
    "ACESSEI O linha MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarRotas():",
    nomeRota,
    tipoLinha,
    pontoInicial,
    pontoFinal
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
        INSERT INTO Linha (nomeLinhaIda, nomeLinhaVolta, codLinha, tipoLinha, fkEmpresa) VALUES ('${pontoInicial}', '${pontoFinal}','${nomeRota}','${tipoLinha}', ${fkEmpresa});
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function selectLinha(nomeLinha){
  console.log("ACESSEI O LINHA MODEL \n", nomeLinha)
  var instrucao = 
  `SELECT * FROM vwLinha WHERE codLinha = '${nomeLinha}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function kpiMovLinha(nomeLinha){
  console.log("ACESSEI O LINHA MODEL \n", nomeLinha)
  var instrucao = 
  `select * from vwKPIMovimentacaoLinha where codLinha = '${nomeLinha}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function veiculoRota(codLinha) {
  var instrucao = `SELECT distinct placaVeiculo, nomeModelo, lotacao
  FROM Veiculo v
  JOIN Viagem vi ON v.idVeiculo = vi.fkVeiculo
  JOIN Linha l ON vi.fkLinha = l.idLinha
  join Modelo m on v.fkModelo = m.idModelo
  WHERE l.codLinha = '${codLinha}';`

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}


module.exports = {
  cadastrarLinha,
  selectLinha,
  veiculoRota,
  kpiMovLinha,
  listar
};