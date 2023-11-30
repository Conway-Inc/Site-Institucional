var compMaisProblematico = [];
var maiorRegistro = [];

function buscarMaiorRegistro() {
    fetch(`/graficoKauan/buscarMaiorRegistro`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (let i = 0; i < resposta.length; i++) {
                    maiorRegistro[i] = resposta[i].max_valor
                    console.log(maiorRegistro[i])
                }
                buscarCompProblematico()
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function buscarCompProblematico() {

    fetch(`/graficoKauan/buscarCompProblematico`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum componente encontrado!!");
            }
            resposta.json().then(function (resposta) {

                for (let i = 0; i < resposta.length; i++) {

                    if (resposta[i].componente_mais_problematico == 1) {
                        compMaisProblematico[i] = "CPU"
                    } else if (resposta[i].componente_mais_problematico == 2) {
                        compMaisProblematico[i] = "Memória"
                    } else if (resposta[i].componente_mais_problematico == 3) {
                        compMaisProblematico[i] = "Disco"
                    }
                }
                plotarTabelaAlertas()
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function plotarTabelaAlertas() {

    var tabela = document.getElementById("dataTable");

    tabela.innerHTML = ""

    var tr = document.createElement("tr");

    var thTotem = document.createElement("th");
    thTotem.innerHTML = "Totem"

    var thQtdOcorrenciaCpu = document.createElement("th");
    thQtdOcorrenciaCpu.innerHTML = "Quantidade de ocorrência CPU"

    var thQtdOcorrenciaMem = document.createElement("th");
    thQtdOcorrenciaMem.innerHTML = "Quantidade de ocorrência MEM"

    var thQtdOcorrenciaDisco = document.createElement("th");
    thQtdOcorrenciaDisco.innerHTML = "Quantidade de ocorrência Disco"

    var thComponenteProblematico = document.createElement("th");
    thComponenteProblematico.innerHTML = "Componente mais problemático"


    var thMaiorRegistro = document.createElement("th");
    thMaiorRegistro.innerHTML = "Maior Registro do componente mais problemático"

    tr.appendChild(thTotem)
    tr.appendChild(thQtdOcorrenciaCpu)
    tr.appendChild(thQtdOcorrenciaMem)
    tr.appendChild(thQtdOcorrenciaDisco)
    tr.appendChild(thComponenteProblematico)
    tr.appendChild(thMaiorRegistro)
    tabela.appendChild(tr)

    fetch(`/graficoKauan/buscarTotens`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum alerta crítico encontrado!!");

            }
            resposta.json().then(function (resposta) {

                var tbody = document.createElement("tbody");
                tbody.setAttribute("id", "tbodyTable")

                for (let i = 0; i < resposta.length; i++) {

                    var dados = resposta[i];

                    var tdTotem = document.createElement("td");
                    tdTotem.setAttribute("scope", "row");
                    tdTotem.innerHTML = "<img src=' ../img/totem.png' style='width: 15%';></img>"
                    tdTotem.innerHTML += dados.nome;
                    tdTotem.setAttribute("id", `${i + 1}`)
                    tdTotem.setAttribute("onclick", `plotarGrafico(${i + 1})`)
                    tdTotem.style.cursor = "pointer"


                    var tdQtdOcorrenciaCpu = document.createElement("td");
                    tdQtdOcorrenciaCpu.setAttribute("scope", "row");
                    tdQtdOcorrenciaCpu.innerHTML = dados.alertaCpu;

                    var tdQtdOcorrenciaMemoria = document.createElement("td");
                    tdQtdOcorrenciaMemoria.setAttribute("scope", "row");
                    tdQtdOcorrenciaMemoria.innerHTML = dados.alertaMem;

                    var tdQtdOcorrenciaDisco = document.createElement("td");
                    tdQtdOcorrenciaDisco.setAttribute("scope", "row");
                    tdQtdOcorrenciaDisco.innerHTML = dados.alertaDisco;

                    var tdComponenteProblematico = document.createElement("td");
                    tdComponenteProblematico.setAttribute("scope", "row");
                    tdComponenteProblematico.innerHTML = compMaisProblematico[i]

                    var tdMaiorRegistro = document.createElement("td");
                    tdMaiorRegistro.setAttribute("scope", "row");
                    tdMaiorRegistro.innerHTML = maiorRegistro[i]

                    var tbody = document.createElement("tbody");
                    var tr = document.createElement("tr");
                    tbody.setAttribute("id", "tbodyTable")

                    tr.appendChild(tdTotem);
                    tr.appendChild(tdQtdOcorrenciaCpu);
                    tr.appendChild(tdQtdOcorrenciaMemoria);
                    tr.appendChild(tdQtdOcorrenciaDisco);
                    tr.appendChild(tdComponenteProblematico);
                    tr.appendChild(tdMaiorRegistro);
                    tbody.appendChild(tr)
                    tabela.appendChild(tbody)
                }


            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });

}

function pegarIdUrl(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('idTotem')
    plotarGrafico(id)
}

function plotarGrafico(id) {
    let limite =document.getElementById("iptLimiteRegistro")
    
    sessionStorage.setItem('ID_TOTEM', id)
    fetch(`/graficoKauan/plotarGrafico/${id}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {

                var dadosCpu = []
                var dadosMemoria = []
                var data = []

                for (let i = 0; i < limite-1; i++) {
                    dadosCpu[i] = Number(resposta[i].cpu);
                    dadosMemoria[i] = Number(resposta[i].memoria);
                    data[i] = resposta[i].data
                }

                console.log(dadosCpu)
                console.log(dadosMemoria)
                console.log(data)

                var divGraficoComponente = document.getElementById("divGraficoComponente");
                divGraficoComponente.innerHTML = ""

                var options = {
                    series: [{
                        name: "CPU",
                        data: dadosCpu
                    },
                    {
                        name: "Memoria",
                        data: dadosMemoria
                    }],
                    chart: {
                        height: 350,
                        width: 650,
                        type: 'line',
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    title: {
                        text: 'Registros',
                        align: 'center'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'],
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        name: "Data",
                        categories: data,
                    }
                };
                var chart = new ApexCharts(document.getElementById("divGraficoComponente"), options);
                chart.render();

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

