const e = require("express");
var database = require("../database/config");

function entrar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucao = `
        SELECT * FROM tabInterna WHERE email = '${email}' AND senha = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarEmpresa(email, senha, cnpj, representante, ramo, nome, cpf) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha,
    ramo,
    representante,
    cnpj
  );

  var instrucao = `INSERT INTO Empresa(cnpjEmpr, nomeEmpr, ramoEmpr) VALUES ('${cnpj}', '${nome}', '${ramo}');`

  database.executar(instrucao)
  instrucao2 = `INSERT INTO Funcionario(nomeFunc, emailFunc, senhaFunc, fkEmpresa, cpfFunc, gerente) VALUES ('${representante}', '${email}', '${senha}', (SELECT LAST_INSERT_ID(idEmpresa) from Empresa ORDER BY idEmpresa DESC limit 1), '${cpf}', 'S');`
  return database.executar(instrucao2)



}

module.exports = {
  entrar,
  cadastrarEmpresa
};