function exibirTotensProcesso(fkEmpresaVar) {
    var fkEmpresaVar = sessionStorage.FK_EMPRESA

    fetch(`/graficoPresilli/exibirTotensProcesso/${fkEmpresaVar}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log(resposta)
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
                        tdBotao.innerHTML += `<button class="btn btn-primary" id="botaoMonitorar">Monitorar</button>`

                        var tr = document.createElement("tr");
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
            // finalizarAguardar();
        });
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