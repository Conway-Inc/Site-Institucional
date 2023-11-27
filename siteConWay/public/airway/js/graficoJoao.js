
// var intervalId = setInterval(buscarInformacoes, 3000);

var totalTotensEmpresa = 0;
var totensEstaveis = 0;
var totensAtencao = 0;
var totensCritico = 0;

var dadosGrafico = [totensCritico, totensAtencao, totensEstaveis]

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

    var tabela = document.getElementById("dataTable");
    
    tabela.innerHTML = ""

    var tr = document.createElement("tr");

    var thAeroporto = document.createElement("th");
    thAeroporto.innerHTML = "Aeroporto"

    var thTotem = document.createElement("th");
    thTotem.innerHTML = "Totem"
    
    
    var thIndicador = document.createElement("th");
    thIndicador.innerHTML = "Indicador"

    tr.appendChild(thAeroporto)
    tr.appendChild(thTotem)
    tr.appendChild(thIndicador)
    tabela.appendChild(tr)



    

    fetch(`/graficoJoao/buscarAlertasTotensCritico/${sessionStorage.FK_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum alerta crítico encontrado!!");
                dadosGrafico[0] = 0
                divTotalTotensCritico.innerHTML = 0

            }
            resposta.json().then(function (resposta) {
                totensCritico = Number(resposta.length)
                divTotalTotensCritico.innerHTML = totensCritico
                dadosGrafico[0] = totensCritico

                var tbodyCritico = document.createElement("tbody");
                tbodyCritico.setAttribute("id", "tbodyTableCritico")
                
                for (let i = 0; i < resposta.length; i++) {
                    
                    var dados = resposta[i];

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
                    tbodyCritico.appendChild(tr)
                    tabela.appendChild(tbodyCritico)
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
                console.log("Nenhum alerta de atenção encontrado!!");
                dadosGrafico[1] = 0
                divTotalTotensAtencao.innerHTML = 0

            }
            resposta.json().then(function (resposta) {
                totensAtencao = Number(resposta.length)
                divTotalTotensAtencao.innerHTML = totensAtencao
                dadosGrafico[1] = totensAtencao

                divAtencaoTotalTotens.innerHTML = `/${totalTotensEmpresa}`;

                var tbodyAtencao = document.createElement("tbody");
                tbodyAtencao.setAttribute("id", "tbodyTableAtencao")

                for (let i = 0; i < resposta.length; i++) {

                    var dados = resposta[i];

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

                    tr.appendChild(tdAeroporto);
                    tr.appendChild(tdTotem);
                    tdIndicador.appendChild(iIndicador)
                    tr.appendChild(tdIndicador);
                    tbodyAtencao.appendChild(tr)
                    tabela.appendChild(tbodyAtencao)
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
            }
            resposta.json().then(function (resposta) {
                
                totalTotensEmpresa = 0;
                totalTotensEmpresa = Number(resposta[0].qtdTotens)

                divAtencaoTotalTotens.innerHTML = `/${totalTotensEmpresa}`;
                divCriticoTotalTotens.innerHTML = `/${totalTotensEmpresa}`;

                totensEmAlerta = dadosGrafico[1]+dadosGrafico[0]

                totensEstaveis = Number(totalTotensEmpresa - totensEmAlerta)

                taxaAlerta = (totensEmAlerta * 100) / totalTotensEmpresa
                taxaEfetividade = 100 - taxaAlerta

                divEfetividade.innerHTML = `${Math.round(taxaEfetividade)}%`;

                var progressoEfetividade = document.querySelector('#progressoEfetividade');
                progressoEfetividade.setAttribute("style", `width: ${taxaEfetividade}%`)

                dadosGrafico[2] = totensEstaveis
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

    var divGrafico = document.getElementById("graficoEstadoTotens");
    divGrafico.innerHTML = ""

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
