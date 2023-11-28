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
    
            //   linkConfiraTotens.addEventListener("click", (function (publicacao) {
            //     return function () {
            //       selecionarManutencao(publicacao.idTotem, publicacao.aeroportoTotem, publicacao.nome);
            //     };
            //   })(publicacao));
    
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
  
          //   linkConfiraTotens.addEventListener("click", (function (publicacao) {
          //     return function () {
          //       selecionarManutencao(publicacao.idTotem, publicacao.aeroportoTotem, publicacao.nome);
          //     };
          //   })(publicacao));
  
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
            type: 'line', // ou outro tipo de gráfico desejado
        },
        series: [{
            name: 'Exemplo',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
    };

    var chart = new ApexCharts(document.querySelector("#temReal"), options);
    chart.render();
}