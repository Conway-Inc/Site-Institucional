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

    function listar(req, res) {
        var fkEmpresa = req.params.fkEmpresa

        veiculoModel.listar(fkEmpresa).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os veiculos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }

    function excluirVeiculo(req, res) {
      var idVeiculo = req.params.idVeiculo; 
    
        veiculoModel
          .excluirVeiculo(idVeiculo)
          .then(function (resultado) {
            res.json(resultado);
          })
          .catch(function (erro) {
            console.log(erro);
            console.log(
              "\nHouve um erro ao realizar o cadastro da ROTA! Erro: ",
              erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
          });
      }


module.exports = {
  cadastrarVeiculo,
  excluirVeiculo,
  listar
};
