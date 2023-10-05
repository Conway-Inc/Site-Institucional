
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
    var options = {
        series: [{
            data: [
                [1327359600000, 30.95],
                [1327446000000, 31.34],
                [1327532400000, 31.18],
                [1327618800000, 31.05],
                [1327878000000, 31.00],
                [1327964400000, 30.95],
                [1328050800000, 31.24],
                [1328137200000, 31.29],
                [1328223600000, 31.85],
                [1328482800000, 31.86],
                [1328569200000, 32.28],
                [1328655600000, 32.10],
                [1328742000000, 32.65],
                [1328828400000, 32.21],
                [1329087600000, 32.35],
                [1329174000000, 32.44],
                [1329260400000, 32.46],
                [1329346800000, 32.86],
                [1329433200000, 32.75],
                [1329778800000, 32.54],
                [1329865200000, 32.33],
                [1329951600000, 32.97],
                [1330038000000, 33.41],
                [1330297200000, 33.27],
                [1330383600000, 33.27],
                [1330470000000, 32.89],
                [1330556400000, 33.10],
                [1330642800000, 33.73],
                [1330902000000, 33.22],
                [1330988400000, 31.99],
                [1331074800000, 32.41],
                [1331161200000, 33.05],
                [1331247600000, 33.64],
                [1331506800000, 33.56],
                [1331593200000, 34.22],
                [1331679600000, 33.77],
                [1331766000000, 34.17],
                [1331852400000, 33.82],
                [1332111600000, 34.51],
                [1332198000000, 33.16],
                [1332284400000, 33.56],
                [1332370800000, 33.71],
                [1332457200000, 33.81],
                [1332712800000, 34.40],
                [1332799200000, 34.63],
                [1332885600000, 34.46],
                [1332972000000, 34.48],
                [1333058400000, 34.31],
                [1333317600000, 34.70],
                [1333404000000, 34.31],
                [1333490400000, 33.46],
                [1333576800000, 33.59],
                [1333922400000, 33.22],
                [1334008800000, 32.61],
                [1334095200000, 33.01],
                [1334181600000, 33.55],
                [1334268000000, 33.18],
                [1334527200000, 32.84],
                [1334613600000, 33.84],
                [1334700000000, 33.39],
                [1334786400000, 32.91],
                [1334872800000, 33.06],
                [1335132000000, 32.62],
                [1335218400000, 32.40],
                [1335304800000, 33.13],
                [1335391200000, 33.26],
                [1335477600000, 33.58],
                [1335736800000, 33.55],
                [1335823200000, 33.77],
                [1335909600000, 33.76],
                [1335996000000, 33.32],
                [1336082400000, 32.61],
                [1336341600000, 32.52],
                [1336428000000, 32.67],
                [1336514400000, 32.52],
                [1336600800000, 31.92],
                [1336687200000, 32.20],
                [1336946400000, 32.23],
                [1337032800000, 32.33],
                [1337119200000, 32.36],
                [1337205600000, 32.01],
                [1337292000000, 31.31],
                [1337551200000, 32.01],
                [1337637600000, 32.01],
                [1337724000000, 32.18],
                [1337810400000, 31.54],
                [1337896800000, 31.60],
                [1338242400000, 32.05],
                [1338328800000, 31.29],
                [1338415200000, 31.05],
                [1338501600000, 29.82],
                [1338760800000, 30.31],
                [1338847200000, 30.70],
                [1338933600000, 31.69],
                [1339020000000, 31.32],
                [1339106400000, 31.65],
                [1339365600000, 31.13],
                [1339452000000, 31.77],
                [1339538400000, 31.79],
                [1339624800000, 31.67],
                [1339711200000, 32.39],
                [1339970400000, 32.63],
                [1340056800000, 32.89],
                [1340143200000, 31.99],
                [1340229600000, 31.23],
                [1340316000000, 31.57],
                [1340575200000, 30.84],
                [1340661600000, 31.07],
                [1340748000000, 31.41],
                [1340834400000, 31.17],
                [1340920800000, 32.37],
                [1341180000000, 32.19],
                [1341266400000, 32.51],
                [1341439200000, 32.53],
                [1341525600000, 31.37],
                [1341784800000, 30.43],
                [1341871200000, 30.44],
                [1341957600000, 30.20],
                [1342044000000, 30.14],
                [1342130400000, 30.65],
                [1342389600000, 30.40],
                [1342476000000, 30.65],
                [1342562400000, 31.43],
                [1342648800000, 31.89],
                [1342735200000, 31.38],
                [1342994400000, 30.64],
                [1343080800000, 30.02],
                [1343167200000, 30.33],
                [1343253600000, 30.95],
                [1343340000000, 31.89],
                [1343599200000, 31.01],
                [1343685600000, 30.88],
                [1343772000000, 30.69],
                [1343858400000, 30.58],
                [1343944800000, 32.02],
                [1344204000000, 32.14],
                [1344290400000, 32.37],
                [1344376800000, 32.51],
                [1344463200000, 32.65],
                [1344549600000, 32.64],
                [1344808800000, 32.27],
                [1344895200000, 32.10],
                [1344981600000, 32.91],
                [1345068000000, 33.65],
                [1345154400000, 33.80],
                [1345413600000, 33.92],
                [1345500000000, 33.75],
                [1345586400000, 33.84],
                [1345672800000, 33.50],
                [1345759200000, 32.26],
                [1346018400000, 32.32],
                [1346104800000, 32.06],
                [1346191200000, 31.96],
                [1346277600000, 31.46],
                [1346364000000, 31.27],
                [1346709600000, 31.43],
                [1346796000000, 32.26],
                [1346882400000, 32.79],
                [1346968800000, 32.46],
                [1347228000000, 32.13],
                [1347314400000, 32.43],
                [1347400800000, 32.42],
                [1347487200000, 32.81],
                [1347573600000, 33.34],
                [1347832800000, 33.41],
                [1347919200000, 32.57],
                [1348005600000, 33.12],
                [1348092000000, 34.53],
                [1348178400000, 33.83],
                [1348437600000, 33.41],
                [1348524000000, 32.90],
                [1348610400000, 32.53],
                [1348696800000, 32.80],
                [1348783200000, 32.44],
                [1349042400000, 32.62],
                [1349128800000, 32.57],
                [1349215200000, 32.60],
                [1349301600000, 32.68],
                [1349388000000, 32.47],
                [1349647200000, 32.23],
                [1349733600000, 31.68],
                [1349820000000, 31.51],
                [1349906400000, 31.78],
                [1349992800000, 31.94],
                [1350252000000, 32.33],
                [1350338400000, 33.24],
                [1350424800000, 33.44],
                [1350511200000, 33.48],
                [1350597600000, 33.24],
                [1350856800000, 33.49],
                [1350943200000, 33.31],
                [1351029600000, 33.36],
                [1351116000000, 33.40],
                [1351202400000, 34.01],
                [1351638000000, 34.02],
                [1351724400000, 34.36],
                [1351810800000, 34.39],
                [1352070000000, 34.24],
                [1352156400000, 34.39],
                [1352242800000, 33.47],
                [1352329200000, 32.98],
                [1352415600000, 32.90],
                [1352674800000, 32.70],
                [1352761200000, 32.54],
                [1352847600000, 32.23],
                [1352934000000, 32.64],
                [1353020400000, 32.65],
                [1353279600000, 32.92],
                [1353366000000, 32.64],
                [1353452400000, 32.84],
                [1353625200000, 33.40],
                [1353884400000, 33.30],
                [1353970800000, 33.18],
                [1354057200000, 33.88],
                [1354143600000, 34.09],
                [1354230000000, 34.61],
                [1354489200000, 34.70],
                [1354575600000, 35.30],
                [1354662000000, 35.40],
                [1354748400000, 35.14],
                [1354834800000, 35.48],
                [1355094000000, 35.75],
                [1355180400000, 35.54],
                [1355266800000, 35.96],
                [1355353200000, 35.53],
                [1355439600000, 37.56],
                [1355698800000, 37.42],
                [1355785200000, 37.49],
                [1355871600000, 38.09],
                [1355958000000, 37.87],
                [1356044400000, 37.71],
                [1356303600000, 37.53],
                [1356476400000, 37.55],
                [1356562800000, 37.30],
                [1356649200000, 36.90],
                [1356908400000, 37.68],
                [1357081200000, 38.34],
                [1357167600000, 37.75],
                [1357254000000, 38.13],
                [1357513200000, 37.94],
                [1357599600000, 38.14],
                [1357686000000, 38.66],
                [1357772400000, 38.62],
                [1357858800000, 38.09],
                [1358118000000, 38.16],
                [1358204400000, 38.15],
                [1358290800000, 37.88],
                [1358377200000, 37.73],
                [1358463600000, 37.98],
                [1358809200000, 37.95],
                [1358895600000, 38.25],
                [1358982000000, 38.10],
                [1359068400000, 38.32],
                [1359327600000, 38.24],
                [1359414000000, 38.52],
                [1359500400000, 37.94],
                [1359586800000, 37.83],
                [1359673200000, 38.34],
                [1359932400000, 38.10],
                [1360018800000, 38.51],
                [1360105200000, 38.40],
                [1360191600000, 38.07],
                [1360278000000, 39.12],
                [1360537200000, 38.64],
                [1360623600000, 38.89],
                [1360710000000, 38.81],
                [1360796400000, 38.61],
                [1360882800000, 38.63],
                [1361228400000, 38.99],
                [1361314800000, 38.77],
                [1361401200000, 38.34],
                [1361487600000, 38.55],
                [1361746800000, 38.11],
                [1361833200000, 38.59],
                [1361919600000, 39.60],
            ]
        }],
        chart: {
            id: 'area-datetime',
            type: 'area',
            height: 350,
            zoom: {
                autoScaleYaxis: true
            }
        },
        annotations: {
            yaxis: [{
                y: 30,
                borderColor: '#999',
                label: {
                    show: true,
                    text: 'Support',
                    style: {
                        color: "#fff",
                        background: '#00E396'
                    }
                }
            }],
            xaxis: [{
                x: new Date('14 Nov 2012').getTime(),
                borderColor: '#999',
                yAxisIndex: 0,
                label: {
                    show: true,
                    text: 'Rally',
                    style: {
                        color: "#fff",
                        background: '#775DD0'
                    }
                }
            }]
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
            style: 'hollow',
        },
        xaxis: {
            type: 'datetime',
            min: new Date('01 Mar 2012').getTime(),
            tickAmount: 6,
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
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
            new Date('23 Jan 2012').getTime(),
            new Date('27 Feb 2013').getTime()
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
