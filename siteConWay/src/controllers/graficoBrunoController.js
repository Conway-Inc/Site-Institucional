var graficoBrunoModel = require("../models/graficoBrunoModel");

function exibirMunicipios(req, res) {
  var estado = req.params.estado;

  if (estado == undefined) {
    res.status(400).send("Seu estado está undefined!");
  } else {
    graficoBrunoModel.exibirMunicipios(estado).then(function (resultado) {
        console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  exibirMunicipios
};
