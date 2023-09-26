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

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarRepresentante(
  nome,
  email,
  senha,
  cpf,
  celular,
  foto,
  idEmpresa
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    email,
    senha
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.

  console.log(idEmpresa);

  var instrucao = `INSERT INTO Funcionario (cpf, nome, email, senha, celular, fkEmpresa, foto) VALUES ('${cpf}', '${nome}', '${email}', '${senha}', '${celular}', ${idEmpresa}, '${foto}');`;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarEmpresa(cnpj, nome, foto) {
  var instrucao = `
        INSERT INTO Empresa (cnpj, nome, foto) VALUES ('${cnpj}', '${nome}', '${foto}');
    `;

  return database.executar(instrucao);
}

function capturarIdEmpresa(cnpj) {
  var instrucao = `SELECT idEmpresa FROM Empresa WHERE cnpj = '${cnpj}';`;

  return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao

function cadastrarFuncionario(
  nome,
  email,
  senha,
  cpf,
  fkEmpresa,
  fkRepresentante,
  celular,
  foto
) {



  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
    INSERT INTO Funcionario (nome, email, senha, cpf, fkEmpresa, fkRepresentante, celular, foto) VALUES ('${nome}', '${email}', '${senha}', '${cpf}', ${fkEmpresa}, ${fkRepresentante},'${celular}','${foto}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function alterarFuncionario(id, nome, email, senha, celular, foto) {
  var instrucao = `UPDATE Funcionario SET nome = '${nome}',
                  email = '${email} ',
                  senha = '${senha}',
                  celular = '${celular}',
                  foto = '${foto}'
                  WHERE idFuncionario = ${id}`;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarFuncionarioAirway(nome, email, senha, cpf, cargo, empresa) {
  var instrucao = `INSERT INTO Funcionario VALUES (null, '${cpf}', '${nome}', '${email}', '${senha}','${cargo}',${empresa}) `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarTotem (marca, nome, numeroSerie, fkAeroporto) {
  var instrucao = `INSERT INTO Totem VALUES (null, '${marca}', '${nome}', '${numeroSerie}', ${fkAeroporto}) `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function excluirFuncionario(idFuncionario) {
  var instrucao = `DELETE FROM Funcionario where idFuncionario = ${idFuncionario};`
  return database.executar(instrucao);
}

function mudarInfos(nome,email,cpf,id) {
  var instrucao = `UPDATE Funcionario set nomeFunc = '${nome}',emailFunc = '${email}',cpfFunc = '${cpf}' where idFuncionario = ${id};`
  return database.executar(instrucao);
}

function mudarSenha(senha,id) {
  var instrucao = `UPDATE Funcionario set senhaFunc = '${senha}' where idFuncionario = ${id};`
  return database.executar(instrucao);
}

module.exports = {
  entrar,
  cadastrarRepresentante,
  capturarIdEmpresa,
  cadastrarEmpresa,
  cadastrarFuncionario,
  alterarFuncionario,
  excluirFuncionario,
  cadastrarFuncionario,
  cadastrarFuncionarioAirway,
  cadastrarTotem,
  mudarInfos,
  mudarSenha
};
