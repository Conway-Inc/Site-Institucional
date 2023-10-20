var graficoJoaoModel = require("../models/graficoJoaoModel");

function exibirRegistrosTotens(req, res) {

  idEmpresa = req.params.idEmpresa

  graficoJoaoModel.exibirRegistrosTotens(idEmpresa).then(function (resultado) {
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

function exibirRegistrosTotemID(req, res) {

  idTotem = req.params.idTotem

  graficoJoaoModel.exibirRegistrosTotemID(idTotem).then(function (resultado) {
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

module.exports = {
  exibirRegistrosTotens,
  exibirRegistrosTotemID
};
