var jaExibiu = false;

function exibirTotensProcesso(fkEmpresaVar) {
    paginaProcessos = document.getElementById("paginaListaProcessos")

    var fkEmpresaVar = sessionStorage.FK_EMPRESA
    fetch(`/graficoPresilli/exibirTotensProcesso/${fkEmpresaVar}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log(resposta)
                    var tbody = document.getElementById("tbodyTable");
                    tbody.innerHTML = ""

                    for (let i = 0; i < resposta.length; i++) {
                        var lista = document.getElementById("totemProcessos");
                        var publicacao = resposta[i];

                        var tdIdtotem = document.createElement("td");
                        tdIdtotem.innerHTML = publicacao.idTotem;

                        var tdNome = document.createElement("td");
                        tdNome.setAttribute("scope", "row");
                        tdNome.innerHTML = publicacao.nome;


                        var tdQuantidade = document.createElement("td");
                        tdQuantidade.innerHTML = `${publicacao.Quantidade}
                        `;

                        var tdBotao = document.createElement("td")
                        tdBotao.innerHTML += `<button class="btn btn-primary" onclick="exibirProcessos(${publicacao.idTotem})" id="botaoMonitorar">Monitorar</button>`

                        var tr = document.createElement("tr");
                        tr.setAttribute("id", "trTabela");
                        var tbody = document.getElementById("tbodyTable");


                        tr.appendChild(tdIdtotem);
                        tr.appendChild(tdNome);
                        tr.appendChild(tdQuantidade);
                        tr.appendChild(tdBotao);
                        tbody.appendChild(tr);
                        lista.appendChild(tbody);
                    }
                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
        });

}


setInterval(() => {
    exibirTotensProcesso()
}, 5000)

function mostrarHoraAtual() {
    const DiasdaSemana = [
        "Domingo",
        "Segunda-Feira",
        "Terça-Feira",
        "Quarta-Feira",
        "Quinta-Feira",
        "Sexta-Feira",
        "Sábado"
    ]
    setInterval(() => {
        let data = new Date()

        tituloDash.innerHTML = `
        Dashboard Processos
        <h5>${DiasdaSemana[data.getDay()]} ${data.toLocaleString()}</h5>
        `
    }, 1000)
}

function exibirProcessos(idTotem) {
    paginaLista = document.getElementById("paginaListaTotens")
    paginaProcessos = document.getElementById("paginaListaProcessos")
    tituloTotem = document.getElementById("tituloTotem")

    fetch(`/graficoPresilli/exibirProcessos/${idTotem}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log(resposta)
                    paginaLista.style.display = "none"

                    paginaListaProcessos.style.display = "flex"

                    var listaData = [];
                    var listaQuantidade = [];

                    for (let i = 0; i < resposta.length; i++) {
                        const dataHora = resposta[i].dataHora
                        const data = new Date(dataHora)
                        const dataFormatada = data.toLocaleString('pt-BR', {
                            timeZone: 'UTC',
                        });

                        listaData.push(dataFormatada)

                        listaQuantidade.push(resposta[i].Quantidade)

                    }

                    plotarGrafico(listaData, listaQuantidade)

                    tituloTotem.innerHTML = `Nome do totem: ${resposta[0].nome}`
                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
        });
}

function plotarGrafico(listaData, listaQuantidade) {

    var options = {
        chart: {
            height: 350,
            type: "line",
            stacked: false
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#0D214F"],
        series: [
            {
                name: "Series A",
                data: listaQuantidade
            },
        ],
        stroke: {
            width: [4, 4]
        },
        plotOptions: {
            bar: {
                columnWidth: "30%"
            }
        },
        xaxis: {
            categories: listaData
        },
        yaxis: [
            {
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true,
                    color: "#0D214F"
                },
                labels: {
                    style: {
                        colors: "#0D214F"
                    }
                },
                title: {
                    text: "Quantidade Processso",
                    style: {
                        color: "#0D214F"
                    }
                }
            },
        ],
        tooltip: {
            shared: false,
            intersect: true,
            x: {
                show: false
            }
        },
        legend: {
            horizontalAlign: "left",
            offsetX: 40
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();

}

function voltar(){
    window.location.reload();
}