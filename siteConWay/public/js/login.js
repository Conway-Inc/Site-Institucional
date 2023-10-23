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

    fetch("/login/entrar", {
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
          cardMsg.style.border = "2px solid #00B802"
          cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
          cardMsg.style.color = "#00B802"
          cardMsg.innerHTML = "✅Entrando! Aguarde...✅";

          sessionStorage.ID_FUNCIONARIO = json.idFuncionario;
          sessionStorage.EMAIL_FUNCIONARIO = json.email;
          sessionStorage.SENHA_FUNCIONARIO = json.senha;
          sessionStorage.NOME_FUNCIONARIO = json.nomeFuncionario;
          sessionStorage.CPF = json.cpf;
          sessionStorage.FK_EMPRESA = json.idEmpresa;
          sessionStorage.NOME_EMPRESA = json.nomeEmpresa;
          sessionStorage.RAMO_EMPRESA = json.ramo;
          sessionStorage.GERENTE_FUNCIONARIO = json.fkGerente;

          if (sessionStorage.RAMO_EMPRESA == '1') {
            setTimeout(function () {
              window.location = "../busway/index.html";
            }, 2000);
          } else {
            setTimeout(function () {
              window.location = "../airway/graficoJoao.html";
            }, 2000);
          }
        });
      } else {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
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