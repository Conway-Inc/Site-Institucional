// RELATORIOS

function gerarRelatorio(alerta,critico,total) {
    var dataAtual = new Date();
    dataAtual = `${dataAtual.getDate().toString().padStart(2, '0')}/${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}/${dataAtual.getFullYear().toString()} ${dataAtual.getHours().toString().padStart(2, '0')}:${dataAtual.getMinutes().toString().padStart(2, '0')}:${dataAtual.getSeconds().toString().padStart(2, '0')} `;
    var doc = new jsPDF({
        orientation: 'landscape',
        unit: 'cm',
        format: 'letter',
        setPageSize: (210, 297),
    })

    
    // titulo
    doc.setLineWidth(0.05);
    doc.line(1, 1, 27, 1);
    doc.line(1.025, 20.5, 1.025, 1);
    doc.text(`Relatório - Mês de ${document.getElementById("select-mes").value}`, 2, 2)
    doc.text(`Data: ${dataAtual}`, 18, 2)
    doc.line(26.975, 20.5, 26.975, 1);
    doc.line(1, 2.5, 27, 2.5);
    doc.line(1, 20.5, 27, 20.5);

    doc.text(`Ocorrências`, 4, 5)
    doc.text(`Qtd. Alertas: ${alerta}`, 2, 7)
    doc.text(`Qtd. Críticos: ${critico}`, 2, 8)
    doc.text(`Qtd. Ocorrências: ${total}`, 2, 9)
    doc.text(`% em relação ao mês anterior: ${alerta}%`, 10, 7)
    doc.text(`% em relação ao mês anterior: ${critico}%`, 10, 8)
    doc.text(`% em relação ao mês anterior: ${total}%`, 10, 9)

    // const table = doc.createTable([
    //     ['Estado', 'Alertas', 'Críticos'],
    // ]);

    // for (let i = 0; i < json.length; i++) {
    //     table.addRow([
    //       json.estado,
    //       json.alerta,
    //       json.critico,
    //     ]);
    // }
    // doc.addPage();
    // doc.table(table);
    doc.save("teste.pdf");
}

function exibirRelatorios(json) {
    let metricas = [
        { max: "", valor: -1 },
        { min: "", valor: 1000000 },
        { qtdAlertas: 0, qtdCriticos: 0, qtdTotal: 0}
    ];

    for (let i = 0; i < json.length; i++) {
        let resp = json[i];
        let dadoAlerta = Math.round((resp.alerta) * 100) / 100;
        let dadoCritico = Math.round((resp.critico) * 100) / 100;
        metricas[2].qtdTotal += (dadoAlerta+dadoCritico);
        metricas[2].qtdAlertas += dadoAlerta;
        metricas[2].qtdCriticos += dadoCritico;
        
        if (dadoAlerta >= metricas[0].valor) {
            metricas[0].max = resp.tipo;
            metricas[0].valor = dadoAlerta;
        }
        if (dadoCritico <= metricas[1].valor) {
            metricas[1].min = resp.tipo;
            metricas[1].valor = dadoAlerta;
        }
    }
    console.log(metricas)

    document.getElementById("qtd-total").innerHTML = metricas[2].qtdTotal;
    (document.getElementById("qtd-alertas")).innerHTML = metricas[2].qtdAlertas;
    (document.getElementById("qtd-criticos")).innerHTML = metricas[2].qtdCriticos;

    var lista = document.getElementById("button-relatorio");
    lista.innerHTML = "";
    var botao = document.createElement("button");
    botao.setAttribute('onclick',`gerarRelatorio(${metricas[2].qtdAlertas},${metricas[2].qtdCriticos},${metricas[2].qtdTotal})`);
    botao.setAttribute('class','btn btn-primary btn-relatorio');
    botao.innerHTML = 'Gerar Relatório';

    lista.appendChild(botao)
    lista.appendChild(botao);

}



// GRAFICO GERAL
function pegarMetricasGerais(tipo) {
    let texto;
    let estado = document.getElementById("select-estado").value;
    let municipio = document.getElementById("select-municipio").value;
    let aeroporto = document.getElementById("select-aeroporto").value;
    if (tipo == 1) {
        tipo = 'estado';
        document.getElementById("info-aeroporto-nome").innerHTML = "todos os estados do Brasil";
        document.getElementById("info-relatorio-nome").innerHTML = "todos os estados do Brasil";
        texto = "estado LIKE '%%'";
    } else if (tipo == 2) {
        tipo = 'municipio';
        texto = `estado LIKE '%${estado}%'`;
        document.getElementById("info-aeroporto-nome").innerHTML = `todos os municípios de ${document.getElementById("select-estado").value}`;
        document.getElementById("info-relatorio-nome").innerHTML = `todos os municípios de ${document.getElementById("select-estado").value}`;
        // Se o usuario selecionar 0 (todos), ele exibe os estados
        if (estado == "0") {
            tipo = 'estado';
            texto = "estado LIKE '%%'";
            document.getElementById("info-aeroporto-nome").innerHTML = `todos os estados do Brasil`;
            document.getElementById("info-relatorio-nome").innerHTML = `todos os estados do Brasil`;
        }
    } else if (tipo == 3) {
        tipo = 'aeroporto';
        texto = `municipio LIKE '%${municipio}%'`;
        document.getElementById("info-aeroporto-nome").innerHTML = `todos os aeroportos de ${document.getElementById("select-municipio").value}`;
        document.getElementById("info-relatorio-nome").innerHTML = `todos os aeroportos de ${document.getElementById("select-municipio").value}`;
        // Se o usuario selecionar 0 (todos), ele exibe os municipios
        if (municipio == "0") {
            tipo = 'municipio';
            texto = `estado = '${estado}'`;
            document.getElementById("info-aeroporto-nome").innerHTML = `todos os municípios de ${document.getElementById("select-estado").value}`;
            document.getElementById("info-relatorio-nome").innerHTML = `todos os municípios de ${document.getElementById("select-estado").value}`;
        }
    } else if (tipo == 4) {
        tipo = 'nome';
        texto = `aeroporto LIKE '%${aeroporto}%'`;
        document.getElementById("info-aeroporto-nome").innerHTML = `todos os totens de ${document.getElementById("select-aeroporto").value}`;
        document.getElementById("info-relatorio-nome").innerHTML = `todos os totens de ${document.getElementById("select-aeroporto").value}`;
        // Se o usuario selecionar 0 (todos), ele exibe os municipios
        if (aeroporto == "0") {
            tipo = 'aeroporto';
            texto = `municipio LIKE '%${municipio}%'`;
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
                graficoEstados(json);
                exibirRelatorios(json);
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

    let alerta = [];
    let critico = [];
    let labels = [];
    let max = -1;
    for (let i = 0; i < json.length; i++) {
        var dadoAlerta = Math.round((json[i].alerta) * 100) / 100;
        var dadoCritico = Math.round((json[i].critico) * 100) / 100;

        alerta.push(dadoAlerta)
        critico.push(dadoCritico)
        labels.push(json[i].tipo)

        if (dadoAlerta >= max) {
            max = dadoAlerta;
        }
        if (dadoCritico >= max) {
            max = dadoCritico;
        }
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
            text: 'Quantidade de ocorrências',
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