function cadastrarFuncionario() {
    var nomeFuncVar = ipt_nomeFunc.value;
    var emailFuncVar = ipt_emailFunc.value;
    var senhaFuncVar = ipt_senhaFunc.value;
    var cpfFuncVar = ipt_cpfFunc.value;
    var telFuncVar = ipt_telFunc.value;
    var dataFuncVar = ipt_dataFunc.value;
    var fkEmpresaVar = sessionStorage.FK_EMPRESA;

    if (nomeFuncVar == undefined) {
        alert("O nome está undefined")
    } else if (emailFuncVar == undefined) {
        alert("O e-mail está undefined")
    } else if (senhaFuncVar == undefined) {
        alert("A senha está undefined")
    } else if (cpfFuncVar == undefined) {
        alert("O CPF está undefined")
    } else if (telFuncVar == undefined) {
        alert("O telefone está undefined")
    } else if (dataFuncVar == undefined) {
        alert("A data está undefined")
    } else if (fkEmpresaVar == undefined){
        alert("A FkEmpresa está undefined")
    }

    fetch(`/funcionario/cadastrarFuncionario`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeFuncVarServer: nomeFuncVar,
            emailFuncVarServer: emailFuncVar,
            senhaFuncVarServer: senhaFuncVar,
            cpfFuncVarServer: cpfFuncVar,
            telFuncVarServer: telFuncVar,
            dataFuncVarServer: dataFuncVar,
            fkEmpresaServer: fkEmpresaVar
        })
    }).then(function (resposta) {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
            cardMsg.style.display = "block"
            cardMsg.style.border = "2px solid greenyellow"
            cardMsg.style.boxShadow = "0px 0px 12px black"
            cardMsg.style.color = "greenyellow"
            cardMsg.innerHTML = "✅Cadastro realizado com sucesso!✅";
            setTimeout(function () {
                cardMsg.style.display = "none";
            }, 3000);
        } else {
            cardMsg.style.display = "block"
            cardMsg.style.border = "2px solid red"
            cardMsg.style.color = "red"
            cardMsg.innerHTML = "❌Erro ao cadastrar totem! Tente novamente...❌";
            setTimeout(function () {
                cardMsg.style.display = "none";
            }, 3000);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`)
    });
    return false
}
function exibirInfosFunc(){
    var tituloNome = document.getElementById("tituloNomeFunc");
        tituloNome.innerHTML = sessionStorage.NOME_FUNCIONARIO
    var infosNome = document.getElementById("ipt_nomeFunc")
        infosNome.value = sessionStorage.NOME_FUNCIONARIO
    var infosEmail = document.getElementById("ipt_emailFunc")
        infosEmail.value = sessionStorage.EMAIL_FUNCIONARIO
    var infosCpf = document.getElementById("ipt_cpfFunc")
        infosCpf.value = sessionStorage.CPF
    var infosTelefone = document.getElementById("ipt_telefoneFunc")
        infosTelefone.value = sessionStorage.TELEFONE_FUNCIONARIO
    
    var infosCargo = document.getElementById("ipt_cargoFunc")
    if (sessionStorage.GERENTE_FUNCIONARIO == "null") {
            infosCargo.value = "ADMIN"
        } else if (sessionStorage.GERENTE_FUNCIONARIO == sessionStorage.ID_FUNCIONARIO) {
            infosCargo.value = "Gerente"
        } else{
            infosCargo.value = "Mão de obra"
        }


    var acessoEmail = document.getElementById("ipt_loginFunc")
        acessoEmail.value = sessionStorage.EMAIL_FUNCIONARIO
    var acessoSenha = document.getElementById("ipt_senhaFunc")
        acessoSenha.value = sessionStorage.SENHA_FUNCIONARIO
    }
    function exibirInfosEmpresa(fkEmpresaVar){
        var fkEmpresaVar = sessionStorage.FK_EMPRESA
    
        fetch(`/empresa/exibirInfosEmpresa/${fkEmpresaVar}`)
            .then(function (resposta) {
                console.log("ESTOU NO THEN DO exibirInfosEmpresa()!");
                if (resposta.ok) {
                    console.log(resposta);
                    resposta.json().then(json => {
                        console.log(json);
                        var infosCnpjEmpresa = document.getElementById("ipt_cnpjEmpresa")
                        infosCnpjEmpresa.value = json[0].cnpj
                    });
                } else {
                    resposta.text().then(texto => {
                        console.error(texto);
                    });
                }
            }).catch(function (erro) {
                console.log(erro);
            });
        return false;
        
}