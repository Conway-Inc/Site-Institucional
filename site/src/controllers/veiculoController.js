var veiculoModel = require("../models/veiculoModel");

function cadastrarVeiculo(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var placaVeiculo = req.body.placaVeiculoServer;
    var anoAquisicao = req.body.anoAquisicaoServer;
    var fkModelo = req.body.fkModeloServer;
    var fkEmpresa = req.body.fkEmpresaServer;
  

      veiculoModel
        .cadastrarVeiculo(
          placaVeiculo,
          anoAquisicao,
          fkModelo,
          fkEmpresa,
        )
        .then(function (resultado) {
          res.json(resultado);
        })
        .catch(function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastro de Veiculo! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        });
    }

module.exports = {
  cadastrarVeiculo,
};
