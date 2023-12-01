var database = require("../database/config");

function entrar(email, senha) {
  console.log(`Acessei o loginMogel.js, executei entrar(${email},${senha})`);
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
           rm.fkRamo as ramo FROM Funcionario AS fu 
           JOIN Empresa AS em ON em.idEmpresa = fu.fkEmpresa
           JOIN RamoEmpresa AS rm ON em.idEmpresa = rm.fkEmpresa
   		WHERE email = '${email}' AND senha = '${senha}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  entrar
};
