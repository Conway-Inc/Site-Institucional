var database = require("../database/config");


// ADIÇÃO DA FUNÇÃO CADASTRAR ROTAS
function cadastrarLinhaPonto(idLinha, idPonto) {
  console.log(
    "ACESSEI O linha MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarLinhaPonto():",
    idLinha,
    idPonto
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
        INSERT INTO linhaPonto (fkLinha, fkPonto) VALUES ('${idLinha}', '${idPonto}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function selectLinha(nomeLinha){
  console.log("ACESSEI O USUÁRIO MODEL \n", nomeLinha)
  var instrucao = 
  `SELECT * FROM Linha WHERE codLinha = '${nomeLinha}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  
  cadastrarLinhaPonto,
  selectLinha
  
};
