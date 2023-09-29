function exibirOptionMunicipio() {
    var estado = document.getElementById("select-estado");

    fetch(`/graficoBruno/exibirMunicipios/${estado.value}`)
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
    fetch(`/graficoBruno/exibirAeroportos/${municipio.value}`)
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