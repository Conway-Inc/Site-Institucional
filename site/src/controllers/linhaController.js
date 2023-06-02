var linhaModel = require("../models/linhaModel");

var sessoes = [];

// Criado para Cadastrar a rota - alterarRotas.html
function cadastrarLinha(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nomeRota = req.body.nomeRotaServer;
  var tipoLinha = req.body.tipoLinhaServer;
  var pontoInicial = req.body.pontoInicialServer;
  var pontoFinal = req.body.pontoFinalServer;
  var fkEmpresa = req.body.fkEmpresaServer;

  // Faça as validações dos valores
  if (nomeRota == undefined) {
    res.status(400).send("O nome da Rota está undefined!");
  } else if (tipoLinha == undefined) {
    res.status(400).send("O tipo da linha está undefined!");
  } else if (pontoInicial == undefined) {
    res.status(400).send("O ponto inicial está undefined!");
  } else if (pontoFinal == undefined) {
    res.status(400).send("O ponto final está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo linhaModel.js
    linhaModel
      .cadastrarLinha(nomeRota, tipoLinha, pontoInicial, pontoFinal, fkEmpresa)
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
}

function selectLinha(req, res) {
  var nomeLinha = req.params.codRota;

  linhaModel.selectLinha(nomeLinha)
    .then(
      function (resultado) {
        // console.log(`\nResultados encontrados: ${resultado.length}`);
        // console.log(`Resultados: ${JSON.stringify(resultado)}`); //TRANSFORMA JSON EM STRING

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send("Nome da Linha INVÁLIDO");
        } else {
          res.status(403).send("Mais de uma LINHA com o mesmo NOME");
        }
      }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao selecionar a linha! ERRO: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
}

function kpiMovLinha(req, res) {
  var nomeLinha = req.params.codRota;

  linhaModel.kpiMovLinha(nomeLinha)
    .then(
      function (resultado) {
        // console.log(`\nResultados encontrados: ${resultado.length}`);
        // console.log(`Resultados: ${JSON.stringify(resultado)}`); //TRANSFORMA JSON EM STRING

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send("Nome da Linha INVÁLIDO");
        } else {
          res.status(403).send("Mais de uma LINHA com o mesmo NOME");
        }
      }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao selecionar a linha! ERRO: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
}

function listar(req, res){
  var idEmpresa = req.params.idEmpresa;

  linhaModel.listar(idEmpresa)
  .then(
    function (resultado){
      console.log(`\nResultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`); //TRANSFORMA JSON EM STRING

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send("Nome da Linha INVÁLIDO");
        } else {
          res.status(403).send("Mais de uma LINHA com o mesmo NOME");
        }
      }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao selecionar a linha! ERRO: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
}

function veiculoRota(req, res) {
  var codLinha = req.params.codLinha;

  linhaModel.veiculoRota(codLinha)
    .then(
      function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`); //TRANSFORMA JSON EM STRING

        console.log(resultado);
        res.json(resultado);

      }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao selecionar a linha! ERRO: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
}

function veiculoRota(req, res) {
  var codLinha = req.params.codLinha;

  linhaModel.veiculoRota(codLinha)
    .then(
      function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`); //TRANSFORMA JSON EM STRING

        console.log(resultado);
        res.json(resultado);

      }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao selecionar a linha! ERRO: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
}
module.exports = {
  cadastrarLinha,
  selectLinha,
  kpiMovLinha,
  veiculoRota,
  listar
}
