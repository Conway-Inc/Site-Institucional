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

module.exports = {
  cadastrarLinha
};
