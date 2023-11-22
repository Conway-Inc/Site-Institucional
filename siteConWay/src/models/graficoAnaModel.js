var database = require("../database/config");

  function exibirTotensDoAeroporto(aeroporto) {
    console.log(
        "Acessei o graficoAnaModel e executei a função exibirTotensDoAeroporto(): ",aeroporto
      );
    var instrucao = `
    SELECT * FROM vw_totem_estado 
    JOIN aeroporto ON vw_totem_estado.nomeAeroporto = aeroporto.nome 
    WHERE nomeAeroporto = '${aeroporto}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }

  function relatarCausaManutencao (motivoManutencaoTotem, urgenciaManutencaoTotem, descricaoTotem, totemSelecionado, dataInicio, dataLimite, valor) {
    console.log(
      "Acessei o graficoAnaModel e executei a função relatarCausaManuntencao: ", motivoManutencaoTotem, urgenciaManutencaoTotem, descricaoTotem, totemSelecionado
    );
    var instrucao = `INSERT INTO Manutencao VALUES
    (NULL, '${dataInicio}', '${dataLimite}', '${motivoManutencaoTotem}', '${urgenciaManutencaoTotem}', '${descricaoTotem}', ${valor}, ${totemSelecionado}, 0)
  `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
    
  }

  function totensEmOperacao (aeroporto) {
    console.log(
      "Acessei o graficoAnaModel e executei a função totensEmOperacao: ",
      aeroporto
    );
    var instrucao = `SELECT COUNT(*) AS totensEmOperacao 
      FROM Totem
      JOIN Manutencao ON Totem.idTotem = Manutencao.fkTotem
      JOIN Aeroporto ON Totem.fkAeroporto = Aeroporto.idAeroporto
      WHERE Aeroporto.nome = '${aeroporto}' AND Manutencao.urgenciaManutencao = 'Baixa';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }

  module.exports = {
    exibirTotensDoAeroporto,
    relatarCausaManutencao
  };
  