function exibirEstadosComTotens() {
    var estado = document.getElementById("select-estado");
    fetch(`/graficoBruno/exibirEstadosComTotens`)
        .then(function (resposta) {
            console.log("ESTOU NO THEN DO exibirEstadosComTotens()!");

            if (resposta.ok) {

                resposta.json().then(json => {

                    estado.innerHTML = "";
                    let option1 = document.createElement("option");
                    option1.innerHTML = "Selecione um estado...";
                    option1.setAttribute("data-default", "");
                    option1.setAttribute("disabled", "");
                    option1.setAttribute("selected", "");
                    estado.appendChild(option1);

                    var municipio = document.getElementById("select-municipio");
                    municipio.innerHTML = "";
                    let option2 = document.createElement("option");
                    option2.innerHTML = "Selecione um município...";
                    option2.setAttribute("data-default", "");
                    option2.setAttribute("disabled", "");
                    option2.setAttribute("selected", "");
                    municipio.appendChild(option2);

                    var aeroporto = document.getElementById("select-aeroporto");
                    aeroporto.removeAttribute("disabled");
                    aeroporto.innerHTML = "";
                    let option3 = document.createElement("option");
                    option3.innerHTML = "Selecione um aeroporto...";
                    option3.setAttribute("data-default", "");
                    option3.setAttribute("disabled", "");
                    option3.setAttribute("selected", "");
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
                    option1.setAttribute("data-default", "");
                    option1.setAttribute("disabled", "");
                    option1.setAttribute("selected", "");
                    municipio.appendChild(option1);

                    var aeroporto = document.getElementById("select-aeroporto");
                    aeroporto.removeAttribute("disabled");
                    aeroporto.innerHTML = "";
                    let option2 = document.createElement("option");
                    option2.innerHTML = "Selecione um aeroporto...";
                    option2.setAttribute("data-default", "");
                    option2.setAttribute("disabled", "");
                    option2.setAttribute("selected", "");
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
                    option.setAttribute("data-default", "");
                    option.setAttribute("disabled", "");
                    option.setAttribute("selected", "");;
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

                    document.getElementById("info-aeroporto-nome").innerHTML = document.getElementById("select-estado").value;
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
                        divCamporTotem.setAttribute("class", "row mb-3 campo-totem");
                        var divInfos = document.createElement("div");
                        divInfos.setAttribute("class", "column mb-3");
                        var imgTotem = document.createElement("img");
                        imgTotem.setAttribute("class", "img-totem");
                        imgTotem.setAttribute("src", "../img/totem.png");
                        imgTotem.setAttribute("onclick", "graficoTotem()");
                        var aImg = document.createElement("a");
                        aImg.setAttribute("href", "#grafico-totem");


                        var pNome = document.createElement("p");
                        pNome.setAttribute("id", `nome-maquina-${i + 1}`);
                        pNome.innerHTML = publi.nomeTotem
                        var pCpu = document.createElement("p");
                        pCpu.innerHTML = "CPU:"
                        var spanCpu = document.createElement("span");
                        spanCpu.setAttribute("id", `cpu-maquina-${i + 1}`);
                        var pMemoria = document.createElement("p");
                        pMemoria.innerHTML = "Memória:"
                        var spanMemoria = document.createElement("span");
                        spanMemoria.setAttribute("id", `memoria-maquina-${i + 1}`);
                        var pDisco = document.createElement("p");
                        pDisco.innerHTML = "Disco:"
                        var spanDisco = document.createElement("span");
                        spanDisco.setAttribute("id", `disco-maquina-${i + 1}`);

                        pCpu.appendChild(spanCpu);
                        pMemoria.appendChild(spanMemoria);
                        pDisco.appendChild(spanDisco);

                        divInfos.appendChild(pNome)
                        divInfos.appendChild(pCpu)
                        divInfos.appendChild(pMemoria)
                        divInfos.appendChild(pDisco)

                        aImg.appendChild(imgTotem)
                        divCamporTotem.appendChild(aImg)
                        divCamporTotem.appendChild(divInfos)

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
                        divCamporTotem.setAttribute("class", "row mb-3 campo-totem");
                        var divInfos = document.createElement("div");
                        divInfos.setAttribute("class", "column mb-3");
                        var imgTotem = document.createElement("img");
                        imgTotem.setAttribute("class", "img-totem");
                        imgTotem.setAttribute("src", "../img/totem.png");
                        imgTotem.setAttribute("onclick", "graficoTotem()");
                        var aImg = document.createElement("a");
                        aImg.setAttribute("href", "#grafico-totem");

                        var pNome = document.createElement("p");
                        pNome.setAttribute("id", `nome-maquina-${i + 1}`);
                        pNome.innerHTML = publi.nomeTotem
                        var pCpu = document.createElement("p");
                        pCpu.innerHTML = "CPU:"
                        var spanCpu = document.createElement("span");
                        spanCpu.setAttribute("id", `cpu-maquina-${i + 1}`);
                        var pMemoria = document.createElement("p");
                        pMemoria.innerHTML = "Memória:"
                        var spanMemoria = document.createElement("span");
                        spanMemoria.setAttribute("id", `memoria-maquina-${i + 1}`);
                        var pDisco = document.createElement("p");
                        pDisco.innerHTML = "Disco:"
                        var spanDisco = document.createElement("span");
                        spanDisco.setAttribute("id", `disco-maquina-${i + 1}`);

                        pCpu.appendChild(spanCpu);
                        pMemoria.appendChild(spanMemoria);
                        pDisco.appendChild(spanDisco);

                        divInfos.appendChild(pNome)
                        divInfos.appendChild(pCpu)
                        divInfos.appendChild(pMemoria)
                        divInfos.appendChild(pDisco)

                        aImg.appendChild(imgTotem)
                        divCamporTotem.appendChild(aImg)
                        divCamporTotem.appendChild(divInfos)

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



function graficoTotem() {
    document.getElementById("grafico-totem").innerHTML = "";
    var options = {
        series: [{
            name: 'Inflation',
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        }],
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + "%";
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },

        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            position: 'bottom',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + "%";
                }
            }

        },
        title: {
            text: 'Média da CPU nos últimos 10 dias',
            floating: true,
            // offsetY: 330,
            position: 'top',
            align: 'center',
            style: {
                color: '#444'
            }
        }
    };

    var chart = new ApexCharts(document.getElementById("grafico-totem"), options);
    chart.render();

    document.getElementById("grafico-disco").innerHTML = "";
    var options = {
        series: [
            {
                name: 'GB Usado',
                data: [
                    {
                        x: '',
                        y: 67,
                        goals: [
                            {
                                name: 'GB Total',
                                value: 70,
                                strokeWidth: 5,
                                strokeHeight: 20,
                                strokeColor: '#775DD0'
                            }
                        ]
                    }
                ]
            }
        ],
        xaxis: {
            max: 70,
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + "%";
                }
            }
        },
        chart: {
            height: 110,
            type: 'bar',
            toolbar: {show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        colors: ['#00E396'],
        dataLabels: {
            formatter: function (val, opt) {
                const goals =
                    opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                        .goals
                if (goals && goals.length) {
                    return `${val} / ${goals[0].value}`
                }
                return val
            }
        },
        title: {
            text: 'Disco',
            floating: true,
            offsetY: 10,
            align: 'center',
            style: {
                color: '#444'
            }
        },
        grid: {
            show: false   
          }
    };

    var chart = new ApexCharts(document.querySelector("#grafico-disco"), options);
    chart.render();
}