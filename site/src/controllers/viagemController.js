var viagemModel = require("../models/viagemModel");

function horariosPorRota(req, res){
  var codLinha = req.params.codLinha;

  viagemModel.horariosPorRota(codLinha)
  .then(
    function (resultado){
      console.log(`\nResultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`); //TRANSFORMA JSON EM STRING
      res.json(resultado);
      if(resultado.length == 0){
        res.status(403).send("Nome da Linha INVÁLIDO");
      }
    }
  ).catch(
    function (erro){
      console.log(erro);
      console.log("\nHouve um erro ao selecionar a linha! ERRO: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    }
  );
}

function mediaPassageirosPorHorario(req, res){
  var codLinha = req.params.codLinha;

  viagemModel.mediaPassageirosPorHorario(codLinha)
  .then(
    function (resultado){
      console.log(`\nResultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`); //TRANSFORMA JSON EM STRING
      res.json(resultado);
      if(resultado.length == 0){
        res.status(403).send("Nome da Linha INVÁLIDO");
      }
    }
  ).catch(
    function (erro){
      console.log(erro);
      console.log("\nHouve um erro ao selecionar a linha! ERRO: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    }
  );
}

function fluxoViagens(req, res){
    var codLinha = req.params.codLinha;
  
    viagemModel.fluxoViagens(codLinha)
    .then(
      function (resultado){
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`); //TRANSFORMA JSON EM STRING
        res.json(resultado);
        if(resultado.length == 0){
          res.status(403).send("Nome da Linha INVÁLIDO");
        }
      }
    ).catch(
      function (erro){
        console.log(erro);
        console.log("\nHouve um erro ao selecionar a linha! ERRO: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
}

module.exports = {
    horariosPorRota,
    mediaPassageirosPorHorario,
    fluxoViagens
};
  