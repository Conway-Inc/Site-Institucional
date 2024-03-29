var graficoAnaModel = require("../models/graficoAnaModel");

  function exibirTotensDoAeroporto(req, res) {
    const { aeroporto } = req.body
    graficoAnaModel.exibirTotensDoAeroporto(aeroporto).then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum estado encontrado!")
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }

  function aprovarManutencao(req, res) {
    const { totemServer } = req.body
    graficoAnaModel.aprovarManutencao(totemServer).then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum estado encontrado!")
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }

  function reprovarManutencao(req, res) {
    const { totemServer } = req.body
    graficoAnaModel.reprovarManutencao(totemServer).then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum estado encontrado!")
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }

  function exibirTotensPendentes(req, res) {
    const { nomeAeroportoServer, nomeTotemServer } = req.body;
  
    graficoAnaModel.exibirTotensPendentes(nomeAeroportoServer, nomeTotemServer)
      .then(function (resultado) {
        console.log("Resultado da consulta SQL no servidor:", resultado);
  
        if (resultado && resultado[0] && resultado[0].isTotemPendente) {
          res.status(200).json({ isTotemPendente: true });
        } else {
          res.status(200).json({ isTotemPendente: false });
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os totens pendentes: ", erro.sqlMessage);
        res.status(500).json({ error: erro.sqlMessage });
      });
  }

  

  function relatarCausaManutencao(req, res){
    var motivoManutencaoTotem = req.body.motivoManutencaoServer;
    var urgenciaManutencaoTotem = req.body.urgenciaManutencaoServer;
    var descricaoTotem = req.body.descricaoServer;
    var dataInicio = req.body.dataInicioServer;
    var dataLimite = req.body.dataLimiteServer;
    var totemSelecionado = req.body.selectTotemServer;
    var valor = req.body.valorServer
  
    if (motivoManutencaoTotem == undefined) {
        res.status(400).send("O motivo da manutenção do seu Totem está undefined")
    } else if (urgenciaManutencaoTotem  == undefined){
        res.status(400).send("A urgencia da manutenção está undefined")
    } else if (descricaoTotem == undefined){
      res.status(400).send("A descrição está undefined")
    } else if (totemSelecionado == undefined) {
      res.status(400).send("Totem selecionado está undefined")
    } else if (dataInicio == undefined) {
      res.status(400).send("Data inicio está undefined")
    } else if (dataLimite == undefined) {
      res.status(400).send("Data limite está undefined")
    } else if (valor == undefined) {
      res.status(400).send("O valor está undefined")
    }
    else{
        graficoAnaModel.relatarCausaManutencao(motivoManutencaoTotem, urgenciaManutencaoTotem, descricaoTotem, totemSelecionado, dataInicio, dataLimite, valor)
            .then(
                function(resultado){
                    res.json(resultado);
                }
            ).catch(
                function(erro){
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro!Erro: ",
                    erro.sqlMessage
                    );
                    res.status(500).send(erro.sqlMessage);
                }
            )
    }
  }

  function exibirListaTotensManutencao(req, res) {
    var idEmpresa = req.params.idEmpresa;
  
    graficoAnaModel.exibirListaTotensManutencao(idEmpresa).then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os totens cadastrados: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }

  function buscarInformacoes(req, res) {
    const { nomeAeroportoServer, dataAtualServer } = req.body
    graficoAnaModel.buscarInformacoes(nomeAeroportoServer, dataAtualServer ).then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum estado encontrado!")
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }

  function listarAprovacoesEReprovacoes(req, res) {
    var idEmpresa = req.params.idEmpresa;
  
    graficoAnaModel.listarAprovacoesEReprovacoes(idEmpresa).then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os totens cadastrados: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
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
  
  