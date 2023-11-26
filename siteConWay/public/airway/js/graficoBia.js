function exibirTabelaTotensTemperaturaAlerta() {
    fetch(`/graficoBia/exibirTabelaTotensTemperaturaAlerta/${sessionStorage.FK_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var lista = document.getElementById("dataTotem");
                var mensagem = document.createElement("p");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                lista.innerHTML = "";
                lista.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                var contId = 0;
                for (let i = resposta.length - 1; i >= 0; i--) {
                    console.log(i)
                    console.log(publicacao)
                    var lista = document.getElementById("dataTotem");
                    var publicacao = resposta[i];

                    var thNumero = document.createElement("th");
                    thNumero.innerHTML = publicacao.idTotem;
                    thNumero.setAttribute("scope", "row");
                    var tdNome = document.createElement("td");
                    tdNome.innerHTML = publicacao.nome;
                    var tdTemperatura = document.createElement("td");
                    tdTemperatura.innerHTML = publicacao.valor;
                    var tdMonitorar = document.createElement("td");

                    // Criar sempre o elemento button
                    var button = document.createElement("button");
                    button.innerHTML = "Acompanhar Temperatura";

                    tdMonitorar.appendChild(button);

                    var tr = document.createElement("tr");
                    var tbody = document.getElementById("tbodyTable");

                    tr.appendChild(thNumero);
                    tr.appendChild(tdNome);
                    tr.appendChild(tdTemperatura);
                    tr.appendChild(tdMonitorar);
                    tbody.appendChild(tr);
                    lista.appendChild(tbody);

                    contId++;
                }
                // Chamar o plugin JQuery do dataTables 
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