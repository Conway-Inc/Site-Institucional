var totemModel = require("../models/totemModel");

function exibirTabelaTotem(req, res) {
  var idEmpresa = req.params.idEmpresa;

  totemModel.exibirTabelaTotem(idEmpresa).then(function (resultado) {
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

function exibirMunicipios(req, res) {
  var estado = req.params.estado;

  totemModel.exibirMunicipios(estado).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function exibirAeroportos(req, res) {
  var municipio = req.params.municipio;

  totemModel.exibirAeroportos(municipio).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function cadastrarTotem(req, res){
  var nomeTotem = req.body.nomeTotemServer;
  var fkAeroporto = req.body.fkAeroportoServer;
  var fkEmpresa = req.body.fkEmpresaServer;

  if (nomeTotem == undefined) {
      res.status(400).send("O nome do seu Totem está undefined")
  } else if(fkAeroporto == undefined){
      res.status(400).send("A sua fkAeroporto está undefined")
  } else if (fkEmpresa == undefined){
    res.status(400).send("A sua fkEmpresa está undefined")
  }
  else{
      totemModel.cadastrarTotem(nomeTotem, fkAeroporto, fkEmpresa)
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

function criarViewTotem(req, res){
    
  var idTotem = req.body.idTotemServer

  if (idTotem == undefined) {
      res.status(400).send("O idTotem está vazio.")
  }else {
      totemModel.criarViewTotem(idTotem)
          .then(
              function(resultado){
                  res.json(resultado);
              }
          ).catch(
                  function(erro){
                  console.log(erro);
                  console.log("\nHouver um erro ao criar a view do totem!Erro: ",
                  erro.sqlMessage
                  );
                  res.status(500).send(erro.sqlMessage);
              }
          )
  }
}

function cadastrarComponente(req, res){
    
  var componente = req.body.componenteServer

  if (componente == undefined) {
      res.status(400).send("A sua cpu está undefined")
  }else {
      totemModel.cadastrarComponente(componente)
          .then(
              function(resultado){
                  res.json(resultado);
              }
          ).catch(
                  function(erro){
                  console.log(erro);
                  console.log("\nHouver um erro ao realizar o cadastro!Erro: ",
                  erro.sqlMessage
                  );
                  res.status(500).send(erro.sqlMessage);
              }
          )
  }
}

function cadastrarMetricas(req, res){

}

module.exports = {
  exibirTabelaTotem,
  exibirMunicipios,
  exibirAeroportos,
  cadastrarTotem,
  cadastrarComponente,
  criarViewTotem,
  cadastrarMetricas
};
