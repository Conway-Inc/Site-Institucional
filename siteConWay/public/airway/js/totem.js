const select = document.querySelector("select");
const valorPadrao = select.options[0].value;
select.value = valorPadrao;


function exibirOptionMunicipio() {
    var estado = document.getElementById("select-estado");

    fetch(`/totem/exibirMunicipios/${estado.value}`)
        .then(function (resposta) {
            console.log("ESTOU NO THEN DO exibirMunicipios()!");

            if (resposta.ok) {
                console.log(resposta);
                resposta.json().then(json => {
                    console.log(json);

                    var municipio = document.getElementById("select-municipio");
                    municipio.removeAttribute("disabled");
                    municipio.innerHTML = "";
                    let option1 = document.createElement("option");
                    option1.innerHTML = "Selecione um município...";
                    option1.setAttribute("default", "");
                    municipio.appendChild(option1);

                    var aeroporto = document.getElementById("select-aeroporto");
                    aeroporto.removeAttribute("disabled");
                    aeroporto.innerHTML = "";
                    let option2 = document.createElement("option");
                    option2.innerHTML = "Selecione um aeroporto...";
                    option2.setAttribute("default", "");
                    aeroporto.appendChild(option2);
                    aeroporto.setAttribute("disabled",'')

                    for (let i = 0; i < json.length; i++) {
                        let publicacao = json[i];
                        let option = document.createElement("option");
                        option.innerHTML = publicacao.municipio;
                        option.setAttribute("value", publicacao.municipio);
                        municipio.appendChild(option);
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

function exibirOptionAeroporto(municipio) {
    var municipio = document.getElementById("select-municipio");
    fetch(`/totem/exibirAeroportos/${municipio.value}`)
        .then(function (resposta) {
            console.log("ESTOU NO THEN DO exibirAeroportos()!");

            if (resposta.ok) {
                console.log(resposta);
                resposta.json().then(json => {
                    console.log(json);

                    var aeroporto = document.getElementById("select-aeroporto");
                    aeroporto.removeAttribute("disabled");
                    aeroporto.innerHTML = "";
                    let option = document.createElement("option");
                    option.innerHTML = "Selecione um aeroporto...";
                    option.setAttribute("default", "");
                    aeroporto.appendChild(option);

                    for (let i = 0; i < json.length; i++) {
                        let publicacao = json[i];
                        let option = document.createElement("option");
                        option.innerHTML = publicacao.nome;
                        option.setAttribute("value", publicacao.idAeroporto);
                        aeroporto.appendChild(option);
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

function cadastrarTotem() {
    var nomeTotemVar = ipt_nomeTotem.value;
    var fkAeroportoVar = document.getElementById("select-aeroporto").value;
    var fkEmpresaVar = sessionStorage.FK_EMPRESA;
   
    fetch(`/totem/cadastrarTotem`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeTotemServer: nomeTotemVar,
            fkAeroportoServer : fkAeroportoVar,
            fkEmpresaServer : fkEmpresaVar
        })
    }).then(function (resposta) {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
            cadastrarComponente()
           // criarViewMaquina(nomeMaquinaVar)
           cardMsg.style.display = "block"
           cardMsg.style.border = "2px solid greenyellow"
           cardMsg.style.boxShadow = "0px 0px 12px black"
           cardMsg.style.color = "greenyellow"
           cardMsg.innerHTML = "✅Cadastro realizado com sucesso!✅";
            setTimeout(function () {
                location.reload();
            }, 2000);
        } else {
            cardMsg.style.display = "block"
            cardMsg.style.border = "2px solid red"
            cardMsg.style.color = "red"
            cardMsg.innerHTML = "❌Erro ao cadastrar totem! Tente novamente...❌";
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`)
    });
    return false
}

function cadastrarComponente() {

    var valorCheckBox = document.querySelectorAll('input[type="checkbox"]:checked');
    var vt_listaComponentes = [];

    valorCheckBox.forEach((checkbox) => {
        vt_listaComponentes.push(checkbox.value);
    });

    for (let i = 0; i < vt_listaComponentes.length; i++) {

        var componenteVar = vt_listaComponentes[i]
        fetch(`/totem/cadastrarComponente`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                componenteServer: componenteVar
            })
        }).then(function (resposta) {
            console.log("resposta: ", resposta);
            if (resposta.ok) {
            } else {
                throw ("Houve um erro ao realizar o cadastro os componentes!")
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`)
        });

    }

}
