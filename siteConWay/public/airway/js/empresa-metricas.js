function cadastrarMetricasCpu(){
    var fkEmpresaVar = sessionStorage.FK_EMPRESA;
    var alertaCpuVar =  ipt_limiteAlertaCpu.value;
    var criticoCpuVar = ipt_limiteCriticoCpu.value;

   fetch(`/metricas/cadastrarMetricasCpu`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        fkEmpresaServer: fkEmpresaVar,
        alertaCpuServer: alertaCpuVar,
        criticoCpuServer: criticoCpuVar
    })
}).then(function (resposta) {
    console.log("resposta: ", resposta);
    if (resposta.ok) {
        resposta.json().then(json => {

            cardMsg.style.display = "block"
            cardMsg.style.border = "2px solid greenyellow"
            cardMsg.style.boxShadow = "0px 0px 12px black"
            cardMsg.style.color = "greenyellow"
            cardMsg.innerHTML = "✅Cadastro realizado com sucesso!✅";
        })
    } else {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.innerHTML = "❌Erro ao cadastrar Métricas! Tente novamente...❌";
        setTimeout(function () {
            //location.reload();
            cardMsg.style.display = "none";
        }, 3000);
    }

}).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`)
});
return false
}


function cadastrarMetricasMemo(){
    var fkEmpresaVar = sessionStorage.FK_EMPRESA;
    var alertaMemoVar = ipt_limiteAlertaMemo.value;
    var criticoMemoVar = ipt_limiteCriticoMemo.value;

   fetch(`/metricas/cadastrarMetricasMemo`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        fkEmpresaServer: fkEmpresaVar,
        alertaMemoServer: alertaMemoVar,
        criticoMemoServer: criticoMemoVar
    })
}).then(function (resposta) {
    console.log("resposta: ", resposta);
    if (resposta.ok) {
        resposta.json().then(json => {

            cardMsg.style.display = "block"
            cardMsg.style.border = "2px solid greenyellow"
            cardMsg.style.boxShadow = "0px 0px 12px black"
            cardMsg.style.color = "greenyellow"
            cardMsg.innerHTML = "✅Cadastro realizado com sucesso!✅";
        })
    } else {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.innerHTML = "❌Erro ao cadastrar Métricas! Tente novamente...❌";
        setTimeout(function () {
            //location.reload();
            cardMsg.style.display = "none";
        }, 3000);
    }

}).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`)
});
return false
}


function cadastrarMetricasDisco(){
    var fkEmpresaVar = sessionStorage.FK_EMPRESA;
    var alertaDiscoVar = ipt_limiteAlertaDisco.value;
    var criticoDiscoVar = ipt_limiteCriticoDisco.value;

   fetch(`/metricas/cadastrarMetricasDisco`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        fkEmpresaServer: fkEmpresaVar,
        alertaDiscoserver: alertaDiscoVar,
        criticoDiscoServer: criticoDiscoVar
    })
}).then(function (resposta) {
    console.log("resposta: ", resposta);
    if (resposta.ok) {
        resposta.json().then(json => {

            cardMsg.style.display = "block"
            cardMsg.style.border = "2px solid greenyellow"
            cardMsg.style.boxShadow = "0px 0px 12px black"
            cardMsg.style.color = "greenyellow"
            cardMsg.innerHTML = "✅Cadastro realizado com sucesso!✅";
        })
    } else {
        cardMsg.style.display = "block"
        cardMsg.style.border = "2px solid red"
        cardMsg.style.color = "red"
        cardMsg.innerHTML = "❌Erro ao cadastrar Métricas! Tente novamente...❌";
        setTimeout(function () {
            //location.reload();
            cardMsg.style.display = "none";
        }, 3000);
    }

}).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`)
});
return false
}