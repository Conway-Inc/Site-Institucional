var database = require("../database/config");

function entrar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucao = `
    SELECT fu.idFuncionario as idFuncionario,
           fu.nome as nomeFuncionario,
           fu.email,
           fu.senha,
           fu.cpf,
           fu.telefone as telefoneFuncionario,
           fu.dataNascimento,
           fu.foto,
           fu.fkGerente,
           em.idEmpresa,
           em.nome as nomeEmpresa,
           em.cnpj,
           rm.fkRamo as ramo
              FROM Funcionario as fu, Empresa as em, RamoEmpresa as rm WHERE email = '${email}' AND senha = '${senha}' AND em.idEmpresa = fu.fkEmpresa AND em.idEmpresa = rm.fkEmpresa;

  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}


module.exports = {
  entrar
};
