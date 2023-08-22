var nodemailer = require('nodemailer');
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
    fotoRepresentante,
    mensagem) {
    console.log("Coletando os dados do e-mail");
    
    var mailOptions = {
        from: 'conway.sptech@gmail.com',
        to: 'conway.sptech@gmail.com',
        subject: 'Requisição de Cadastro',
        text: `Olá, sou da empresa ${nome} e gostaria de criar uma conta no seu sistema
        CNPJ: ${cnpj}   
        CELULAR: ${celular}   
        EMAIL: ${email}   
        SENHA: ${senha}    
        Mensagem: ${mensagem}
        Minha foto consta abaixo:
        ${fotoRepresentante}`
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

module.exports = {
    enviarEmail
}
  