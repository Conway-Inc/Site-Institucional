
getValorTotalTotens();
getValorTotalTotensAlerta();
getValorTotalTotensCritico();

var qtdTotal_totens;
var valorTotensAtencao;
var valorTotensCritico;

function atualizarValorTotalTotens(valor) {
  var divElement = document.getElementById("qtdTotal_totens");
  if (divElement) {
    divElement.innerText = valor;
    console.log("oiiii");
  }
}

function atualizarValorTotensAlerta(valor) {
  var divElement = document.getElementById("valorTotensAtencao");
  if (divElement) {
    divElement.innerText = valor;
  }
}

function atualizarValorTotensCritico(valor) {
  var divElement = document.getElementById("valorTotensCritico");
  if (divElement) {
    divElement.innerText = valor;
  }
}

function getValorTotalTotens(){
  var fkEmpresa = sessionStorage.FK_EMPRESA;
  
  fetch('/graficoBia/getValorTotalTotens',{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "fkEmpresaServer": fkEmpresa
    })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Erro na requisição.");
    }
  }).then((data) => {
    console.log(data);

    qtdTotal_totens = data[0].quantidadeTotensCount;
    
    atualizarValorTotalTotens(qtdTotal_totens);

  }).catch(function (erro) {
    console.log("Erro na requisição: ", erro);
  });
}

function getValorTotalTotensAlerta(){
  var fkEmpresa = sessionStorage.FK_EMPRESA;
  
  fetch('/graficoBia/getValorTotalTotensAlerta',{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "fkEmpresaServer": fkEmpresa
    })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Erro na requisição.");
    }
  }).then((data) => {
    console.log(data);

    valorTotensAtencao = data[0].quantidadeRegistrosAlertaCount;
    
    atualizarValorTotensAlerta(valorTotensAtencao);

  }).catch(function (erro) {
    console.log("Erro na requisição: ", erro);
  });
}

function getValorTotalTotensCritico(){
  var fkEmpresa = sessionStorage.FK_EMPRESA;
  
  fetch('/graficoBia/getValorTotalTotensCritico',{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "fkEmpresaServer": fkEmpresa
    })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Erro na requisição.");
    }
  }).then((data) => {
    console.log(data);

    valorTotensAtencao = data[0].quantidade_registrosCritico;
    
    atualizarValorTotensAlerta(valorTotensCritico);

  }).catch(function (erro) {
    console.log("Erro na requisição: ", erro);
  });
}


function exibirTabelaTotensTemperaturaAlerta() {
    fetch(`/graficoBia/exibirTabelaTotensTemperaturaAlerta/${sessionStorage.FK_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
          if (resposta.status == 204) {
            var lista = document.getElementById("AlertaTemp");
            var mensagem = document.createElement("p");
            mensagem.innerHTML = "Nenhum resultado encontrado.";
            lista.innerHTML = "";
            lista.appendChild(mensagem);
            throw "Nenhum resultado encontrado!!";
          }
          resposta.json().then(function (resposta) {
            var contId = 0;
            console.log(resposta)
            for (let i = resposta.length - 1; i >= 0; i--) {
              var lista = document.getElementById("AlertaTemp");
              var publicacao = resposta[i];
    
              var thNumero = document.createElement("th");
              thNumero.innerHTML = publicacao.idTotem;
              thNumero.setAttribute("scope", "row");
              var tdNome = document.createElement("td");
              tdNome.innerHTML = publicacao.nomeTotem;
              var tdTemperatura = document.createElement("td");
              tdTemperatura.innerHTML = publicacao.temperatura;
              var tdMonitorar = document.createElement("td");

              var button = document.createElement("button");
              button.innerHTML = "Acompanhar Temperatura";
    
              var tr = document.createElement("tr");
              var tbody = document.getElementById("tbodyTable");
    
              tdMonitorar.addEventListener("onclick", (function (publicacao) {
                return function () {
                  selecionarTotem(publicacao.idTotem, publicacao.nomeTotem);
                };
              })(publicacao));
    
              tdMonitorar.appendChild(button);
    
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

function exibirTabelaTotensTemperaturaCritico() {
  fetch(`/graficoBia/exibirTabelaTotensTemperaturaCritico/${sessionStorage.FK_EMPRESA}`).then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          var lista = document.getElementById("CriticoTemp");
          var mensagem = document.createElement("p");
          mensagem.innerHTML = "Nenhum resultado encontrado.";
          lista.innerHTML = "";
          lista.appendChild(mensagem);
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          var contId = 0;
          console.log(resposta)
          for (let i = resposta.length - 1; i >= 0; i--) {
            var lista = document.getElementById("CriticoTemp");
            var publicacao = resposta[i];
  
            var thNumero = document.createElement("th");
            thNumero.innerHTML = publicacao.idTotem;
            thNumero.setAttribute("scope", "row");
            var tdNome = document.createElement("td");
            tdNome.innerHTML = publicacao.nomeTotem;
            var tdTemperatura = document.createElement("td");
            tdTemperatura.innerHTML = publicacao.temperatura;
            var tdMonitorar = document.createElement("td");

            var button = document.createElement("button");
            button.innerHTML = "Acompanhar Temperatura";
  
            var tr = document.createElement("tr");
            var tbody = document.getElementById("tbodyTable");

            tdMonitorar.addEventListener("onclick", (function (publicacao) {
              return function () {
                selecionarTotem(publicacao.idTotem, publicacao.nomeTotem);
              };
            })(publicacao));
  
            tdMonitorar.appendChild(button);
  
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

function inicializarGrafico() {
    var options = {
        chart: {
            type: 'line', // tipo d0 gráfico 
            height: '100%', 
            width: '95%'
        },
        series: [{
            name: 'Exemplo',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
    };

    var chart = new ApexCharts(document.querySelector("#temReal"), options);
    chart.render();
}

function selecionarTotem(idTotem, nomeTotem){
  sessionStorage.ID_TOTEM_SELECIONADO = idTotem;
  sessionStorage.NOME_TOTEM = nomeTotem;

  window.location.href = 'dashTemperaturaAtual.html'
}