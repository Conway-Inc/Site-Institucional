var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
  console.log("ENTRAMOS NA usuarioController");
  res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
  usuarioModel
    .listar()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao realizar a consulta! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function entrar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .entrar(email, senha)
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
}

function cadastrarRepresentante(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var cpf = req.body.cpfServer;
  var celular = req.body.celularServer;
  var fotoRepresentante = req.body.fotoRepresentanteServer;
  var fkEmpresa = req.body.fkEmpresaServer;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (cpf == undefined) {
    res.status(400).send("Seu cpf está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrarRepresentante(
        nome,
        email,
        senha,
        cpf,
        celular,
        fotoRepresentante,
        fkEmpresa
      )
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}
function cadastrarEmpresa(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var cnpj = req.body.cnpjServer;
  var nome = req.body.nomeEmpresaServer;
  var foto = req.body.fotoEmpresaServer;

  // Faça as validações dos valores
  // if (nome == undefined) {
  //   res.status(400).send("Seu nome está undefined!");
  // } else if (email == undefined) {
  //   res.status(400).send("Seu email está undefined!");
  // } else if (senha == undefined) {
  //   res.status(400).send("Sua senha está undefined!");
  // } else if (cpf == undefined) {
  //   res.status(400).send("Seu cpf está undefined!");
  // } else {
  // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
  usuarioModel
    .cadastrarEmpresa(cnpj, nome, foto)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}
// }

function capturarIdEmpresa(req, res) {
  var cnpj = req.params.cnpj;

  usuarioModel
    .capturarIdEmpresa(cnpj)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

// Criado para Cadastrar a rota - alterarRotas.html
function cadastrarRotas(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nomeRota = req.body.nomeRotaServer;
  var qtdVeiculo = req.body.qtdVeiculoServer;
  var pontoInicial = req.body.pontoInicialServer;
  var pontoFinal = req.body.pontoFinalServer;

  // Faça as validações dos valores
  if (nomeRota == undefined) {
    res.status(400).send("O nome da Rota está undefined!");
  } else if (qtdVeiculo == undefined) {
    res.status(400).send("A quantidade de veículo está undefined!");
  } else if (pontoInicial == undefined) {
    res.status(400).send("O ponto inicial está undefined!");
  } else if (pontoFinal == undefined) {
    res.status(400).send("O ponto final está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrarRotas(nomeRota, qtdVeiculo, pontoInicial, pontoFinal)
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
  entrar,
  cadastrarRepresentante,
  // acrecimo do cadastrar Rotas
  cadastrarRotas,
  capturarIdEmpresa,
  cadastrarEmpresa,
  listar,
  testar,
};
