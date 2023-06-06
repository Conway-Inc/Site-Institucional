function alertar(rotas) {
  console.log(rotas);
  // abaixo de 30
  for (let i = 0; i < rotas.length; i++) {
    if (rotas[i].pctOtimizacao < 300) {
      exibirCards(rotas[i].codLinha, rotas[i].pctOtimizacao, i);
    }
  }
}

function exibirCards(codLinha, pctOtimizacao, index) {
  body = document.getElementById("body");

  
  let mensagem = document.createElement("div");
  mensagem.className = "mensagem-alarme";
  mensagem.id = `alerta${index}`;

  let informacao = document.createElement("div");

  let estadoLinha = document.createElement("h3");
  estadoLinha.innerHTML = `${codLinha} está ruim!`;

  let otimizacao = document.createElement("small");
  otimizacao.innerHTML = `Otimização: ${pctOtimizacao}%`;

  let sino = document.createElement("div");
  sino.className = "alarme-sino";

  let btnFechar = document.createElement("p");
  btnFechar.innerHTML = "X";
  btnFechar.addEventListener("click", () => {
    excluirAlerta(index);
  });

  informacao.className = "informacao";
  
  mensagem.appendChild(informacao);
  informacao.appendChild(estadoLinha);
  informacao.appendChild(otimizacao);
  informacao.appendChild(sino);
  mensagem.appendChild(sino);
  mensagem.appendChild(btnFechar);

  body.appendChild(mensagem);
}

function excluirAlerta(index) {
  let alerta = document.getElementById(`alerta${index}`);
  alerta.remove();
}
