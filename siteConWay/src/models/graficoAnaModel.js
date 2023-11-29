var database = require("../database/config");

function exibirTotensDoAeroporto(aeroporto) {
  console.log(
    "Acessei o graficoAnaModel e executei a função exibirTotensDoAeroporto(): ", aeroporto
  );
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
    SELECT * FROM vw_totem_estado 
    JOIN aeroporto ON vw_totem_estado.nomeAeroporto = aeroporto.nome 
    WHERE nomeAeroporto = '${aeroporto}';
    `;
  }
  else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
      SELECT * FROM vw_totem_estado 
      JOIN aeroporto ON vw_totem_estado.nomeAeroporto = aeroporto.nome 
      WHERE nomeAeroporto = '${aeroporto}' `;
  }
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function relatarCausaManutencao(motivoManutencaoTotem, urgenciaManutencaoTotem, descricaoTotem, totemSelecionado, dataInicio, dataLimite, valor) {
  console.log(
    "Acessei o graficoAnaModel e executei a função relatarCausaManuntencao: ", motivoManutencaoTotem, urgenciaManutencaoTotem, descricaoTotem, totemSelecionado
  );
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `INSERT INTO Manutencao VALUES
    (NULL, '${dataInicio}', '${dataLimite}', '${motivoManutencaoTotem}', '${urgenciaManutencaoTotem}', '${descricaoTotem}', ${valor}, ${totemSelecionado}, 0, NOW())
  `;
  }
  else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `INSERT INTO Manutencao VALUES
    ('${dataInicio}', '${dataLimite}', '${motivoManutencaoTotem}', '${urgenciaManutencaoTotem}', '${descricaoTotem}', ${valor}, ${totemSelecionado}, 0, GETDATE())
  `;
  }
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);

}

function exibirListaTotensManutencao(idEmpresa) {
  console.log(
    "Acessei o graficoAnaModel e executei a função exibirListaTotensManutencao: ",
    idEmpresa
  );
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
    SELECT tot.idTotem, 
    tot.nome AS nome, 
    aro.nome AS aeroportoTotem, 
    m.dataLimite,totManutencao.nome AS NomeTotemManutencao,
    aroManutencao.nome AS AeroportoTotemManutencao FROM Totem tot 
    INNER JOIN 
    Aeroporto aro ON tot.fkAeroporto = aro.idAeroporto 
    INNER JOIN Manutencao m ON tot.idTotem = m.fkTotem 
    INNER JOIN Empresa emp ON tot.fkEmpresa = emp.idEmpresa INNER JOIN
    Totem totManutencao ON m.fkTotem = totManutencao.idTotem INNER JOIN
    Aeroporto aroManutencao ON totManutencao.fkAeroporto = aroManutencao.idAeroporto
    WHERE 
    tot.fkEmpresa = ${idEmpresa};
    `;

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
      SELECT tot.idTotem, 
      tot.nome AS nome, 
      aro.nome AS aeroportoTotem, 
      m.dataLimite,totManutencao.nome AS NomeTotemManutencao,
      aroManutencao.nome AS AeroportoTotemManutencao FROM Totem tot 
      INNER JOIN 
      Aeroporto aro ON tot.fkAeroporto = aro.idAeroporto 
      INNER JOIN Manutencao m ON tot.idTotem = m.fkTotem 
      INNER JOIN Empresa emp ON tot.fkEmpresa = emp.idEmpresa INNER JOIN
      Totem totManutencao ON m.fkTotem = totManutencao.idTotem INNER JOIN
      Aeroporto aroManutencao ON totManutencao.fkAeroporto = aroManutencao.idAeroporto
      WHERE 
      tot.fkEmpresa = ${idEmpresa}`;
  }
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarInformacoes(nomeAeroportoServer, dataAtualServer) {
  console.log(
    "Acessei o graficoAnaModel e executei a função exibirListaTotensManutencao: ",
    nomeAeroportoServer, dataAtualServer
  );
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
  SELECT 
    qtdTotensAguardandoManutencao.qtdTotensAguardandoManutencaoCount,
    qtdTotensManutencaoFinalizada.qtdTotensManutencaoFinalizadaCount,
    qtdTotensManutencaoEmAndamento.qtdTotensManutencaoEmAndamentoCount,
    qtdeTotem.qtdeTotemCount
FROM
    (SELECT COUNT(*) as qtdTotensAguardandoManutencaoCount
     FROM Manutencao 
     JOIN Totem ON Manutencao.fkTotem = Totem.idTotem
     JOIN Aeroporto ON Totem.fkAeroporto = Aeroporto.idAeroporto
     WHERE '${dataAtualServer}' < dataManutencao AND aprovado = 1 AND Aeroporto.nome = '${nomeAeroportoServer}') as qtdTotensAguardandoManutencao,
    (SELECT COUNT(*) as qtdTotensManutencaoFinalizadaCount
     FROM Manutencao 
     JOIN Totem ON Manutencao.fkTotem = Totem.idTotem
     JOIN Aeroporto ON Totem.fkAeroporto = Aeroporto.idAeroporto
     WHERE '${dataAtualServer}' > dataLimite and aprovado = 1 AND Aeroporto.nome = '${nomeAeroportoServer}') as qtdTotensManutencaoFinalizada,
    (SELECT COUNT(*) as qtdTotensManutencaoEmAndamentoCount 
     FROM Manutencao 
     JOIN Totem ON Manutencao.fkTotem = Totem.idTotem
     JOIN Aeroporto ON Totem.fkAeroporto = Aeroporto.idAeroporto
     WHERE '${dataAtualServer}' > dataManutencao AND '${dataAtualServer}' < dataLimite AND Aeroporto.nome = '${nomeAeroportoServer}') as qtdTotensManutencaoEmAndamento,
    (SELECT COUNT(*) as qtdeTotemCount 
     FROM Totem 
     JOIN Aeroporto ON Totem.fkAeroporto = Aeroporto.idAeroporto
     WHERE Aeroporto.nome = '${nomeAeroportoServer}') as qtdeTotem;
  `;
  }
  else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
    SELECT 
      qtdTotensAguardandoManutencao.qtdTotensAguardandoManutencaoCount,
      qtdTotensManutencaoFinalizada.qtdTotensManutencaoFinalizadaCount,
      qtdTotensManutencaoEmAndamento.qtdTotensManutencaoEmAndamentoCount,
      qtdeTotem.qtdeTotemCount
  FROM
      (SELECT COUNT(*) as qtdTotensAguardandoManutencaoCount
       FROM Manutencao 
       JOIN Totem ON Manutencao.fkTotem = Totem.idTotem
       JOIN Aeroporto ON Totem.fkAeroporto = Aeroporto.idAeroporto
       WHERE '${dataAtualServer}' < dataManutencao AND aprovado = 1 AND Aeroporto.nome = '${nomeAeroportoServer}') as qtdTotensAguardandoManutencao,
      (SELECT COUNT(*) as qtdTotensManutencaoFinalizadaCount
       FROM Manutencao 
       JOIN Totem ON Manutencao.fkTotem = Totem.idTotem
       JOIN Aeroporto ON Totem.fkAeroporto = Aeroporto.idAeroporto
       WHERE '${dataAtualServer}' > dataLimite and aprovado = 1 AND Aeroporto.nome = '${nomeAeroportoServer}') as qtdTotensManutencaoFinalizada,
      (SELECT COUNT(*) as qtdTotensManutencaoEmAndamentoCount 
       FROM Manutencao 
       JOIN Totem ON Manutencao.fkTotem = Totem.idTotem
       JOIN Aeroporto ON Totem.fkAeroporto = Aeroporto.idAeroporto
       WHERE '${dataAtualServer}' > dataManutencao AND '${dataAtualServer}' < dataLimite AND Aeroporto.nome = '${nomeAeroportoServer}') as qtdTotensManutencaoEmAndamento,
      (SELECT COUNT(*) as qtdeTotemCount 
       FROM Totem 
       JOIN Aeroporto ON Totem.fkAeroporto = Aeroporto.idAeroporto
       WHERE Aeroporto.nome = '${nomeAeroportoServer}') as qtdeTotem `;
  }
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);

}

function exibirTotensPendentes(nomeAeroportoServer, nomeTotemServer) {
  console.log(
    "Acessei o graficoAnaModel e executei a função exibirTotensPendentes: ",
    nomeAeroportoServer, nomeTotemServer
  );
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
  SELECT Totem.*, IF(Pendentes.fkTotem IS NOT NULL, 1, 0) AS isTotemPendente
  FROM Totem
  LEFT JOIN (
      SELECT Manutencao.fkTotem
      FROM Manutencao 
      JOIN Totem ON Manutencao.fkTotem = Totem.idTotem
      JOIN Aeroporto ON Totem.fkAeroporto = Aeroporto.idAeroporto
      WHERE Manutencao.aprovado = 0 
        AND Aeroporto.nome = '${nomeAeroportoServer}'
        AND dataAtual < Manutencao.dataManutencao 
  ) AS Pendentes ON Totem.idTotem = Pendentes.fkTotem
  WHERE Totem.nome = '${nomeTotemServer}';
  `;
  }
  else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
    SELECT Totem.*, 
    CASE WHEN Pendentes.fkTotem IS NOT NULL THEN 1 ELSE 0 END AS isTotemPendente
  FROM Totem
  LEFT JOIN (
      SELECT Manutencao.fkTotem
      FROM Manutencao 
      JOIN Totem ON Manutencao.fkTotem = Totem.idTotem
      JOIN Aeroporto ON Totem.fkAeroporto = Aeroporto.idAeroporto
      WHERE Manutencao.aprovado = 0 
        AND Aeroporto.nome = '${nomeAeroportoServer}'
        AND dataAtual < Manutencao.dataManutencao 
  ) AS Pendentes ON Totem.idTotem = Pendentes.fkTotem
  WHERE Totem.nome = '${nomeTotemServer}';
    `;
  }
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function aprovarManutencao(totemServer) {
  console.log(
    "Acessei o graficoAnaModel e executei a função exibirTotensPendentes: ",
    totemServer
  );
  if (process.env.AMBIENTE_PROCESSO == "producao") {
  var instrucao = `
  UPDATE Manutencao
  SET aprovado = 1
  WHERE fkTotem = ${totemServer};
  `;
  }
  else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
  UPDATE Manutencao
  SET aprovado = 1
  WHERE fkTotem = ${totemServer};
  `;
  }
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function reprovarManutencao(totemServer) {
  console.log(
    "Acessei o graficoAnaModel e executei a função exibirTotensPendentes: ",
    totemServer
  );
  if (process.env.AMBIENTE_PROCESSO == "producao") {
  var instrucao = `
  UPDATE Manutencao
  SET aprovado = 0
  WHERE fkTotem = ${totemServer};
  `;}
  else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
  UPDATE Manutencao
  SET aprovado = 0
  WHERE fkTotem = ${totemServer};
  `;
  }
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarAprovacoesEReprovacoes(idEmpresa) {
  console.log(
    "Acessei o graficoAnaModel e executei a função listarAprovacoesEReprovacoes: ",
    idEmpresa
  );
  if (process.env.AMBIENTE_PROCESSO == "producao") {
  var instrucao = `
  SELECT 
    tot.idTotem,
    tot.nome AS nome,
    aro.nome AS aeroportoTotem,
    m.dataLimite,
    CASE 
        WHEN m.aprovado = 1 THEN 'Aprovado'
        WHEN m.aprovado = 0 THEN 'Reprovado'
        ELSE 'Não Avaliado'
    END AS StatusAprovacao
FROM 
    Totem tot
    INNER JOIN Aeroporto aro ON tot.fkAeroporto = aro.idAeroporto
    INNER JOIN Manutencao m ON tot.idTotem = m.fkTotem
WHERE 
    dataAtual < m.dataManutencao;
    `; }
    else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      var instrucao = `
      SELECT 
        tot.idTotem,
        tot.nome AS nome,
        aro.nome AS aeroportoTotem,
        m.dataLimite,
        CASE 
            WHEN m.aprovado = 1 THEN 'Aprovado'
            WHEN m.aprovado = 0 THEN 'Reprovado'
            ELSE 'Não Avaliado'
        END AS StatusAprovacao
    FROM 
        Totem tot
        INNER JOIN Aeroporto aro ON tot.fkAeroporto = aro.idAeroporto
        INNER JOIN Manutencao m ON tot.idTotem = m.fkTotem
    WHERE 
        dataAtual < m.dataManutencao;
        `; 
    }
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  exibirTotensDoAeroporto,
  relatarCausaManutencao,
  exibirListaTotensManutencao,
  buscarInformacoes,
  exibirTotensPendentes,
  aprovarManutencao,
  reprovarManutencao,
  listarAprovacoesEReprovacoes
};
