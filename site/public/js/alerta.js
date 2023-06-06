

function alertar(rotas) {
    console.log(rotas)
    // abaixo de 30
    for (let i = 0; i < rotas.length; i++) {
        if (rotas[i].pctOtimizacao < 300) {
            exibirCards(rotas[i].codLinha, rotas[i].pctOtimizacao)
        }
    }

}

function exibirCards(codLinha, pctOtimizacao) {

    conteudos = document.getElementById("conteudos")
    console.log(conteudos)

        var alerta = document.createElement("div");
        alerta.innerHTML = `<div class="mensagem-alarme">
        <div class="informacao">
            <h3>${codLinha} está ruim!</h3>
            <small>Otimização ${pctOtimizacao}%</small>   
            </div>
            <div class="alarme-sino"></div>
    </div>
    `;
        console.log(alerta)
        conteudos.appendChild(alerta)
}