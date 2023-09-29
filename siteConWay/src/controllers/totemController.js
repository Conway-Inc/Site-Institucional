var totemModel = require("../models/totemModel");

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
module.exports = {
  exibirMunicipios,
  exibirAeroportos
};
