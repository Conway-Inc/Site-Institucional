var graficoJoaoModel = require("../models/graficoJoaoModel");

function exibirRegistrosTotens(req, res) {
  var idEmpresa = req.params.idEmpresa;

  if (idEmpresa == undefined) {
    res.status(400).send("O idEmpresa está undefined")
  } else {
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
}

function exibirRegistrosTotemID(req, res) {
  var idTotem = req.params.idTotem;

  if (idTotem == undefined) {
    res.status(400).send("O idTotem está undefined")
  } else {
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
}

function buscarTotalTotensEmpresa(req, res) {
  var idEmpresa = req.params.idEmpresa;

  if (idEmpresa == undefined) {
    res.status(400).send("O idEmpresa está undefined")
  } else {
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
}

function buscarAlertasTotensCritico(req, res) {
  var idEmpresa = req.params.idEmpresa;

  if (idEmpresa == undefined) {
    res.status(400).send("O idEmpresa está undefined")
  } else {
    graficoJoaoModel.buscarAlertasTotensCritico(idEmpresa).then(function (resultado) {
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
}

function buscarAlertasTotensAtencao(req, res) {
  var idEmpresa = req.params.idEmpresa

  if (idEmpresa == undefined) {
    res.status(400).send("O idEmpresa está undefined")
  } else {
    graficoJoaoModel.buscarAlertasTotensAtencao(idEmpresa).then(function (resultado) {
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
}

function buscarTotemMaisProblematico(req, res) {
  var idEmpresa = req.params.idEmpresa

  if (idEmpresa == undefined) {
    res.status(400).send("O idEmpresa está undefined")
  } else {
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
}

module.exports = {
  exibirRegistrosTotens,
  exibirRegistrosTotemID,
  buscarAlertasTotensCritico,
  buscarAlertasTotensAtencao,
  buscarTotalTotensEmpresa,
  buscarTotemMaisProblematico
};
