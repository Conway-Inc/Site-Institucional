var graficoBiaModel = require("../models/graficoBiaModel");

function getValorTotalTotens(req, res) {
  const { fkEmpresaServer } = req.body
  graficoBiaModel.getValorTotalTotens( fkEmpresaServer ).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum valor encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function exibirTabelaTotensTemperaturaAlerta(req, res) {
  var idEmpresa = req.params.idEmpresa;
  
    graficoBiaModel.exibirTabelaTotensTemperaturaAlerta(idEmpresa).then(function (resultado) {
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

function exibirTabelaTotensTemperaturaCritico(req, res) {
  var idEmpresa = req.params.idEmpresa;
  
    graficoBiaModel.exibirTabelaTotensTemperaturaCritico(idEmpresa).then(function (resultado) {
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
  getValorTotalTotens,  
  exibirTabelaTotensTemperaturaAlerta,
  exibirTabelaTotensTemperaturaCritico
  };