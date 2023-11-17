function cadastrarMetricas(){
    var fkTtotemVar = sessionStorage.FK_TOTEM;
    var fkComponenteVar = sessionStorage.FK_COMPONETE;
    var alertaCpuVar =  ipt_limiteAlertaCpu.value;
    var criticoCpuVar = ipt_limiteCriticoCpu.value;
    var alertaMemoVar = ipt_limiteAlertaMemo.value;
    var criticoMemoVar = ipt_limiteCriticoMemo.value;
    var alertaDiscoVar = ipt_limiteAlertaDisco.value;
    var criticoDiscoVar = ipt_limiteCriticoDisco.value;

   fetch(`/totem/cadastrarMetricas`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        fkTtotemServer: fkTtotemVar,
        fkComponenteServer: fkComponenteVar,
        alertaCpuServer: alertaCpuVar,
        criticoCpuServer: criticoCpuVar,
        alertaMemoServer: alertaMemoVar,
        criticoMemoServer: criticoMemoVar,
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
        cardMsg.innerHTML = "❌Erro ao cadastrar totem! Tente novamente...❌";
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