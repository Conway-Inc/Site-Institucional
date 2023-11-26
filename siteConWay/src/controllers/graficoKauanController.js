var graficoKauanModel = require("../models/graficoKauanModel");

function buscarTotens(req, res) {

  graficoKauanModel.buscarTotens().then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum Totem encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarCompProblematico(req, res) {

  graficoKauanModel.buscarCompProblematico().then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum Totem encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarMaiorRegistro(req, res) {

  graficoKauanModel.buscarMaiorRegistro().then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum Totem encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function plotarGrafico(req, res) {

  id = req.params.id
  console.log("O id na controle é" + id)

  if (id == undefined) {
    res.status(400).send("O id do totem está undefined")
  } else {
    graficoKauanModel.plotarGrafico(id)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log("\nHouve um erro ao realizar o cadastro!Erro: ",
            erro.sqlMessage
          );
          res.status(500).send(erro.sqlMessage);
        }
      )
  }
}

module.exports = {
  buscarTotens,
  buscarCompProblematico,
  buscarMaiorRegistro,
  plotarGrafico
};