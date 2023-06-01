var linhaPontoModel = require("../models/linhaPontoModel");

var sessoes = [];


// Criado para Cadastrar a rota - alterarRotas.html
function cadastrarLinhaPonto(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var idLinha = req.body.idLinhaServer;
  var idPonto = req.body.idPontoServer;

    // Passe os valores como parâmetro e vá para o arquivo linhaPontoModel.js
    linhaPontoModel
      .cadastrarLinhaPonto(idLinha, idPonto)
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

function selectLinha(req, res){
  var nomeLinha = req.body.nomeRotaServer;

  linhaPontoModel.selectLinha(nomeLinha)
  .then(
    function (resultado){
      console.log(`\nResultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`); //TRANSFORMA JSON EM STRING

      if(resultado.length == 1){
        console.log(resultado);
        res.json(resultado[0]);
      } else if(resultado.length == 0){
        res.status(403).send("Nome da Linha INVÁLIDO");
      } else{
        res.status(403).send("Mais de uma LINHA com o mesmo NOME");
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

function listarLinhaPonto(req, res){
  var fkLinha = req.body.fkLinhaServer;

  linhaPontoModel
      .listarLinhaPonto(fkLinha)
      .then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
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

module.exports = {
  cadastrarLinhaPonto,
  selectLinha,
  listarLinhaPonto
};
