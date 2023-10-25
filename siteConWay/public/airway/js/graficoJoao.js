    setTimeout(function() {
      location.reload();
    }, 3000);

var totalTotensEmpresa = 0;

var totensEstaveis = 0;

var totensAtencao = 0;
var totensCritico = 0;

var dadosGrafico = []

function buscarInformacoes() {
    plotarTabelaAlertas()
    plotarKPIs()
    
    
}

function exibirRegistrosTotens() {

    fetch(`/graficoJoao/exibirRegistrosTotens/${sessionStorage.FK_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado!!");
            }
            resposta.json().then(function (resposta) {
                // console.log(resposta)
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function exibirRegistrosTotemID(idTotem) {

    fetch(`/graficoJoao/exibirRegistrosTotemID/${idTotem}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado!!");
            }
            resposta.json().then(function (resposta) {
                // console.log(resposta)
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function plotarTabelaAlertas() {

    fetch(`/graficoJoao/buscarAlertasTotensCritico/${sessionStorage.FK_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado!!");
                dadosGrafico.push(0)
            }
            resposta.json().then(function (resposta) {
                totensCritico = 0;
                totensCritico = Number(resposta.length)
                divTotensCritico.innerHTML = totensCritico
                dadosGrafico.push(totensCritico)

                for (let i = 0; i < resposta.length; i++) {

                    var dados = resposta[i];

                    var tabela = document.getElementById("dataTable");

                    var tdAeroporto = document.createElement("td");
                    tdAeroporto.setAttribute("scope", "row");
                    tdAeroporto.innerHTML = dados.nomeAeroporto;

                    var tdTotem = document.createElement("td");
                    tdTotem.setAttribute("scope", "row");
                    tdTotem.innerHTML = dados.nomeTotem;

                    var tdIndicador = document.createElement("td");
                    tdIndicador.setAttribute("scope", "row");
                    var iIndicador = document.createElement("td");
                    iIndicador.setAttribute("class", "fas fa-circle text-danger");


                    var tr = document.createElement("tr");
                    var tbody = document.createElement("tbody");
                    tbody.setAttribute("id", "tbodyTable")

                    tr.appendChild(tdAeroporto);
                    tr.appendChild(tdTotem);
                    tdIndicador.appendChild(iIndicador)
                    tr.appendChild(tdIndicador);
                    tbody.appendChild(tr)
                    tabela.appendChild(tbody)
                }
                $(document).ready(function () {
                    $('#dataTable').DataTable();
                });


            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });

    fetch(`/graficoJoao/buscarAlertasTotensAtencao/${sessionStorage.FK_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado!!");
                dadosGrafico.push(0)
            }
            resposta.json().then(function (resposta) {
                totensAtencao = 0;
                totensAtencao = Number(resposta.length)
                divTotensAtencao.innerHTML = totensAtencao
                dadosGrafico.push(totensAtencao)

                for (let i = 0; i < resposta.length; i++) {

                    var dados = resposta[i];

                    var tabela = document.getElementById("dataTable");

                    var tdAeroporto = document.createElement("td");
                    tdAeroporto.setAttribute("scope", "row");
                    tdAeroporto.innerHTML = dados.nomeAeroporto;

                    var tdTotem = document.createElement("td");
                    tdTotem.setAttribute("scope", "row");
                    tdTotem.innerHTML = dados.nomeTotem;

                    var tdIndicador = document.createElement("td");
                    tdIndicador.setAttribute("scope", "row");
                    var iIndicador = document.createElement("td");
                    iIndicador.setAttribute("class", "fas fa-circle text-warning");


                    var tr = document.createElement("tr");
                    var tbody = document.createElement("tbody");
                    tbody.setAttribute("id", "tbodyTable")

                    tr.appendChild(tdAeroporto);
                    tr.appendChild(tdTotem);
                    tdIndicador.appendChild(iIndicador)
                    tr.appendChild(tdIndicador);
                    tbody.appendChild(tr)
                    tabela.appendChild(tbody)
                }
                $(document).ready(function () {
                    $('#dataTable').DataTable();
                });

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function plotarKPIs() {

    fetch(`/graficoJoao/buscarTotalTotensEmpresa/${sessionStorage.FK_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado!!");
                dadosGrafico.push(0)
            }
            resposta.json().then(function (resposta) {
                
                totalTotensEmpresa = 0;
                totalTotensEmpresa = Number(resposta[0].qtdTotens)

                totensEmAlerta = totensAtencao+totensCritico

                totensEstaveis = Number(totalTotensEmpresa - totensEmAlerta)

                taxaAlerta = (totensEmAlerta * 100) / totalTotensEmpresa
                taxaEfetividade = 100 - taxaAlerta

                divEfetividade.innerHTML = `${Math.round(taxaEfetividade)}%`;

                var progressoEfetividade = document.querySelector('#progressoEfetividade');
                progressoEfetividade.setAttribute("style", `width: ${taxaEfetividade}%`)

                dadosGrafico.push(totensEstaveis)
                plotarGraficoEstadoTotens(dadosGrafico)

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });

    fetch(`/graficoJoao/buscarTotemMaisProblematico/${sessionStorage.FK_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado!!");
            }
            resposta.json().then(function (resposta) {

                divTotemProblematico.innerHTML = resposta[0].nomeTotem
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });

}


function plotarGraficoEstadoTotens(dadosGrafico) {

    var options = {
        series: dadosGrafico,
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ['Crítico', 'Atencão', 'Estável'],
        colors: ['#e74a3b', '#f6c23e', '#3ebd47'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    var chart = new ApexCharts(document.getElementById("graficoEstadoTotens"), options);
    chart.render();

}
