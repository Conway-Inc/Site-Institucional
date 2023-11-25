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

module.exports = {
    buscarTotens
};