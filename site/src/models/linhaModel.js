var database = require("../database/config");

var fkEmpresa = 1;
// ADIÇÃO DA FUNÇÃO CADASTRAR ROTAS
function cadastrarLinha(nomeRota, tipoLinha, pontoInicial, pontoFinal) {
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
        INSERT INTO linha (nomeLinhaIda, nomeLinhaVolta, codLinha, tipoLinha, fkEmpresa) VALUES ('${pontoInicial}', '${pontoFinal}','${nomeRota}','${tipoLinha}', ${fkEmpresa});
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
module.exports = {
  
  cadastrarLinha
  
};
