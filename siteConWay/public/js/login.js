function validar_entrada() {

    const ax_email = ipt_email.value;
    const ax_senha = ipt_senha.value;

    var correcao_email01 = ax_email == "";
    var correcao_email02 = ax_email.indexOf('@') <= -1;
    var correcao_senha = ax_senha == "";

    if (correcao_email01) {
      alert("Favor inserir o e-mail correspondente a sua conta.")
    } else if (correcao_email02) {
      alert("Favor inserir o e-mail corretamente.")
    } else if (correcao_senha) {
      alert("Insira sua senha para ter acesso a sua conta.")
    } else {
      entrar()
    }
  }

  function entrar() {
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emailServer: emailVar,
        senhaServer: senhaVar
      })
    }).then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!");

      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then(json => {
          cardMsg.style.display = "block"
          cardMsg.style.border = "2px solid greenyellow"
          cardMsg.style.boxShadow = "0px 0px 12px black"
          cardMsg.style.color = "greenyellow"
          cardMsg.innerHTML = "✅Entrando! Aguarde...✅";

          sessionStorage.EMAIL_FUNCIONARIO = json.emailFunc;
          sessionStorage.NOME_FUNCIONARIO = json.nomeFunc;
          sessionStorage.CPF = json.cpfFunc;
          sessionStorage.ID_FUNCIONARIO = json.idFuncionario;
          sessionStorage.SENHA_FUNCIONARIO = json.senhaFunc;
          sessionStorage.FK_EMPRESA = json.idEmpresa;
          sessionStorage.NOME_EMPRESA = json.nomeEmpr;
          sessionStorage.RAMO_EMPRESA = json.ramoEmpr;
          sessionStorage.GERENTE_FUNCIONARIO = json.fkGerente;


          if (sessionStorage.GERENTE_FUNCIONARIO == 'null') {
            setTimeout(function () {
              window.location = "./cadastroInterno.htmlhtml";
            }, 2000);
          } else {
            if (sessionStorage.RAMO_EMPRESA == "Tranporte de Onibus") {
              setTimeout(function () {
                window.location = "./busway/dashboardGeral.html";
              }, 2000);
            } else if (sessionStorage.RAMO_EMPRESA == "Transporte Aéreo") {
              setTimeout(function () {
                window.location = "./airway/index.html";
              }, 2000);
            }
          }
        });
      } else {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.innerHTML = "❌Conta não cadastrada❌";

        resposta.text().then(texto => {
          console.error(texto);
        });

      }
    }).catch(function (erro) {
      console.log(erro);
    });

    return false;
  }