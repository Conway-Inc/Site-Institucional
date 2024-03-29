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

function buscarCompProblematico(req, res) {

  graficoKauanModel.buscarCompProblematico().then(function (resultado) {
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

function buscarMaiorRegistro(req, res) {

  graficoKauanModel.buscarMaiorRegistro().then(function (resultado) {
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

function plotarGrafico(req, res) {
  var id = req.params.id

  if (id == undefined) {
    res.status(400).send("O id do totem está undefined")
  } else {
    graficoKauanModel.plotarGrafico(id)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log("\nHouve um erro ao plotar o Gráfico!Erro: ",
            erro.sqlMessage
          );
          res.status(500).send(erro.sqlMessage);
        }
      )
  }
};

function buscarRegistroUltimoDia(req, res) {
  var id = req.params.id

  if (id == undefined) {
    res.status(400).send("O id do totem está undefined")
  } else {
    graficoKauanModel.buscarRegistroUltimoDia(id)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log("\nHouve um erro ao plotar o Gráfico!Erro: ",
            erro.sqlMessage
          );
          res.status(500).send(erro.sqlMessage);
        }
      )
  }
}

function atualizarGrafico(req, res) {
  var idTotem = req.params.idTotem;

  if (idTotem == undefined) {
    res.status(400).send("O idTotem está undefined")
  } else {
    graficoKauanModel.atualizarGráfico(idTotem).then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }
}

module.exports = {
  buscarTotens,
  buscarCompProblematico,
  buscarMaiorRegistro,
  plotarGrafico,
  buscarRegistroUltimoDia,
  atualizarGrafico
};