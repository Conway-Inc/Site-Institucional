function exibirEstadosComTotens() {
    var estado = document.getElementById("select-estado");
    fetch(`/graficoBruno/exibirEstadosComTotens`)
        .then(function (resposta) {
            console.log("ESTOU NO THEN DO exibirEstadosComTotens()!");

            if (resposta.ok) {
                exibirTotensEstado(estado.value);

                resposta.json().then(json => {
                    
                    estado.innerHTML = "";
                    let option1 = document.createElement("option");
                    option1.innerHTML = "Selecione um estado...";
                    option1.setAttribute("default", "");
                    estado.appendChild(option1);

                    var municipio = document.getElementById("select-municipio");
                    municipio.innerHTML = "";
                    let option2 = document.createElement("option");
                    option2.innerHTML = "Selecione um município...";
                    option2.setAttribute("default", "");
                    municipio.appendChild(option2);

                    var aeroporto = document.getElementById("select-aeroporto");
                    aeroporto.removeAttribute("disabled");
                    aeroporto.innerHTML = "";
                    let option3 = document.createElement("option");
                    option3.innerHTML = "Selecione um aeroporto...";
                    option3.setAttribute("default", "");
                    aeroporto.appendChild(option3);
                    aeroporto.setAttribute("disabled", '')

                    for (let i = 0; i < json.length; i++) {
                        let publicacao = json[i];
                        let option = document.createElement("option");
                        option.innerHTML = publicacao.estado;
                        option.setAttribute("value", publicacao.estado);
                        estado.appendChild(option);
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

function exibirMunicipiosComTotens() {
    var estado = document.getElementById("select-estado");
    fetch(`/graficoBruno/exibirMunicipiosComTotens/${estado.value}`)
        .then(function (resposta) {
            console.log("ESTOU NO THEN DO exibirMunicipios()!");

            if (resposta.ok) {
                exibirTotensEstado(estado.value);

                resposta.json().then(json => {
                    
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
                    aeroporto.setAttribute("disabled", '')

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

function exibirAeroportosComTotens(municipio) {
    var municipio = document.getElementById("select-municipio");
    fetch(`/graficoBruno/exibirAeroportosComTotens/${municipio.value}`)
        .then(function (resposta) {
            console.log("ESTOU NO THEN DO exibirAeroportosComTotens()!");

            if (resposta.ok) {
                // exibirTotensAeroporto(municipio.value);

                resposta.json().then(json => {

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
                        option.innerHTML = publicacao.nomeAeroporto;
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

function exibirTotensEstado(estado) {
    fetch(`/graficoBruno/exibirTotensEstado/${estado}`)
        .then(function (resposta) {
            console.log("ESTOU NO THEN DO exibirTotensEstado()!");

            if (resposta.ok) {
                console.log(resposta);
                resposta.json().then(json => {
                    console.log(json);

                    if (json.length == 1) {
                        document.getElementById("qtd-totens").innerHTML = `${document.getElementById("select-estado").value} - ${json.length} Totem`
                    } else {
                        document.getElementById("qtd-totens").innerHTML = `${document.getElementById("select-estado").value} - ${json.length} Totens`
                    }
                    var divTotens = document.getElementById("div-totens");
                    divTotens.innerHTML = "";
                    for (let i = 0; i < json.length; i++) {
                        var publi = json[i];
                        var divCamporTotem = document.createElement("div");
                        divCamporTotem.setAttribute("class","row mb-3 campo-totem");
                        var divInfos = document.createElement("div");
                        divInfos.setAttribute("class","column mb-3");
                        var imgTotem = document.createElement("img");
                        imgTotem.setAttribute("class","img-totem");
                        imgTotem.setAttribute("src","../img/totem.png");

                        var pNome = document.createElement("p");
                        pNome.setAttribute("id",`nome-maquina-${i+1}`);
                        pNome.innerHTML = publi.nomeTotem
                        var pCpu = document.createElement("p");
                        pCpu.innerHTML = "CPU:"
                        var spanCpu = document.createElement("span");
                        spanCpu.setAttribute("id",`cpu-maquina-${i+1}`);
                        var pMemoria = document.createElement("p");
                        pMemoria.innerHTML = "Memória:"
                        var spanMemoria = document.createElement("span");
                        spanMemoria.setAttribute("id",`memoria-maquina-${i+1}`);
                        var pDisco = document.createElement("p");
                        pDisco.innerHTML = "Disco:"
                        var spanDisco = document.createElement("span");
                        spanDisco.setAttribute("id",`disco-maquina-${i+1}`);

                        pCpu.appendChild(spanCpu);
                        pMemoria.appendChild(spanMemoria);
                        pDisco.appendChild(spanDisco);

                        divInfos.appendChild(pNome)
                        divInfos.appendChild(pCpu)
                        divInfos.appendChild(pMemoria)
                        divInfos.appendChild(pDisco)

                        divCamporTotem.appendChild(divInfos)
                        divCamporTotem.appendChild(imgTotem)

                        divTotens.append(divCamporTotem);
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

function exibirTotensMunicipio(municipio) {
    fetch(`/graficoBruno/exibirTotensMunicipio/${municipio}`)
        .then(function (resposta) {
            console.log("ESTOU NO THEN DO exibirTotensMunicipio()!");

            if (resposta.ok) {
                console.log(resposta);
                resposta.json().then(json => {
                    console.log(json);

                    if (json.length == 1) {
                        document.getElementById("qtd-totens").innerHTML = `${document.getElementById("select-estado").value} - ${json.length} Totem`
                    } else {
                        document.getElementById("qtd-totens").innerHTML = `${document.getElementById("select-estado").value} - ${json.length} Totens`
                    }

                    var divTotens = document.getElementById("div-totens");
                    divTotens.innerHTML = "";
                    for (let i = 0; i < json.length; i++) {
                        var publi = json[i];
                        var divCamporTotem = document.createElement("div");
                        divCamporTotem.setAttribute("class","row mb-3 campo-totem");
                        var divInfos = document.createElement("div");
                        divInfos.setAttribute("class","column mb-3");
                        var imgTotem = document.createElement("img");
                        imgTotem.setAttribute("class","img-totem");
                        imgTotem.setAttribute("src","../img/totem.png");

                        var pNome = document.createElement("p");
                        pNome.setAttribute("id",`nome-maquina-${i+1}`);
                        pNome.innerHTML = publi.nomeTotem
                        var pCpu = document.createElement("p");
                        pCpu.innerHTML = "CPU:"
                        var spanCpu = document.createElement("span");
                        spanCpu.setAttribute("id",`cpu-maquina-${i+1}`);
                        var pMemoria = document.createElement("p");
                        pMemoria.innerHTML = "Memória:"
                        var spanMemoria = document.createElement("span");
                        spanMemoria.setAttribute("id",`memoria-maquina-${i+1}`);
                        var pDisco = document.createElement("p");
                        pDisco.innerHTML = "Disco:"
                        var spanDisco = document.createElement("span");
                        spanDisco.setAttribute("id",`disco-maquina-${i+1}`);

                        pCpu.appendChild(spanCpu);
                        pMemoria.appendChild(spanMemoria);
                        pDisco.appendChild(spanDisco);

                        divInfos.appendChild(pNome)
                        divInfos.appendChild(pCpu)
                        divInfos.appendChild(pMemoria)
                        divInfos.appendChild(pDisco)

                        divCamporTotem.appendChild(divInfos)
                        divCamporTotem.appendChild(imgTotem)

                        divTotens.append(divCamporTotem);
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

function exibirTotensAeroporto(aeroporto) {

}