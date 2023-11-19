var database = require("../database/config");

function getTempAeroporto(aeroporto) {
    console.log(
        "Acessei o graficoAnaModel e executei a função getTempAeroporto(): ",aeroporto
      );
      var instrucao = `
      SELECT * 
      FROM temperaturaAeroporto 
      JOIN aeroporto ON temperaturaAeroporto.fkAeroporto = aeroporto.idAeroporto 
      WHERE aeroporto.idAeroporto = (SELECT idAeroporto FROM aeroporto WHERE nome = '${aeroporto}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }

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

  function relatarCausaManutencao (motivoManutencaoTotem, urgenciaManutencaoTotem, descricaoTotem, totemSelecionado) {
    console.log(
      "Acessei o graficoAnaModel e executei a função relatarCausaManuntencao: ", motivoManutencaoTotem, urgenciaManutencaoTotem, descricaoTotem, totemSelecionado
    );
    var instrucao = `INSERT INTO Manutencao (dataManutencao, motivoManutencao, urgenciaManutencao, descricaoManutencao, fkTotem) VALUES
    (NOW(), '${motivoManutencaoTotem}', '${urgenciaManutencaoTotem}', '${descricaoTotem}', ${totemSelecionado})
  `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
    
  }
  
  module.exports = {
    getTempAeroporto,
    exibirTotensDoAeroporto,
    relatarCausaManutencao
  };
  