var graficoBrunoModel = require("../models/graficoBrunoModel");

function exibirEstadosComTotens(req, res) {
  graficoBrunoModel.exibirEstadosComTotens().then(function (resultado) {
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

function exibirMunicipiosComTotens(req, res) {
  var estado = req.params.estado;

  graficoBrunoModel.exibirMunicipiosComTotens(estado).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum municipio encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function exibirAeroportosComTotens(req, res) {
  var municipio = req.params.municipio;

  graficoBrunoModel.exibirAeroportosComTotens(municipio).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum aeroporto encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function valorDisco(req, res) {
  var idTotem = req.params.idTotem;

  graficoBrunoModel.valorDisco(idTotem).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum aeroporto encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function valorTotem(req, res) {
  var idTotem = req.params.idTotem;

  graficoBrunoModel.valorTotem(idTotem).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum aeroporto encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function exibirOptionsMesAno(req, res) {
  var fkEmpresa = req.body.fkEmpresaServer;

  graficoBrunoModel.exibirOptionsMesAno(fkEmpresa).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum tipo encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function metricasGerais(req, res) {
  var tipo = req.body.tipoServer;
  var texto = req.body.textoServer;
  var ano = req.body.anoServer;
  var mes = req.body.mesServer;

  graficoBrunoModel.metricasGerais(tipo,texto,ano,mes).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum tipo encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function dadosRelatorio(req, res) {
  var comp = req.body.compServer;
  var mes = req.body.mesServer;
  var ano = req.body.anoServer;
  var fkEmpresa = req.body.fkEmpresaServer;
  var texto = req.body.textoServer;

  graficoBrunoModel.dadosRelatorio(comp,mes,ano,fkEmpresa,texto).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum tipo encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  exibirEstadosComTotens,
  exibirMunicipiosComTotens,
  exibirAeroportosComTotens,
  valorDisco,
  valorTotem,
  exibirOptionsMesAno,
  metricasGerais,
  dadosRelatorio
};
