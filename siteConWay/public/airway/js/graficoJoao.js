function exibirRegistrosTotens() {

    fetch(`/graficoJoao/exibirRegistrosTotens/${sessionStorage.FK_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado!!");
            }
            resposta.json().then(function (resposta) {
                console.log(resposta)
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
                console.log(resposta)
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function exibirUltimosAlertas(idEmpresa) {

    fetch(`/graficoJoao/exibirUltimosAlertas/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado!!");
            }
            resposta.json().then(function (resposta) {
                console.log(resposta)
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}
