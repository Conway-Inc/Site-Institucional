setInterval(() => {
    exibirInfoTotens()
}, 10000)


async function exibirInfoTotens(fkEmpresaVar) {
    paginaProcessos = document.getElementById("paginaListaProcessos");

    var fkEmpresaVar = sessionStorage.FK_EMPRESA;
    
    try {
        const respostaInfoTotens = await fetch(`/graficoPresilli/exibirInfoTotens/${fkEmpresaVar}`);

        if (respostaInfoTotens.ok) {
            const listaTotens = await respostaInfoTotens.json();
            var tbody = document.getElementById("tbodyTable");
            tbody.innerHTML = "";

            for (let i = 0; i < listaTotens.length; i++) {
                var lista = document.getElementById("totemProcessos");
                var publicacao = listaTotens[i];

                var tdIdtotem = document.createElement("td");
                tdIdtotem.innerHTML = publicacao.idTotem;

                var tdQuantidade = document.createElement("td");
                var tdCpu = document.createElement("td");
                var tdMemoria = document.createElement("td");
                var tdDisco = document.createElement("td");

                const respostaRegistros = await fetch(`/graficoPresilli/exibirRegistros/${publicacao.idTotem}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                if (respostaRegistros.ok) {
                    const registros = await respostaRegistros.json();
                    
                    for (let i = 0; i < registros.length; i++){
                        console.log(registros[i])
                        tdQuantidade.innerHTML = registros[i].ultimoQuantidadeProcesso;
                        tdCpu.innerHTML = registros[i].ultimoValorCpu || "0.0";
                        tdMemoria.innerHTML = registros[i].ultimoValorMemoria || "0.0";
                        tdDisco.innerHTML = registros[i].ultimoValorDisco || "0.0";
                    }
                    
                } else {
                    console.warn("Resposta não OK para exibirRegistros: ", respostaRegistros.status);
                    // Defina valores padrão em caso de erro
                    tdQuantidade.innerHTML = 0;
                    tdCpu.innerHTML = "0.0";
                    tdMemoria.innerHTML = "0.0";
                    tdDisco.innerHTML = "0.0";
                }

                var tdNome = document.createElement("td");
                tdNome.setAttribute("scope", "row");
                tdNome.innerHTML = publicacao.nome;

                var tdBotao = document.createElement("td");
                tdBotao.innerHTML += `<button class="btn btn-primary" onclick="infoProcessosTotem(${publicacao.idTotem})" id="botaoMonitorar">Monitorar</button>`;

                var tr = document.createElement("tr");
                tr.setAttribute("id", "trTabela");
                var tbody = document.getElementById("tbodyTable");

                tr.appendChild(tdIdtotem);
                tr.appendChild(tdNome);
                tr.appendChild(tdQuantidade);
                tr.appendChild(tdCpu);
                tr.appendChild(tdMemoria);
                tr.appendChild(tdDisco);
                tr.appendChild(tdBotao);
                tbody.appendChild(tr);
                lista.appendChild(tbody);
            }
        } else {
            throw new Error('Houve um erro na API para exibirInfoTotens!');
        }
    } catch (erro) {
        console.error(erro);
    }
}


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

// function exibirProcessos(idTotem) {


//     var listaData = [];
//     var listaQuantidade = [];


//     setInterval(() => {
//         fetch(`/graficoPresilli/exibirProcessos/${idTotem}`)
//             .then(function (resposta) {
//                 if (resposta.ok) {
//                     resposta.json().then(function (resposta) {

//                     });
//                 } else {
//                     throw ('Houve um erro na API!');
//                 }
//             }).catch(function (resposta) {
//                 console.error(resposta);
//             });
//     }, 10000)
//     plotarGrafico(listaData, listaQuantidade)
// }

function plotarGrafico(listaData, listaQuantidade) {
    var chartElement = document.querySelector("#chart");

    if (chartElement) {
        // Destruir a instância existente antes de criar um novo gráfico
        ApexCharts.exec("chart", "destroy");
    }

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
                name: "Quantidade Processos",
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

function voltar() {
    window.location.reload();
}

function infoProcessosTotem(idTotem) {
    paginaLista = document.getElementById("paginaListaTotens")
    paginaProcessos = document.getElementById("paginaListaProcessos")
    tituloTotem = document.getElementById("tituloTotem")

    paginaLista.style.display = "none"
    paginaListaProcessos.style.display = "flex"

    function fetchAndPlot() {
        var listaData = [];
        var listaQuantidade = [];

        fetch(`/graficoPresilli/infoProcessosTotem/${idTotem}`)
            .then(function (resposta) {
                if (resposta.ok) {
                    return resposta.json();
                } else {
                    throw ('Houve um erro na API!');
                }
            })
            .then(function (resposta) {
                for (let i = 0; i < resposta.length; i++) {
                    const dataHora = resposta[i].dataHora
                    const data = new Date(dataHora)
                    const dataFormatada = data.toLocaleString('pt-BR', {
                        timeZone: 'UTC',
                    });

                    var tituloTotem = document.getElementById("tituloTotem")
                    tituloTotem.innerHTML = `Nome do totem: ${resposta[i].nome}`

                    var nomeCpu = document.getElementById("nomeCpu")
                    nomeCpu.innerHTML = `${resposta[i].processoUsoCpu}`

                    var nomeMemoria = document.getElementById("nomeMemoria")
                    nomeMemoria.innerHTML = `${resposta[i].processoUsoMemoria}`

                    listaData.push(dataFormatada)
                    listaQuantidade.push(resposta[0].quantidadeProcesso)
                }

                // Chamada para plotarGrafico ocorre com os novos valores atualizados
                plotarGrafico(listaData, listaQuantidade);
            })
            .catch(function (erro) {
                console.error(erro);
            });
    }

    // Chame fetchAndPlot inicialmente para exibir os dados pela primeira vez
    fetchAndPlot();

    // Configurar setInterval para chamar fetchAndPlot a cada 5 segundos (por exemplo)
    var intervaloRepeticao = 5000; // em milissegundos (5 segundos neste exemplo)
    setInterval(fetchAndPlot, intervaloRepeticao);
}
