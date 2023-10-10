const { json } = require("express");

function cadastrarFuncionario() {
    var nomeFuncVar = ipt_nomeFunc.value;
    var cpfFuncVar = ipt_cpfFunc.value;
    var telFuncVar = ipt_telefoneFunc.value;
    var dataFuncVar = ipt_dataFunc.value;
    var emailFuncVar = ipt_emailFunc.value;
    var cargoFuncVar = select_cargo.value;
    var senhaFuncVar = ipt_senhaFunc.value;
    var idFuncionarioVar = sessionStorage.ID_FUNCIONARIO;
    var fkEmpresaVar = sessionStorage.FK_EMPRESA;

    alert(cargoFuncVar)

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
    } else if (fkEmpresaVar == undefined) {
        alert("A FkEmpresa está undefined")
    } else if (cargoFuncVar == undefined) {
        alert("O cargo do funcionário está como undefined")
    } else if (idFuncionarioVar == undefined) {
        alert("O idFuncionário está como undefined")
    }

    // validar()

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
            cargoFuncVarServer: cargoFuncVar,
            idFuncionarioVarServer: idFuncionarioVar,
            fkEmpresaServer: fkEmpresaVar
        })
    }).then(function (resposta) {
        // console.log("resposta: ", resposta);
        if (resposta.ok) {
            cardMsg.style.display = "block"
            cardMsg.style.border = "2px solid greenyellow"
            cardMsg.style.boxShadow = "0px 0px 12px black"
            cardMsg.style.color = "greenyellow"
            cardMsg.innerHTML = "✅Cadastro realizado com sucesso!✅";
            setTimeout(function () {
                cardMsg.style.display = "none";
            }, 3000);

            linhaFuncionario.innerHTML = ``
            exibirFuncionarios();

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

function exibirInfosFunc() {
    var infosNomeNavBar = document.getElementById("navbarNome")
    infosNomeNavBar.innerHTML = sessionStorage.NOME_FUNCIONARIO
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
    } else if (sessionStorage.GERENTE_FUNCIONARIO == 1) {
        infosCargo.value = "Gerente"
    } else {
        infosCargo.value = "Analista"
    }


    var acessoEmail = document.getElementById("ipt_loginFunc")
    acessoEmail.value = sessionStorage.EMAIL_FUNCIONARIO
    var acessoSenha = document.getElementById("ipt_senhaFunc")
    acessoSenha.value = sessionStorage.SENHA_FUNCIONARIO
}

var cnpjEmpresa;

function exibirInfosEmpresa(fkEmpresaVar) {
    var fkEmpresaVar = sessionStorage.FK_EMPRESA
    ipt_telefoneEmpresa.value = sessionStorage.TELEFONE_EMPRESA;

    fetch(`/empresa/exibirInfosEmpresa/${fkEmpresaVar}`)
        .then(function (resposta) {
            // console.log("ESTOU NO THEN DO exibirInfosEmpresa()!");
            if (resposta.ok) {
                // console.log(resposta);
                resposta.json().then(json => {
                    // console.log(json);
                    cnpjEmpresa = json[0].cnpj
                    var infosCnpjEmpresa = document.getElementById("ipt_cnpjEmpresa")
                    infosCnpjEmpresa.value = json[0].cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")

                    var infosTelefoneEmpresa = document.getElementById("ipt_telefoneEmpresa")
                    infosTelefoneEmpresa.value = json[0].telefone.replace(/^(\d{2})(\d)/g, "($1) $2");
                    infosTelefoneEmpresa.value = infosTelefoneEmpresa.value.replace(/(\d)(\d{4})$/, "$1-$2");

                    obterInfosEmpresa()

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

function obterInfosEmpresa() {

    fetch(`https://publica.cnpj.ws/cnpj/${cnpjEmpresa}`)
        .then(data => {
            return data.json();
        })
        .then(post => {

            dadosCNPJ = post;

            // console.log(dadosCNPJ)

            ipt_razaoSocialEmpresa.value = dadosCNPJ.razao_social;;
            ipt_logradouroEmpresa.value = `${dadosCNPJ.estabelecimento.tipo_logradouro} ${dadosCNPJ.estabelecimento.logradouro}`;
            ipt_numeroEmpresa.value = dadosCNPJ.estabelecimento.numero;
            ipt_cepEmpresa.value = dadosCNPJ.estabelecimento.cep;

        })
        .catch(error => {
            ipt_razaoSocialEmpresa.value = "Empresa não encontrada"
            ipt_logradouroEmpresa.value = "Empresa não encontrada"
            ipt_numeroEmpresa.value = "Empresa não encontrada"
            ipt_cepEmpresa.value = "Empresa não encontrada"

            console.log("CNPJ não localizado na base de dados!")
        })

}

function desativarInputsEmpresa() {
    ipt_cnpjEmpresa.value = sessionStorage.CNPJ_EMPRESA;
    ipt_cnpjEmpresa.setAttribute('disabled', '');
    ipt_razaoSocialEmpresa.setAttribute('disabled', '');
    ipt_cepEmpresa.setAttribute('disabled', '');
    ipt_logradouroEmpresa.setAttribute('disabled', '');
    ipt_numeroEmpresa.setAttribute('disabled', '');
    ipt_telefoneEmpresa.setAttribute('disabled', '');
}

function disableInputs() {
    ipt_cnpjEmpresa.value = sessionStorage.CNPJ_EMPRESA;
    ipt_cnpjEmpresa.setAttribute('disabled', '');
    ipt_razaoSocialEmpresa.setAttribute('disabled', '');
    ipt_cepEmpresa.setAttribute('disabled', '');
    ipt_logradouroEmpresa.setAttribute('disabled', '');
    ipt_numeroEmpresa.setAttribute('disabled', '');
    ipt_telefoneEmpresa.setAttribute('disabled', '');
    ipt_nomeFunc.setAttribute('disabled', '');
    ipt_cpfFunc.setAttribute('disabled', '');
    ipt_telefoneFunc.setAttribute('disabled', '');
    ipt_dataFunc.setAttribute('disabled', '');
    ipt_emailFunc.setAttribute('disabled', '');
    ipt_cargoFunc.setAttribute('disabled', '');
    ipt_loginFunc.setAttribute('disabled', '');
    ipt_senhaFunc.setAttribute('disabled', '');
}

function enableInputs() {
    ipt_nomeFunc.removeAttribute('disabled');
    ipt_cpfFunc.removeAttribute('disabled');
    ipt_telefoneFunc.removeAttribute('disabled');
    ipt_dataFunc.removeAttribute('disabled');
    ipt_loginFunc.removeAttribute('disabled');
    ipt_senhaFunc.removeAttribute('disabled');

}

function obterLogin() {
    ipt_loginFunc.value = ipt_emailFunc.value
}

function trocarBotaoPerfil() {
    var btn = document.getElementById("botao-cadastrar")
    const initialText = "Alterar Informações de entrada"

    if (btn.textContent == initialText) {
        btn.innerHTML = "Salvar informações"
        enableInputs()
    } else {
        btn.innerHTML = initialText
        btn.onclick = atualizarInformacoes()
    }
}

function atualizarInformacoes() {
    var nomeFuncVar = ipt_nomeFunc.value;
    var emailFuncVar = ipt_loginFunc.value;
    var senhaFuncVar = ipt_senhaFunc.value;
    var cpfFuncVar = ipt_cpfFunc.value;
    var telFuncVar = ipt_telefoneFunc.value;
    var dataFuncVar = ipt_dataFunc.value
    var idFuncionarioVar = sessionStorage.ID_FUNCIONARIO;

    if (dataFuncVar == '') {
        dataFuncVar = 'NULL'
    }

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
    } else if (idFuncionarioVar == undefined) {
        alert("O id do funcionário está undefined")
    } else {
        fetch(`/funcionario/atualizarFuncionario`, {
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
                idFuncionarioServer: idFuncionarioVar
            })
        }).then(function (resposta) {
            // console.log("resposta: ", resposta);
            if (resposta.ok) {
                sessionStorage.NOME_FUNCIONARIO = nomeFuncVar
                sessionStorage.EMAIL_FUNCIONARIO = emailFuncVar
                sessionStorage.SENHA_FUNCIONARIO = senhaFuncVar
                sessionStorage.CPF = cpfFuncVar
                sessionStorage.TELEFONE_FUNCIONARIO = telFuncVar
                location.reload();
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`)
        });

    }

    return false

}

function exibirFuncionarios(fkEmpresaVar) {
    var fkEmpresaVar = sessionStorage.FK_EMPRESA

    fetch(`/empresa/exibirFuncionarios/${fkEmpresaVar}`)
        .then(function (resposta) {
            // console.log("ESTOU NO THEN DO exibirFuncionarios()!");
            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);

                    for (let i = 0; i < json.length; i++) {
                        var telefone = json[i].telefone.replace(/^(\d{2})(\d)/g, "($1) $2");
                        telefone = telefone.replace(/(\d)(\d{4})$/, "$1-$2");

                        var cpf = json[i].cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

                        // Formatação de data 
                        const anoAtual = new Date().getFullYear
                        const dataNascimento = json[i].dataNascimento
                        const dataNasc = new Date(dataNascimento)
                        const dataFormatada = dataNasc.toLocaleDateString('pt-BR', {
                            timeZone: 'UTC',
                        });

                        var cargo = json[i].fkGerente

                        if (cargo == "null") {
                            cargo = "Admin"
                        } else if (cargo == 1) {
                            cargo = "Gerente"
                        } else {
                            cargo = "Analista"
                        }


                        linhaFuncionario.innerHTML += `
                            <tr class="odd">
                                <td class="sorting_1">${json[i].nome}</td>
                                <td>${cargo}</td>
                                <td>${telefone}</td>
                                <td>${cpf}</td>
                                <td>${`${calcularIdade(dataFormatada)} anos`}</td>
                                <td>${json[i].email}</td>
                            </tr>`
                    }
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

function calcularIdade(dataFormatada) {

    // Criando um Objeto com a data atual usando o Date, nativo do JavaScript
    var dataAtual = new Date();

    // Método que retorna o ano apenas da data atual
    var anoAtual = dataAtual.getFullYear();

    // Aqui ele usa o split para dividir uma String e transforma-la em um Array, neste caso utilizado quando estiver uma barra
    var anoNascParts = dataFormatada.split('/');

    // Aqui ele pega a String que é a dataFormatada e retira dela apenas o dia
    var diaNasc = anoNascParts[0];

    // Aqui ele pega a String que é a dataFormatada e retira dela apenas o mes
    var mesNasc = anoNascParts[1];

    // Aqui ele pega a String que é a dataFormatada e retira dela apenas o ano
    var anoNasc = anoNascParts[2];

    // Calculando a idade
    var idade = anoAtual - anoNasc;

    // Pegando o mes atual para futuras atualizações
    var mesAtual = dataAtual.getMonth() + 1;

    // Validações para checar se a pessoa já fez aniversário, sendo que se o mes atual 
    // for menor que o mês de Nascimento ele reduz um em sua idade

    if (mesAtual < mesNasc) {
        idade--;
    }
    else {
        // Validação pra ver se ele está no mês de seu nascimento, caso sim, 
        // vai fazer outra validação caso ele tenha feito aniversário, caso não ele já fez

        if (mesAtual == mesNasc) {
            if (new Date().getDate() < diaNasc) {
                // Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversário
                idade--;
            }
        }
    }

    return idade;
}
