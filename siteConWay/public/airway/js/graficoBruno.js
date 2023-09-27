function exibirQuantidadeTotens() {

}

function exibirInfoTotem() {

}

function exibirMunicipios() {
    var estado = (document.getElementById("select-estado")).value;

    fetch(`/graficoBruno/exibirMunicipios/${estado}`).then(function (resposta) {
        console.log("ESTOU NO THEN DO exibirInfoTotem()!");

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                
            });
        } else {
        
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });
    return false;
}