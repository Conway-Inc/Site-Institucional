var pontoModel = require("../models/pontoModel");

var sessoes = [];


// Criado para Cadastrar o ponto - menuDashboard.html
function cadastrarPonto(req, res) {
  //
  var cep = req.body.cepServer;
  var logradouro = req.body.logradouroServer;
  var numNaRua = req.body.numServer;
  var grausY = req.body.coordYServer;
  var grausX = req.body.coordXServer;

  // Faça as validações dos valores
  // if (nomeRota == undefined) {
  //   res.status(400).send("O nome da Rota está undefined!");
  // } else if (tipoLinha == undefined) {
  //   res.status(400).send("O tipo da linha está undefined!");
  // } else if (pontoInicial == undefined) {
  //   res.status(400).send("O ponto inicial está undefined!");
  // } else if (pontoFinal == undefined) {
  //   res.status(400).send("O ponto final está undefined!");
  // } else {
    // Passe os valores como parâmetro e vá para o arquivo pontoModel.js
    pontoModel
      .cadastrarPonto(cep, logradouro, numNaRua, grausY, grausX)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro do PONTO! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
// }

module.exports = {
  cadastrarPonto
};
