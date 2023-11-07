// RELATORIOS


function gerarRelatorio(alerta, critico, total) {
    fetch("/graficoBruno/dadosRelatorio", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            compServer: sessionStorage.COMP_ATUAL,
            mesServer: document.getElementById("select-mes").value,
            anoServer: document.getElementById("select-ano").value,
            fkEmpresaServer: sessionStorage.FK_EMPRESA,
            textoServer: sessionStorage.TEXTO,
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            let comp = ""
            if (sessionStorage.COMP_ATUAL == 1) {
                comp = "CPU"
            } else if (sessionStorage.COMP_ATUAL == 2) {
                comp = "Memória"
            }
            resposta.json().then(json => {

                var dataAtual = new Date();
                dataAtual = `${dataAtual.getDate().toString().padStart(2, '0')}/${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}/${dataAtual.getFullYear().toString()} ${dataAtual.getHours().toString().padStart(2, '0')}:${dataAtual.getMinutes().toString().padStart(2, '0')}:${dataAtual.getSeconds().toString().padStart(2, '0')} `;
                var doc = new jsPDF({
                    orientation: 'landscape',
                    unit: 'cm',
                    format: 'a4',
                })
                doc.addImage("img/logoairwaynovo.png", "png", 12.5, 1.3, 5, 1);

                // titulo
                doc.setLineWidth(0.05);
                doc.line(1, 1, 28.7, 1);
                doc.line(1.025, 20, 1.025, 1);
                doc.text(`Relatório - Mês de ${retornarMes()}`, 2, 2)
                doc.text(`${dataAtual}`, 22.5, 2)
                doc.line(28.7, 20, 28.7, 1);
                doc.line(1, 2.5, 28.7, 2.5);
                doc.line(1, 20, 28.7, 20);

                let info = [];
                json.forEach((element, index, array) => {
                    info.push([element.dia, element.alerta, element.critico])
                });

                doc.text(`Ocorrências de ${comp}`, 2, 3.5)
                doc.autoTable({
                    head: [['Dia', 'Alerta', 'Crítico']],
                    body: info,
                    margin: [4, 19, 0, 2],

                })

                // doc.text(`Qtd. Críticos: ${critico}`, 2, 8)
                // doc.text(`Qtd. Ocorrências: ${total}`, 2, 9)
                // doc.text(`% em relação ao mês anterior: ${alerta}%`, 10, 7)
                // doc.text(`% em relação ao mês anterior: ${critico}%`, 10, 8)
                // doc.text(`% em relação ao mês anterior: ${total}%`, 10, 9)

                doc.save(`${retornarMes()}${document.getElementById("select-ano").value}.pdf`);
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

function exibirRelatorios(json,componente) {
    let metricasCpu = [
        { max: "", valor: -1 },
        { min: "", valor: 1000000 },
        { qtdAlertas: 0, qtdCriticos: 0, qtdTotal: 0 }
    ];
    let metricasMem = [
        { max: "", valor: -1 },
        { min: "", valor: 1000000 },
        { qtdAlertas: 0, qtdCriticos: 0, qtdTotal: 0 }
    ];


    for (let i = 0; i < json.length; i++) {
        let resp = json[i];

        let dadoAlertaCpu = Math.round((resp.alertaCpu) * 100) / 100;
        let dadoCriticoCpu = Math.round((resp.criticoCpu) * 100) / 100;
        metricasCpu[2].qtdTotal += (dadoAlertaCpu + dadoCriticoCpu);
        metricasCpu[2].qtdAlertas += dadoAlertaCpu;
        metricasCpu[2].qtdCriticos += dadoCriticoCpu;
        if (dadoAlertaCpu >= metricasCpu[0].valor) {
            metricasCpu[0].max = resp.tipo;
            metricasCpu[0].valor = dadoAlertaCpu;
        }
        if (dadoCriticoCpu <= metricasCpu[1].valor) {
            metricasCpu[1].min = resp.tipo;
            metricasCpu[1].valor = dadoCriticoCpu;
        }

        let dadoAlertaMem = Math.round((resp.alertaMem) * 100) / 100;
        let dadoCriticoMem = Math.round((resp.criticoMem) * 100) / 100;
        metricasMem[2].qtdTotal += (dadoAlertaMem + dadoCriticoMem);
        metricasMem[2].qtdAlertas += dadoAlertaMem;
        metricasMem[2].qtdCriticos += dadoCriticoMem;
        if (dadoAlertaMem >= metricasMem[0].valor) {
            metricasMem[0].max = resp.tipo;
            metricasMem[0].valor = dadoAlertaMem;
        }
        if (dadoCriticoMem <= metricasMem[1].valor) {
            metricasMem[1].min = resp.tipo;
            metricasMem[1].valor = dadoCriticoMem;
        }
    }

    if (componente == 1) {
        document.getElementById("qtd-total").innerHTML = metricasCpu[2].qtdTotal;
        (document.getElementById("qtd-alertas")).innerHTML = metricasCpu[2].qtdAlertas;
        (document.getElementById("qtd-criticos")).innerHTML = metricasCpu[2].qtdCriticos;

        var lista = document.getElementById("button-relatorio");
        lista.innerHTML = "";
        var botao = document.createElement("button");
        botao.setAttribute('onclick', `gerarRelatorio(${metricasCpu[2].qtdAlertas},${metricasCpu[2].qtdCriticos},${metricasCpu[2].qtdTotal})`);
        botao.setAttribute('class', 'btn btn-primary btn-relatorio');
        botao.innerHTML = 'Gerar Relatório';

        lista.appendChild(botao)
        lista.appendChild(botao);

    } else if (componente == 2) {
        document.getElementById("qtd-total").innerHTML = metricasMem[2].qtdTotal;
        (document.getElementById("qtd-alertas")).innerHTML = metricasMem[2].qtdAlertas;
        (document.getElementById("qtd-criticos")).innerHTML = metricasMem[2].qtdCriticos;

        var lista = document.getElementById("button-relatorio");
        lista.innerHTML = "";
        var botao = document.createElement("button");
        botao.setAttribute('onclick', `gerarRelatorio(${metricasMem[2].qtdAlertas},${metricasMem[2].qtdCriticos},${metricasMem[2].qtdTotal})`);
        botao.setAttribute('class', 'btn btn-primary btn-relatorio');
        botao.innerHTML = 'Gerar Relatório';

        lista.appendChild(botao)
        lista.appendChild(botao);

    }
}

function verCpu() {
    sessionStorage.COMP_ATUAL = 1;
    pegarMetricasGerais(sessionStorage.TIPO_ATUAL,sessionStorage.COMP_ATUAL);
}
function verMem() {
    sessionStorage.COMP_ATUAL = 2;
    pegarMetricasGerais(sessionStorage.TIPO_ATUAL,sessionStorage.COMP_ATUAL);
}
// GRAFICO GERAL
function pegarMetricasGerais(tipo, componente) {
    let texto;
    let estado = document.getElementById("select-estado").value;
    let municipio = document.getElementById("select-municipio").value;
    let aeroporto = document.getElementById("select-aeroporto").value;
    if (tipo == 1) {
        tipo = 'estado';
        sessionStorage.TIPO_ATUAL = 1;
        document.getElementById("info-aeroporto-nome").innerHTML = "todos os estados do Brasil";
        document.getElementById("info-relatorio-nome").innerHTML = "todos os estados do Brasil";
        texto = "estado LIKE '%%'";
        sessionStorage.TEXTO = "estado LIKE '%%'";
    } else if (tipo == 2) {
        tipo = 'municipio';
        sessionStorage.TIPO_ATUAL = 2;
        texto = `estado LIKE '%${estado}%'`;
        sessionStorage.TEXTO = `estado LIKE '%${estado}%'`;
        document.getElementById("info-aeroporto-nome").innerHTML = `todos os municípios de ${document.getElementById("select-estado").value}`;
        document.getElementById("info-relatorio-nome").innerHTML = `todos os municípios de ${document.getElementById("select-estado").value}`;
        // Se o usuario selecionar 0 (todos), ele exibe os estados
        if (estado == "0") {
            tipo = 'estado';
            sessionStorage.TIPO_ATUAL = 1;
            texto = "estado LIKE '%%'";
            sessionStorage.TEXTO = "estado LIKE '%%'";
            document.getElementById("info-aeroporto-nome").innerHTML = `todos os estados do Brasil`;
            document.getElementById("info-relatorio-nome").innerHTML = `todos os estados do Brasil`;
        }
    } else if (tipo == 3) {
        tipo = 'aeroporto';
        sessionStorage.TIPO_ATUAL = 3;
        texto = `municipio LIKE '%${municipio}%'`;
        sessionStorage.TEXTO = `municipio LIKE '%${municipio}%'`
        document.getElementById("info-aeroporto-nome").innerHTML = `todos os aeroportos de ${document.getElementById("select-municipio").value}`;
        document.getElementById("info-relatorio-nome").innerHTML = `todos os aeroportos de ${document.getElementById("select-municipio").value}`;
        // Se o usuario selecionar 0 (todos), ele exibe os municipios
        if (municipio == "0") {
            tipo = 'municipio';
            sessionStorage.TIPO_ATUAL = 2;
            texto = `estado = '${estado}'`;
            sessionStorage.TEXTO = `estado = '${estado}'`;
            document.getElementById("info-aeroporto-nome").innerHTML = `todos os municípios de ${document.getElementById("select-estado").value}`;
            document.getElementById("info-relatorio-nome").innerHTML = `todos os municípios de ${document.getElementById("select-estado").value}`;
        }
    } else if (tipo == 4) {
        tipo = 'nome';
        sessionStorage.TIPO_ATUAL = 4;
        texto = `aeroporto LIKE '%${aeroporto}%'`;
        sessionStorage.TEXTO = `aeroporto LIKE '%${aeroporto}%'`;
        document.getElementById("info-aeroporto-nome").innerHTML = `todos os totens de ${document.getElementById("select-aeroporto").value}`;
        document.getElementById("info-relatorio-nome").innerHTML = `todos os totens de ${document.getElementById("select-aeroporto").value}`;
        // Se o usuario selecionar 0 (todos), ele exibe os municipios
        if (aeroporto == "0") {
            tipo = 'aeroporto';
            sessionStorage.TIPO_ATUAL = 3;
            texto = `municipio LIKE '%${municipio}%'`;
            sessionStorage.TEXTO = `municipio LIKE '%${municipio}%'`;
            document.getElementById("info-aeroporto-nome").innerHTML = `todos os aeroportos de ${document.getElementById("select-municipio").value}`;
            document.getElementById("info-relatorio-nome").innerHTML = `todos os aeroportos de ${document.getElementById("select-municipio").value}`;
            exibirAeroportosComTotens();
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
                graficoEstados(json, componente);
                exibirRelatorios(json, componente);
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

function graficoEstados(json, componente) {
    document.getElementById("grafico-geral").innerHTML = "";

    let alertaCpu = [];
    let criticoCpu = [];
    let alertaMem = [];
    let criticoMem = [];
    let alerta = [];
    let critico = [];
    let labels = [];
    let maxCpu = -1;
    let maxMem = -1;
    let max = -1;

    for (let i = 0; i < json.length; i++) {
        var dadoAlertaCpu = Math.round((json[i].alertaCpu) * 100) / 100;
        var dadoCriticoCpu = Math.round((json[i].criticoCpu) * 100) / 100;
        var dadoAlertaMem = Math.round((json[i].alertaMem) * 100) / 100;
        var dadoCriticoMem = Math.round((json[i].criticoMem) * 100) / 100;

        console.log(json[i])
        console.log(json[i].alertaCpu)

        alertaCpu.push(dadoAlertaCpu)
        criticoCpu.push(dadoCriticoCpu)
        alertaMem.push(dadoAlertaMem)
        criticoMem.push(dadoCriticoMem)
        labels.push(json[i].tipo)

        if (dadoAlertaCpu >= maxCpu) {
            maxCpu = dadoAlertaCpu;
        }
        if (dadoCriticoCpu >= maxCpu) {
            maxCpu = dadoCriticoCpu;
        }
        if (dadoAlertaMem >= maxMem) {
            maxMem = dadoAlertaMem;
        }
        if (dadoCriticoMem >= maxMem) {
            maxMem = dadoCriticoMem;
        }
    }

    if (componente == 1) {
        alerta = alertaCpu;
        critico = criticoCpu;
        max = maxCpu;
        tipo = "CPU"
    } else if (componente == 2) {
        alerta = alertaMem;
        critico = criticoMem;
        max = maxMem;
        tipo = "Memória"
    }

    var options = {
        series: [{
            name: 'Alerta',
            data: alerta,
            color: '#FFEE75'
        },
        {
            name: 'Crítico',
            data: critico,
            color: '#E91E63'
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
                return val;
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
            max: max + 1,
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + "";
                }
            }

        },
        title: {
            text: `Quantidade de ocorrências ${tipo}`,
            floating: true,
            position: 'top',
            align: 'center',
            style: {
                colors: ["#304758"]
            }
        }
    };

    var chart = new ApexCharts(document.getElementById("grafico-geral"), options);
    chart.render();
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
        var municipio = document.getElementById("select-municipio");
        municipio.setAttribute("disabled", "");

    } else {
        fetch(`/graficoBruno/exibirMunicipiosComTotens/${estado.value}`)
            .then(function (resposta) {
                if (resposta.ok) {

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

function retornarMes() {
    let mes = document.getElementById("select-mes").value;

    if (mes == 1) {
        return "Janeiro"
    } else if (mes == 2) {
        return "Fevereiro"
    } else if (mes == 3) {
        return "Março"
    } else if (mes == 4) {
        return "Abril"
    } else if (mes == 5) {
        return "Maio"
    } else if (mes == 6) {
        return "Junho"
    } else if (mes == 7) {
        return "Julho"
    } else if (mes == 8) {
        return "Agosto"
    } else if (mes == 9) {
        return "Setemebro"
    } else if (mes == 10) {
        return "Outubro"
    } else if (mes == 11) {
        return "Novembro"
    } else if (mes == 12) {
        return "Dezembro"
    }
}