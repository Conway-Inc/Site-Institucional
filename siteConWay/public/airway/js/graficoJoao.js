var totalTotensEmpresa = 0;
var totensEstaveis = 0;
var componentesAtencao = 0;
var componentesCritico = 0;
var totensAlerta = 0;

function buscarInformacoes(){
    buscarUltimosAlertasComponentes()
    buscarTotensEmAlerta()
    plotarKPIs()
    plotarGraficoEstadoTotens()
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

function buscarTotensEmAlerta() {

    fetch(`/graficoJoao/buscarTotensEmAlerta/${sessionStorage.FK_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado!!");
            }
            resposta.json().then(function (resposta) {

                totensAlerta =  resposta.length

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function buscarUltimosAlertasComponentes() {

    fetch(`/graficoJoao/buscarUltimosAlertasComponentes/${sessionStorage.FK_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado!!");
            }
            resposta.json().then(function (resposta) {

                for (let i = 0; i < resposta.length; i++) {

                    var dados = resposta[i];
            
                    var tabela = document.getElementById("dataTable");
            
                    var tdAeroporto = document.createElement("td");
                    tdAeroporto.setAttribute("scope", "row");
                    tdAeroporto.innerHTML = dados.nomeAeroporto;
            
                    var tdTotem = document.createElement("td");
                    tdTotem.setAttribute("scope", "row");
                    tdTotem.innerHTML = dados.nomeTotem;
            
                    var tdComponente = document.createElement("td");
                    tdComponente.setAttribute("scope", "row");
                    tdComponente.innerHTML = dados.nomeComponente;
            
                    var tdValor = document.createElement("td");
                    tdValor.setAttribute("scope", "row");
                    tdValor.innerHTML = parseInt(dados.valor);
            
                    // var tdDataHora = document.createElement("td");
                    // tdDataHora.setAttribute("scope", "row");
                    // tdDataHora.innerHTML = dados.dataHora;
            
                    var tdIndicador = document.createElement("td");
                    tdIndicador.setAttribute("scope", "row");
            
                    if (dados.tipoAlerta == 1) {
            
                        var iIndicador = document.createElement("td");
                        iIndicador.setAttribute("class", "fas fa-circle text-danger");
                        componentesCritico++
            
                    } else {
            
                        var iIndicador = document.createElement("td");
                        iIndicador.setAttribute("class", "fas fa-circle text-warning");
                        componentesAtencao++
            
                    }
            
            
                    var tr = document.createElement("tr");
                    var tbody = document.createElement("tbody");
                    tbody.setAttribute("id", "tbodyTable")
            
                    tr.appendChild(tdAeroporto);
                    tr.appendChild(tdTotem);
                    tr.appendChild(tdComponente);
                    tr.appendChild(tdValor);
                    // tr.appendChild(tdDataHora);
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

function plotarKPIs(){

    fetch(`/graficoJoao/buscarTotalTotensEmpresa/${sessionStorage.FK_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado!!");
            }
            resposta.json().then(function (resposta) {

                totalTotensEmpresa = Number(resposta[0].qtdTotens)
                
                totensEstaveis = totalTotensEmpresa-totensAlerta
            
                taxaAlerta = (totensAlerta*100)/totalTotensEmpresa
                taxaEfetividade = 100-taxaAlerta

                divEfetividade.innerHTML = `${Math.round(taxaEfetividade)}%`;

                var progressoEfetividade = document.querySelector('#progressoEfetividade');
                progressoEfetividade.setAttribute("style", `width: ${taxaEfetividade}%`)
                
                divTotensAtencao.innerHTML = componentesAtencao;
                divTotensCritico.innerHTML = componentesCritico;
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

function plotarTabelaAlertaComponentes(){
    
}


function plotarGraficoEstadoTotens(){

    var options = {
        series: [44, 55, 13, 43, 22],
        chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Estável', 'Atencão', 'Crítico'],
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
