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

function buscarTotalTotensEmpresa(req, res) {

  idEmpresa = req.params.idEmpresa

  graficoJoaoModel.buscarTotalTotensEmpresa(idEmpresa).then(function (resultado) {
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

function buscarUltimosAlertasComponentes(req, res) {

  idEmpresa = req.params.idEmpresa

  graficoJoaoModel.buscarUltimosAlertasComponentes(idEmpresa).then(function (resultado) {
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

function buscarTotensEmAlerta(req, res) {

  idEmpresa = req.params.idEmpresa

  graficoJoaoModel.buscarTotensEmAlerta(idEmpresa).then(function (resultado) {
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

function buscarTotemMaisProblematico(req, res) {

  idEmpresa = req.params.idEmpresa

  graficoJoaoModel.buscarTotemMaisProblematico(idEmpresa).then(function (resultado) {
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
  exibirRegistrosTotemID,
  buscarUltimosAlertasComponentes,
  buscarTotalTotensEmpresa,
  buscarTotensEmAlerta,
  buscarTotemMaisProblematico
};
