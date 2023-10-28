var temErro = false;

function cadastrarFuncionario() {
    const retorno = eliminarMascaras();

    var nomeFuncVar = ipt_nomeFunc.value;
    var cpfFuncVar = retorno.cpfFormatado;
    var telFuncVar = retorno.telefoneFormatado;
    var dataFuncVar = ipt_dataFunc.value;
    var emailFuncVar = ipt_emailFunc.value;
    var cargoFuncVar = select_cargo.value;
    var senhaFuncVar = ipt_senhaFunc.value;
    var idFuncionarioVar = sessionStorage.ID_FUNCIONARIO;
    var fkEmpresaVar = sessionStorage.FK_EMPRESA;

    if (cargoFuncVar == "Analista") {
        cargoFuncVar = idFuncionarioVar
    }
    else {
        cargoFuncVar = 1;
    }

    validar()

    if (!temErro) {


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
                cardMsg.style.border = "2px solid #00B802"
                cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
                cardMsg.style.color = "#00B802"
                cardMsg.innerHTML = "Conta cadastrada com sucesso!";
                setTimeout(function () {
                    cardMsg.style.display = "none";
                }, 3000);

                linhaFuncionario.innerHTML = ``
                exibirFuncionarios();

            } else {
                cardMsg.style.display = "block"
                cardMsg.style.border = "2px solid red"
                cardMsg.style.color = "red"
                cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
                cardMsg.innerHTML = "❌Conta não cadastrada❌";
                setTimeout(function () {
                    cardMsg.style.display = "none";
                }, 3000);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`)
        });
        return false
    }
    else {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
        cardMsg.innerHTML = "❌Corrija os erros para prosseguir❌";
        setTimeout(function () {
            cardMsg.style.display = "none";
        }, 3000);
    }
}

function exibirInfosFunc() {
    
    // Deixar exibir o seu nome em todas as páginas

    var infosNomeNavBar = document.getElementById("navbarNome")
    infosNomeNavBar.innerHTML = sessionStorage.NOME_FUNCIONARIO
    
    var tituloNome = document.getElementById("tituloNomeFunc");
    tituloNome.innerHTML = sessionStorage.NOME_FUNCIONARIO
    var infosNome = document.getElementById("ipt_nomeFunc")
    infosNome.value = sessionStorage.NOME_FUNCIONARIO
    var infosEmail = document.getElementById("ipt_emailFunc")
    infosEmail.value = sessionStorage.EMAIL_FUNCIONARIO
    var infosCpf = document.getElementById("ipt_cpfFunc")
    infosCpf.value = sessionStorage.CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    var infosTelefone = document.getElementById("ipt_telefoneFunc")
    infosTelefone.value = sessionStorage.TELEFONE_FUNCIONARIO.replace(/^(\d{2})(\d)/g, "($1) $2");
    infosTelefone.value = infosTelefone.value.replace(/(\d)(\d{4})$/, "$1-$2");
    var dataNasc = document.getElementById("ipt_dataFunc")
    dataNasc.type = "text"
    dataNasc.value = sessionStorage.DATA_NASCIMENTO;

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
            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);

                    for (let i = 0; i < json.length; i++) {
                        var lista = document.getElementById("funcionariosTabela");
                        var publicacao = json[i];

                        var telefone = publicacao.telefone.replace(/^(\d{2})(\d)/g, "($1) $2");
                        telefone = telefone.replace(/(\d)(\d{4})$/, "$1-$2");

                        var cpf = json[i].cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

                        // Formatação de data 
                        const dataNascimento = json[i].dataNascimento
                        const dataNasc = new Date(dataNascimento)
                        const dataFormatada = dataNasc.toLocaleDateString('pt-BR', {
                            timeZone: 'UTC',
                        });

                        var cargo = publicacao.fkGerente

                        if (cargo == "null") {
                            cargo = "Admin"
                        } else if (cargo == 1) {
                            cargo = "Gerente"
                        } else {
                            cargo = "Analista"
                        }

                        var tdNome = document.createElement("td");
                        tdNome.setAttribute("scope", "row");
                        tdNome.innerHTML = publicacao.nome;
                        var tdCargo = document.createElement("td");
                        tdCargo.innerHTML = cargo;
                        var tdTelefone = document.createElement("td");
                        tdTelefone.innerHTML = telefone;
                        var tdCpf = document.createElement("td");
                        tdCpf.innerHTML = cpf;
                        var tdAnos = document.createElement("td");
                        tdAnos.innerHTML = `${calcularIdade(dataFormatada)} anos`;
                        var tdEmail = document.createElement("td");
                        tdEmail.innerHTML = publicacao.email;


                        var tr = document.createElement("tr");
                        var tbody = document.getElementById("tbodyTable");

                        tr.appendChild(tdNome);
                        tr.appendChild(tdCargo);
                        tr.appendChild(tdTelefone);
                        tr.appendChild(tdCpf);
                        tr.appendChild(tdAnos);
                        tr.appendChild(tdEmail);
                        tbody.appendChild(tr);
                        lista.appendChild(tbody);
                    }
                    $(document).ready(function () {
                        $('#dataTable').DataTable();
                    });
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


function eliminarMascaras() {
    var cpfFormatado;
    var telefoneFormatado;

    var cpfMascarado = ipt_cpfFunc.value
    var telefoneMascarado = ipt_telefoneFunc.value

    // Retirando a máscara do CPF

    cpfFormatado = cpfMascarado.replaceAll("-", "")
    cpfFormatado = cpfFormatado.replaceAll(".", "")

    // Retirando a máscara do telefone

    telefoneFormatado = telefoneMascarado.replaceAll("-", "")
    telefoneFormatado = telefoneFormatado.replaceAll("(", "")
    telefoneFormatado = telefoneFormatado.replaceAll(")", "")

    return { cpfFormatado, telefoneFormatado }
}

function eliminarNumeros(id) {
    const input = document.getElementById(id)
    var listaLetras = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    for (var i = 0; i <= 9; i++) {
        if (input.value[input.value.length - 1] == Number(listaLetras[i]) && input.value[input.value.length - 1] != ' ') {
            cardMsg.style.display = "block"
            cardMsg.style.border = "2px solid red"
            cardMsg.style.color = "red"
            cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
            cardMsg.innerHTML = "❌Este campo não pode ter Números❌";
            setTimeout(function () {
                cardMsg.style.display = "none";
            }, 3000);
            input.value = ''
        }
    }
    for (var letra = 0; letra <= input.value.length - 1; letra++) {
        if (isNaN(input.value[letra]) == false && input.value[letra] != ' ') {
            cardMsg.style.display = "block"
            cardMsg.style.border = "2px solid red"
            cardMsg.style.color = "red"
            cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
            cardMsg.innerHTML = "❌Este campo não pode ter Números❌";
            setTimeout(function () {
                cardMsg.style.display = "none";
            }, 3000);
            input.value = ''
        }
    }
}

function eliminarLetras(id) {
    const input = document.getElementById(id)
    var listaLetras = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@;,?|{}[]~^'

    for (var i = 0; i <= 62; i++) {
        if (input.value[input.value.length - 1] == listaLetras[i]) {
            cardMsg.style.display = "block"
            cardMsg.style.border = "2px solid red"
            cardMsg.style.color = "red"
            cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
            cardMsg.innerHTML = "❌Este campo não pode ter letras❌";
            setTimeout(function () {
                cardMsg.style.display = "none";
            }, 3000);
            input.value = ''
        }
        for (var letra = 0; letra <= input.value.length - 1; letra++) {
            if (input.value[letra] == listaLetras[i]) {
                cardMsg.style.display = "block"
                cardMsg.style.border = "2px solid red"
                cardMsg.style.color = "red"
                cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
                cardMsg.innerHTML = "❌Este campo não pode ter letras❌";
                setTimeout(function () {
                    cardMsg.style.display = "none";
                }, 3000);
                input.value = ''
            }
        }
    }

}

function mascaraCPF() {
    var tamanhoCpf = ipt_cpfFunc.value.length

    if (tamanhoCpf == 3) {
        ipt_cpfFunc.value += "."
    }
    if (tamanhoCpf == 7) {
        ipt_cpfFunc.value += "."
    }
    if (tamanhoCpf == 11) {
        ipt_cpfFunc.value += "-"
    }
}


function mascaraTelefone() {
    var tamanhoTelefone = ipt_telefoneFunc.value.length

    if (tamanhoTelefone == 0) {
        ipt_telefoneFunc.value += "("
    }
    if (tamanhoTelefone == 3) {
        ipt_telefoneFunc.value += ")"
    }
    if (tamanhoTelefone == 9) {
        ipt_telefoneFunc.value += "-"
    }
}

function validar() {
    var nomeFunc = ipt_nomeFunc.value
    var cpfFunc = ipt_cpfFunc.value
    var telefoneFunc = ipt_telefoneFunc.value
    var dataFunc = ipt_dataFunc.value
    var emailFunc = ipt_emailFunc.value
    var cargoFunc = select_cargo.value
    var loginFunc = ipt_loginFunc.value
    var senhaFunc = ipt_senhaFunc.value
    var repetirSenhaFunc = ipt_repetirSenhaFunc.value

    if (nomeFunc == "") {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
        cardMsg.innerHTML = "❌O Nome não pode ser vazio❌";
        temErro = true;
        setTimeout(function () {
            cardMsg.style.display = "none";
        }, 3000);
    }
    else if (cpfFunc == "") {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
        cardMsg.innerHTML = "❌O CPF não pode ser vazio❌";
        temErro = true;
        setTimeout(function () {
            cardMsg.style.display = "none";
        }, 3000);
    }
    else if (cpfFunc.length < 14) {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
        cardMsg.innerHTML = "❌Insira um CPF válido❌";
        temErro = true;
        setTimeout(function () {
            cardMsg.style.display = "none";
        }, 3000);
    }
    else if (telefoneFunc == "") {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
        cardMsg.innerHTML = "❌O telefone não pode ser vazio❌";
        temErro = true;
        setTimeout(function () {
            cardMsg.style.display = "none";
        }, 3000);
    }
    else if (telefoneFunc.length < 14) {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
        cardMsg.innerHTML = "❌Insira um telefone válido❌";
        temErro = true;
        setTimeout(function () {
            cardMsg.style.display = "none";
        }, 3000);
    }
    else if (dataFunc == "") {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
        cardMsg.innerHTML = "❌A data de nascimento não pode ser vazio❌";
        temErro = true;
        setTimeout(function () {
            cardMsg.style.display = "none";
        }, 3000);
    }
    else if (emailFunc == "") {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
        cardMsg.innerHTML = "❌O email não pode ser vazio❌";
        temErro = true;
        setTimeout(function () {
            cardMsg.style.display = "none";
        }, 3000);
    }
    else if (emailFunc.indexOf('@') == -1) {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
        cardMsg.innerHTML = "❌Insira um e-mail válido❌";
        temErro = true;
        setTimeout(function () {
            cardMsg.style.display = "none";
        }, 3000);
    }
    else if (cargoFunc == "") {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
        cardMsg.innerHTML = "❌O cargo não pode ser vazio❌";
        temErro = true;
        setTimeout(function () {
            cardMsg.style.display = "none";
        }, 3000);
    }
    else if (loginFunc == "") {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
        cardMsg.innerHTML = "❌O email não pode ser vazio❌";
        temErro = true;
        setTimeout(function () {
            cardMsg.style.display = "none";
        }, 3000);
    }
    else if (senhaFunc == "") {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
        cardMsg.innerHTML = "❌A senha não pode ser vazia❌";
        temErro = true;
        setTimeout(function () {
            cardMsg.style.display = "none";
        }, 3000);
    }
    else if (repetirSenhaFunc == "") {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
        cardMsg.innerHTML = "❌O repetir senha não pode ser vazio❌";
        temErro = true;
        setTimeout(function () {
            cardMsg.style.display = "none";
        }, 3000);
    }

    else if (telefoneFunc.length < 14) {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
        cardMsg.innerHTML = "❌Insira um telefone válido❌";
        temErro = true;
        setTimeout(function () {
            cardMsg.style.display = "none";
        }, 3000);
    }
    else if (nomeFunc.length < 2) {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
        cardMsg.innerHTML = "❌Insira um nome válido❌";
        temErro = true;
        setTimeout(function () {
            cardMsg.style.display = "none";
        }, 3000);
    }

    else if (emailFunc.length < 2) {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.7)"
        cardMsg.innerHTML = "❌Insira um CPF válid❌";
        temErro = true;
        setTimeout(function () {
            cardMsg.style.display = "none";
        }, 3000);
    }

}
