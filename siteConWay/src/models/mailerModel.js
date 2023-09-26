var nodemailer = require('nodemailer');
var database = require("../database/config");


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'conway.sptech@gmail.com',
      pass: 'mipjexlgaukookth'
    }
  });


function enviarEmail(nome,
    email,
    senha,
    cnpj,
    celular,
    nomeRep,
    cargoRep,
    cpf) {
    console.log("Coletando os dados do e-mail");
    
    var mailOptions = {
        from: 'conway.sptech@gmail.com',
        to: 'conway.sptech@gmail.com',
        subject: 'Requisição de Cadastro',
        text: `Olá, sou da empresa ${nome}, meu nome é ${nomeRep}, sou ${cargoRep} e gostaria de criar uma conta no seu sistema
        CNPJ: ${cnpj}   
        CELULAR: ${celular}   
        EMAIL: ${email}   
        SENHA: ${senha}    

        Obrigado!!
        `
      };
      
      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                reject(error);
            } else {
                resolve('Email enviado com sucesso: ' + info.response);
            }
          });
      })


}

function senha(email) {
  console.log("Coletando os dados do e-mail");
  
  comando = `SELECT senhaFunc FROM Funcionario WHERE emailFunc = '${email}'`
  vSenha = "";
  return database.executar(comando).then((res) => {
    console.log(res)
    var mailOptions = {
      from: 'conway.sptech@gmail.com',
      to: email,
      subject: 'Recuperação de senha',
      text: `Sua senha ${res[0].senhaFunc} 

      Obrigado!!
      `
    };
    
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              reject(error);
          } else {
              resolve('Email enviado com sucesso: ' + info.response);
          }
        });
    })
  })

 


}

module.exports = {
    enviarEmail,
    senha
}
  