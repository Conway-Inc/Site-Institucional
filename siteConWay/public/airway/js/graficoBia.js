getValorTotalTotens();
getValorTotalTotensAlerta();
getValorTotalTotensCritico();

var qtdTotal_totens;
var valorTotensAtencao;
var valorTotensCritico;

function atualizarValorTotalTotens(valor) {
  var divElement = document.getElementById("qtdTotal_totens");
  if (divElement) {
    divElement.innerHTML = valor;
  }
}

function atualizarValorTotalTotensKpi2(valor) {
  var divElement = document.getElementById("qtdTotal_totens2");
  if (divElement) {
    divElement.innerHTML = valor;
  }
}

function atualizarValorTotensAlerta(valor) {
  var divElement = document.getElementById("valorTotensAtencao");
  if (divElement) {
    divElement.innerHTML = valor;
  }
}

function atualizarValorTotensCritico(valor) {
  var divElement = document.getElementById("valorTotensCritico");
  if (divElement) {
    divElement.innerHTML = valor;
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
    console.log(res)
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Erro na requisição.");
    }
  }).then((data) => {
    console.log(data);
    qtdTotal_totens = data[0].quantidadeTotensCount;
    
    atualizarValorTotalTotens(qtdTotal_totens);
    atualizarValorTotalTotensKpi2(qtdTotal_totens);

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
    console.log(res);
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

    valorTotensCritico = data[0].quantidadeRegistrosCriticoCount;
    
    atualizarValorTotensCritico(valorTotensCritico);

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
    
              tdMonitorar.addEventListener("click", (function (publicacao) {
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
                alert(publicacao.idTotem + " "+ publicacao.nomeTotem);
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

function plotarTemperaturaAtualizada(temperatura, idTotem){
  var idTotem = sessionStorage.ID_TOTEM_SELECIONADO;

  // Recupere o contexto do canvas onde o gráfico está renderizado
  const ctx = document.getElementById('myChart').getContext('2d');

  fetch(`/graficoBia/plotarTemperaturaAtualizada/${idTotem}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Nenhum dado encontrado ou erro na API");
      }
    })
    .then(function (resposta) {
      console.log(`Dados recebidos CPU: ${JSON.stringify(resposta)}`);
      
      // Assuma que a resposta contém dados no formato esperado
      const temperatura = resposta;

      // Atualize os dados do gráfico
      myGrafico.data.labels = temperatura.map(item => ""); // Adicione rótulos de tempo (ou use uma abordagem diferente)
      myGrafico.data.datasets[0].data = temperatura.map(item => item.temperaturaAtualizada);

      // Atualize o gráfico
      myGrafico.update();
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados: ${error.message}`);
    });
  
    // Atualize os dados do gráfico
    myGrafico.data.labels.push(""); // Adicione um rótulo de tempo (ou use uma abordagem diferente)
    myGrafico.data.datasets[0].data.push(temperatura[0].temperaturaAtualizada);

    // Limita o número de pontos no gráfico, se necessário
    const maxDataPoints = 10;
    if (myGrafico.data.labels.length > maxDataPoints) {
        myGrafico.data.labels.shift();
        myGrafico.data.datasets[0].data.shift();
    }

    // Atualize o gráfico
    myGrafico.update();
}

const ctx = document.getElementById('myChart');
const myGrafico = new Chart(ctx, {
  type: 'line',
  data: {
      labels: [],
      datasets: [{
          label: '#Temperatura',
          data: [],
          borderWidth: 1,
          borderColor: "blue",
          pointBackgroundColor: "blue",
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
});

plotarTemperaturaAtualizada();

function selecionarTotem(idTotem, nomeTotem){
  sessionStorage.ID_TOTEM_SELECIONADO = idTotem;
  sessionStorage.NOME_TOTEM = nomeTotem;

  window.location.href = 'dashTemperaturaAtual.html'
}