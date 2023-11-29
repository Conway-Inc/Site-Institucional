
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

function inicializarGrafico2(){
  am5.ready(function() {

  var root = am5.Root.new("chart2div");

  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "none",
    wheelY: "none",
    paddingLeft: 0
  }));

  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
  cursor.lineY.set("visible", false);

  var xRenderer = am5xy.AxisRendererX.new(root, { 
    minGridDistance: 30,
    minorGridEnabled: true
  });

  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    maxDeviation: 0,
    categoryField: "name",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
  }));

  xRenderer.grid.template.set("visible", false);

  var yRenderer = am5xy.AxisRendererY.new(root, {});
  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation: 0,
    min: 0,
    extraMax: 0.1,
    renderer: yRenderer
  }));

  yRenderer.grid.template.setAll({
    strokeDasharray: [2, 2]
  });

  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: "Series 1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    sequencedInterpolation: true,
    categoryXField: "name",
    tooltip: am5.Tooltip.new(root, { dy: -25, labelText: "{valueY}" })
  }));


  series.columns.template.setAll({
    cornerRadiusTL: 5,
    cornerRadiusTR: 5,
    strokeOpacity: 0
  });

  series.columns.template.adapters.add("fill", (fill, target) => {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  series.columns.template.adapters.add("stroke", (stroke, target) => {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  // Set data
  var data = [
    {
      name: "John",
      value: 35654,
      bulletSettings: { src: "https://www.amcharts.com/lib/images/faces/A04.png" }
    },
    {
      name: "Damon",
      value: 65456,
      bulletSettings: { src: "https://www.amcharts.com/lib/images/faces/C02.png" }
    },
    {
      name: "Patrick",
      value: 45724,
      bulletSettings: { src: "https://www.amcharts.com/lib/images/faces/D02.png" }
    },
    {
      name: "Mark",
      value: 13654,
      bulletSettings: { src: "https://www.amcharts.com/lib/images/faces/E01.png" }
    }
  ];

  series.bullets.push(function() {
    return am5.Bullet.new(root, {
      locationY: 1,
      sprite: am5.Picture.new(root, {
        templateField: "bulletSettings",
        width: 50,
        height: 50,
        centerX: am5.p50,
        centerY: am5.p50,
        shadowColor: am5.color(0x000000),
        shadowBlur: 4,
        shadowOffsetX: 4,
        shadowOffsetY: 4,
        shadowOpacity: 0.6
      })
    });
  });

  xAxis.data.setAll(data);
  series.data.setAll(data);

  series.appear(1000);
  chart.appear(1000, 100);

  }); // end am5.ready()
}

function selecionarTotem(idTotem, nomeTotem){
  sessionStorage.ID_TOTEM_SELECIONADO = idTotem;
  sessionStorage.NOME_TOTEM = nomeTotem;

  window.location.href = 'dashTemperaturaAtual.html'
}