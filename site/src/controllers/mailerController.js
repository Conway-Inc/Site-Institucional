var mailerModel = require("../models/mailerModel");

var sessoes = [];

function enviarEmail(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var cnpj = req.body.cnpjServer;
    var celular = req.body.celularServer;
    var nomeRep = req.body.nomeRepresentanteServer;
    var cargoRep = req.body.cargoRepresentanteServer;
    var cpf = req.body.cpfServer;

    console.log("Cheguei na controller")
    // Faça as validações dos valores
    if (nome == undefined) {
      res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
      res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
      res.status(400).send("Sua senha está undefined!");
    } else if (cnpj == undefined) {
      res.status(400).send("Seu cnpj está undefined!");
    } else {
      // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
      mailerModel
        .enviarEmail(
          nome,
          email,
          senha,
          cnpj,
          celular,
          nomeRep,
          cargoRep,
          cpf
        )
        .then(function (resultado) {
          console.log("Entrei no then controller")
          res.send("EMAIL ENVIADO");
        })
        .catch(function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao enviar o email! Erro: ",
            erro
          );
          res.status(500).json(erro);
        });
    }
}

function senha(req, res){
    console.log("Controller")
    var email = req.params.email;

    if(email == undefined){
      res.status(400).send("Erro, senha não definida")
    } else{
      console.log("aqui")
      mailerModel.senha(email).then( (resp) => {
        res.send("Email enviado com sucesso");
      }
      );
    }
}

module.exports = {
    enviarEmail,
    senha
}