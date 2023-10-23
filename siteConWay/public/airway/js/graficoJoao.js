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

function exibirUltimosAlertas() {

    fetch(`/graficoJoao/exibirUltimosAlertas/${sessionStorage.FK_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado!!");
            }
            resposta.json().then(function (resposta) {

                console.log(resposta)

                for (let i = 0; i < resposta.length; i++) {

                        // Contando totens e inserindo nas KPIS



                        //Inserindo totens na tabela de totens em alerta

                        var tabela = document.getElementById("dataTable");
                        var dados = resposta[i];

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
                        tdValor.innerHTML = dados.valor;

                        // var tdDataHora = document.createElement("td");
                        // tdDataHora.setAttribute("scope", "row");
                        // tdDataHora.innerHTML = dados.dataHora;

                        var tdIndicador = document.createElement("td");
                        tdIndicador.setAttribute("scope", "row");

                        if (dados.tipoAlerta == 1){

                            var iIndicador = document.createElement("td");
                            iIndicador.setAttribute("class", "fas fa-circle text-danger");

                        } else {

                            var iIndicador = document.createElement("td");
                            iIndicador.setAttribute("class", "fas fa-circle text-warning");

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
