var database = require("../database/config");

function cadastrarVeiculo(placaVeiculo, anoAquisicao, fkModelo, fkEmpresa) {
  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
      INSERT INTO Veiculo (placaVeiculo,anoAquisicao,fkModelo,fkEmpresa) VALUES ('${placaVeiculo}', '${anoAquisicao}', '${fkModelo}', ${fkEmpresa});
      `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function alterarVeiculo(idVeiculo, placa, anoAquisicao, fkModelo) {
  var instrucao = `
    UPDATE Veiculo SET placaVeiculo = '${placa}',
                       anoAquisicao = ${anoAquisicao},
                       fkModelo = ${fkModelo}
                       WHERE idVeiculo = ${idVeiculo};
  `
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listar(fkEmpresa) {
  console.log(
    "ACESSEI O VEICULO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucao = `
        SELECT 
            idVeiculo, 
            placaVeiculo, 
            anoAquisicao, 
            nomeModelo,
            idModelo
                FROM Veiculo 
                    JOIN Modelo ON fkModelo = idModelo 
                    WHERE fkEmpresa = ${fkEmpresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function excluirVeiculo(idVeiculo) {
  var instrucao = `DELETE FROM Veiculo where idVeiculo = ${idVeiculo};`
  return database.executar(instrucao);
}


function graficoModelo(codLinha, horario) {
  var instrucao = `SELECT distinct v.*, m.* FROM Veiculo v JOIN Viagem vi ON v.idVeiculo = vi.fkVeiculo
  JOIN Linha l ON vi.fkLinha = l.idLinha 
  join Modelo m on m.idModelo = v.fkModelo
  WHERE (l.codLinha = '${codLinha}')
  AND hour(vi.horaInicio) <= '${horario}';`

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  cadastrarVeiculo,
  excluirVeiculo,
  alterarVeiculo,
  listar,
  graficoModelo
};
