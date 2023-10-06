
// GRAFICO GERAL
function pegarMetricasGerais(tipo) {
    let texto;
    let estado = document.getElementById("select-estado").value;
    let municipio = document.getElementById("select-municipio").value;
    let aeroporto = document.getElementById("select-aeroporto").value;
    if (tipo == 1) {
        tipo = 'estado';
        document.getElementById("info-aeroporto-nome").innerHTML = "todos os estados do Brasil";
        texto = "";
    } else if (tipo == 2) {
        tipo = 'municipio';
        texto = `WHERE estado = '${estado}'`;
        document.getElementById("info-aeroporto-nome").innerHTML = `todos os municípios de ${document.getElementById("select-estado").value}`;
        // Se o usuario selecionar 0 (todos), ele exibe os estados
        if (estado == "0") {
            tipo = 'estado';
            texto = "";
            document.getElementById("info-aeroporto-nome").innerHTML = `todos os estados do Brasil`;
        }
    } else if (tipo == 3) {
        tipo = 'nomeAero';
        texto = `WHERE municipio = '${municipio}'`;
        document.getElementById("info-aeroporto-nome").innerHTML = `todos os aeroportos de ${document.getElementById("select-municipio").value}`;
        // Se o usuario selecionar 0 (todos), ele exibe os municipios
        if (municipio == "0") {
            tipo = 'municipio';
            texto = `WHERE estado = '${estado}'`;
            document.getElementById("info-aeroporto-nome").innerHTML = `todos os municípios de ${document.getElementById("select-estado").value}`;
        }
    } else if (tipo == 4) {
        tipo = 'nome';
        texto = `WHERE nomeAero = '${aeroporto}'`;
        document.getElementById("info-aeroporto-nome").innerHTML = `todos os totens de ${document.getElementById("select-aeroporto").value}`;
        // Se o usuario selecionar 0 (todos), ele exibe os municipios
        if (aeroporto == "0") {
            tipo = 'nomeAero';
            texto = `WHERE municipio = '${municipio}'`;
            document.getElementById("info-aeroporto-nome").innerHTML = `todos os aeroportos de ${document.getElementById("select-municipio").value}`;
            exibirTotensMunicipio();
        }
    }

    fetch("/graficoBruno/metricasGerais", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tipoServer: tipo,
            textoServer: texto
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                graficoEstados(json);
            });
        } else {
            resposta.text().then(textoErro => {
                console.error(textoErro);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });
    return false;
}

function graficoEstados(json) {
    document.getElementById("grafico-geral").innerHTML = "";
    console.log(json)

    let dataCpu = [];
    let dataMemoria = [];
    let labels = [];
    for (let i = 0; i < json.length; i++) {
        dataCpu.push(Math.round((json[i].mediaCpu) * 100) / 100)
        dataMemoria.push(Math.round((json[i].mediaMem) * 100) / 100)
        labels.push(json[i].tipo)
    }

    var options = {
        series: [{
            name: 'CPU',
            data: dataCpu
        },
        {
            name: 'Memória',
            data: dataMemoria
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
            categories: labels,
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
            max: 100,
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
            text: 'Média CPU / Memória',
            floating: true,
            // offsetY: 330,
            position: 'top',
            align: 'center',
            style: {
                color: '#444'
            }
        }
    };

    var chart = new ApexCharts(document.getElementById("grafico-geral"), options);
    chart.render();
}

// GRAFICO DISCO

function pegarValorDisco(idTotem) {
    fetch(`/graficoBruno/valorDisco/${idTotem}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    graficoDisco(json);
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

function graficoDisco(json) {
    document.getElementById("grafico-disco").innerHTML = "";
    var valorAtual = Math.round((((json[0].porcent) * (json[0].valor)) / 100), 1);
    var options = {
        series: [
            {
                name: 'GB Usado',
                data: [
                    {
                        x: '',
                        y: valorAtual,
                        goals: [
                            {
                                name: 'GB Total',
                                value: json[0].valor,
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
            max: json[0].valor,
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
            toolbar: {
                show: false
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

// GRAFICO CPU E MEMORIA DO TOTEM

function pegarValorTotem(idTotem) {
    fetch(`/graficoBruno/valorTotem/${idTotem}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    graficoTotem(json);
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
function graficoTotem(json) {
    document.getElementById("toolbar").style.display = 'block';
    document.getElementById("grafico-totem").innerHTML = "";
    let dataCpu = [];
    let dataMemoria = [];
    let labels = [];
    let texto = "";
    for (let i = 0; i < json.length; i++) {
        dataCpu.unshift(json[i].cpu);
        dataMemoria.unshift(json[i].memoria);
        let dataHora = new Date(json[i].data);
        dataHora = `${dataHora.getFullYear().toString()}-${(dataHora.getMonth() + 1).toString().padStart(2, '0')}-${dataHora.getDate().toString().padStart(2, '0')} ${dataHora.getHours()}:${dataHora.getMinutes()}:${dataHora.getSeconds()}`
        // dataHora = `${dataHora.getHours()}:${dataHora.getMinutes()}:${dataHora.getSeconds()}`
        labels.unshift(dataHora);
    }
    var options = {
        series: [{
            data: dataCpu
        }],
        chart: {
            id: 'area-datetime',
            type: 'area',
            height: 350,
            zoom: {
                autoScaleYaxis: true
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
            style: 'hollow',
        },
        xaxis: {
            categories: labels,
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
            max: 100,
            min: 0
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
    };

    var chart = new ApexCharts(document.getElementById("grafico-totem"), options);
    chart.render();


    var resetCssClasses = function (activeEl) {
        var els = document.querySelectorAll('button')
        Array.prototype.forEach.call(els, function (el) {
            el.classList.remove('active')
        })

        activeEl.target.classList.add('active')
    }

    document
        .querySelector('#one_month')
        .addEventListener('click', function (e) {
            resetCssClasses(e)

            chart.zoomX(
                new Date('28 Jan 2013').getTime(),
                new Date('27 Feb 2013').getTime()
            )
        })

    document
        .querySelector('#six_months')
        .addEventListener('click', function (e) {
            resetCssClasses(e)

            chart.zoomX(
                new Date('27 Sep 2012').getTime(),
                new Date('27 Feb 2013').getTime()
            )
        })

    document
        .querySelector('#one_year')
        .addEventListener('click', function (e) {
            resetCssClasses(e)
            chart.zoomX(
                new Date('27 Feb 2012').getTime(),
                new Date('27 Feb 2013').getTime()
            )
        })

    document.querySelector('#ytd').addEventListener('click', function (e) {
        resetCssClasses(e)

        chart.zoomX(
            new Date('01 Jan 2013').getTime(),
            new Date('27 Feb 2013').getTime()
        )
    })

    document.querySelector('#all').addEventListener('click', function (e) {
        resetCssClasses(e)

        chart.zoomX(
            labels[0],
            labels[labels.length-1]
        )
    })
}

// EXIBIR OPTIONS DE ESTADO, MUNICIPIO E AEROPORTO

function exibirEstadosComTotens() {
    var estado = document.getElementById("select-estado");
    fetch(`/graficoBruno/exibirEstadosComTotens`)
        .then(function (resposta) {
            if (resposta.ok) {

                resposta.json().then(json => {

                    estado.innerHTML = "";

                    let option1 = document.createElement("option");
                    option1.innerHTML = "Todos os estados";
                    option1.setAttribute("data-default", "");
                    option1.setAttribute("value", "0");
                    option1.setAttribute("selected", "");
                    estado.appendChild(option1);

                    var municipio = document.getElementById("select-municipio");

                    municipio.innerHTML = "";
                    let option2 = document.createElement("option");
                    option2.innerHTML = "Selecione um estado...";
                    option2.setAttribute("data-default", "");
                    option2.setAttribute("disabled", "");
                    option2.setAttribute("selected", "");
                    municipio.appendChild(option2);

                    var aeroporto = document.getElementById("select-aeroporto");
                    aeroporto.removeAttribute("disabled");
                    aeroporto.innerHTML = "";
                    let option3 = document.createElement("option");
                    option3.innerHTML = "Selecione um municipio...";
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
    if (estado.value == 0) {
        exibirTotensTodos();
        var municipio = document.getElementById("select-municipio");
        municipio.setAttribute("disabled", "");

    } else {
        fetch(`/graficoBruno/exibirMunicipiosComTotens/${estado.value}`)
            .then(function (resposta) {
                if (resposta.ok) {
                    exibirTotensEstado(estado.value);

                    resposta.json().then(json => {

                        var municipio = document.getElementById("select-municipio");
                        municipio.removeAttribute("disabled");
                        municipio.innerHTML = "";
                        let option1 = document.createElement("option");
                        option1.innerHTML = "Todos os municípios";
                        option1.setAttribute("data-default", "");
                        option1.setAttribute("value", "0");
                        option1.setAttribute("selected", "");
                        municipio.appendChild(option1);

                        var aeroporto = document.getElementById("select-aeroporto");
                        aeroporto.setAttribute("disabled", '')
                        aeroporto.innerHTML = "";
                        let option2 = document.createElement("option");
                        option2.innerHTML = "Selecione um município...";
                        option2.setAttribute("data-default", "");
                        option2.setAttribute("disabled", "");
                        option2.setAttribute("selected", "");
                        aeroporto.appendChild(option2);

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
}

function exibirAeroportosComTotens(municipio) {
    var estado = document.getElementById("select-estado");
    var municipio = document.getElementById("select-municipio");
    if (municipio.value == 0) {
        exibirTotensEstado(estado.value);
        var aeroporto = document.getElementById("select-aeroporto");
        aeroporto.removeAttribute("disabled");
        aeroporto.innerHTML = "";
        let option3 = document.createElement("option");
        option3.innerHTML = "Selecione um municipio...";
        option3.setAttribute("data-default", "");
        option3.setAttribute("disabled", "");
        option3.setAttribute("selected", "");
        aeroporto.appendChild(option3);
        aeroporto.setAttribute("disabled", '')
    } else {
        fetch(`/graficoBruno/exibirAeroportosComTotens/${municipio.value}`)
            .then(function (resposta) {
                if (resposta.ok) {
                    exibirTotensMunicipio();
                    resposta.json().then(json => {

                        var aeroporto = document.getElementById("select-aeroporto");
                        aeroporto.removeAttribute("disabled");
                        aeroporto.innerHTML = "";
                        let option = document.createElement("option");
                        option.innerHTML = "Todos os aeroportos";
                        option.setAttribute("data-default", "");
                        option.setAttribute("value", "0");
                        option.setAttribute("selected", "");
                        aeroporto.appendChild(option);

                        for (let i = 0; i < json.length; i++) {
                            let publicacao = json[i];
                            let option = document.createElement("option");
                            option.innerHTML = publicacao.nomeAeroporto;
                            option.setAttribute("value", publicacao.nomeAeroporto);
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
}

//  EXIBIR TOTENS DE ACORDO COM O TODOS, ESTADO E MUNICIPIO

function exibirTotensTodos() {
    exibirEstadosComTotens()
    fetch(`/graficoBruno/exibirTotensTodos`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {

                    if (json.length == 1) {
                        document.getElementById("qtd-totens").innerHTML = `Geral - ${json.length} Totem`
                    } else {
                        document.getElementById("qtd-totens").innerHTML = `Geral - ${json.length} Totens`
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
                        imgTotem.setAttribute("onclick", `pegarValorDisco(${publi.idTotem}), pegarValorTotem(${publi.idTotem})`);
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

function exibirTotensEstado(estado) {
    fetch(`/graficoBruno/exibirTotensEstado/${estado}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {

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
                        imgTotem.setAttribute("onclick", `pegarValorDisco(${publi.idTotem}), pegarValorTotem(${publi.idTotem})`);
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

function exibirTotensMunicipio() {
    let municipio = document.getElementById("select-municipio").value
    fetch(`/graficoBruno/exibirTotensMunicipio/${municipio}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {

                    if (json.length == 1) {
                        document.getElementById("qtd-totens").innerHTML = `${document.getElementById("select-municipio").value} - ${json.length} Totem`
                    } else {
                        document.getElementById("qtd-totens").innerHTML = `${document.getElementById("select-municipio").value} - ${json.length} Totens`
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
                        imgTotem.setAttribute("onclick", `pegarValorDisco(${publi.idTotem}), pegarValorTotem(${publi.idTotem})`);
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

function exibirTotensAeroportos() {
    let aeroporto = document.getElementById("select-aeroporto").value
    // if (aeroporto == 0) {
    //     exibirMunicipiosComTotens()
    // }
    fetch(`/graficoBruno/exibirTotensAeroportos/${aeroporto}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {

                    if (json.length == 1) {
                        document.getElementById("qtd-totens").innerHTML = `${document.getElementById("select-aeroporto").value} - ${json.length} Totem`
                    } else {
                        document.getElementById("qtd-totens").innerHTML = `${document.getElementById("select-aeroporto").value} - ${json.length} Totens`
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
                        imgTotem.setAttribute("onclick", `pegarValorDisco(${publi.idTotem}), pegarValorTotem(${publi.idTotem})`);
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
