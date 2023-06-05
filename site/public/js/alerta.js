var alertas = [];

function alertar(rotas) {

    // abaixo de 30
    for (let i = 0; i <= 30; i++) {

    }

}

function exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idAquario == idAquario);

    if (indice >= 0) {
        alertas[indice] = { idAquario, temp, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idAquario, temp, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
}

function removerAlerta(idAquario) {
    alertas = alertas.filter(item => item.idAquario != idAquario);
    exibirCards();
}

function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv(codlinha) {

    return `
    <div class="mensagem-alarme">
        <div class="informacao">
            <div style"color: '#DB0300'">&#12644;</div> 
            <h3>${codLinha} está ruim!</h3>
            <small>Otimização ${pctOtimizacao}%</small>   
        </div>
        <div class="alarme-sino"></div>
    </div>
    `;
}