var database = require("../database/config");


// ADIÇÃO DA FUNÇÃO CADASTRAR ROTAS
function cadastrarPonto(cep, logradouro, numNaRua, grausY, grausX) {
  console.log(
    "ACESSEI O linha MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarRotas():",
    cep,
    logradouro,
    numNaRua,
    grausY,
    grausX
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
        INSERT INTO Ponto (cep, logradouro, numNaRua, grausY, grausX) VALUES ('${cep}', '${logradouro}','${numNaRua}','${grausY}', '${grausX}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listar() {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Erro: connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor do seu BD está rodando corretamente. \n\n function listar()");

  var instrucao = `SELECT * From Ponto;`;

  console.log("Executando a instrução SQL: \n"  + instrucao);
  return database.executar(instrucao);
}

function listarPorCodLinha(codLinha) {
  console.log("ACESSEI O PONTO MODEL \n \n\t\t >> Se aqui der erro de 'Erro: connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor do seu BD está rodando corretamente. \n\n function listar()");

  var instrucao = `SELECT * FROM Ponto as p
    join LinhaPonto as lp on p.idPonto = lp.fkPonto
    join Linha as l on lp.fkLinha = l.idLinha
    where l.codLinha = '${codLinha}'`;

  console.log("Executando a instrução SQL: \n"  + instrucao);
  return database.executar(instrucao);
}

function listarId(logradouro) {
  console.log(
    "ACESSEI O PONTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarId(): ",
    logradouro
  );
  var instrucao = `
      SELECT idPonto FROM Ponto WHERE logradouro = '${logradouro}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function selectPontosVetor(nomePonto){
  console.log("ACESSEI O LINHA MODEL \n", nomePonto)
  var instrucao = 
  `SELECT idPonto FROM Ponto WHERE logradouro = '${nomePonto}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listar,
  listarId,
  listarPorCodLinha,
  cadastrarPonto,
  selectPontosVetor
  
};
