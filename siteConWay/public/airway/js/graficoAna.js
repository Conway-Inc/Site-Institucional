function plotarGraficoCrawler() {
      
    var options = {
        series: [{
          name: "Session Duration",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: "Page Views",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
          name: 'Total Visits',
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        }
      ],
        chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [5, 7, 5],
        curve: 'straight',
        dashArray: [0, 8, 5]
      },
      title: {
        text: 'Page Statistics',
        align: 'left'
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
          '10 Jan', '11 Jan', '12 Jan'
        ],
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " (mins)"
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + " per session"
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: '#f1f1f1',
      }
      };

      var chart = new ApexCharts(document.querySelector("#grafico-crawler"), options);
      chart.render();

}

function exibirEstadosComTotens() {
  var estado = document.getElementById("select-estado");
  fetch(`/graficoBruno/exibirEstadosComTotens`)
      .then(function (resposta) {
          if (resposta.ok) {

              resposta.json().then(json => {

                  estado.innerHTML = "";

                  let option1 = document.createElement("option");
                  option1.innerHTML = "Todos os estados";
                  option1.setAttribute("data-default", "");
                  option1.setAttribute("value", "0");
                  option1.setAttribute("selected", "");
                  estado.appendChild(option1);

                  var municipio = document.getElementById("select-municipio");

                  municipio.innerHTML = "";
                  let option2 = document.createElement("option");
                  option2.innerHTML = "Selecione um estado...";
                  option2.setAttribute("data-default", "");
                  option2.setAttribute("disabled", "");
                  option2.setAttribute("selected", "");
                  municipio.appendChild(option2);

                  var aeroporto = document.getElementById("select-aeroporto");
                  aeroporto.removeAttribute("disabled");
                  aeroporto.innerHTML = "";
                  let option3 = document.createElement("option");
                  option3.innerHTML = "Selecione um municipio...";
                  option3.setAttribute("data-default", "");
                  option3.setAttribute("disabled", "");
                  option3.setAttribute("selected", "");
                  aeroporto.appendChild(option3);
                  aeroporto.setAttribute("disabled", '')

                  for (let i = 0; i < json.length; i++) {
                      let publicacao = json[i];
                      let option = document.createElement("option");
                      option.innerHTML = publicacao.estado;
                      option.setAttribute("value", publicacao.estado);
                      estado.appendChild(option);
                  }
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

function exibirMunicipiosComTotens() {
  var estado = document.getElementById("select-estado");
  if (estado.value == 0) {
      var municipio = document.getElementById("select-municipio");
      municipio.setAttribute("disabled", "");

  } else {
      fetch(`/graficoBruno/exibirMunicipiosComTotens/${estado.value}`)
          .then(function (resposta) {
              if (resposta.ok) {

                  resposta.json().then(json => {

                      var municipio = document.getElementById("select-municipio");
                      municipio.removeAttribute("disabled");
                      municipio.innerHTML = "";
                      let option1 = document.createElement("option");
                      option1.innerHTML = "Todos os municípios";
                      option1.setAttribute("data-default", "");
                      option1.setAttribute("value", "0");
                      option1.setAttribute("selected", "");
                      municipio.appendChild(option1);

                      var aeroporto = document.getElementById("select-aeroporto");
                      aeroporto.setAttribute("disabled", '')
                      aeroporto.innerHTML = "";
                      let option2 = document.createElement("option");
                      option2.innerHTML = "Selecione um município...";
                      option2.setAttribute("data-default", "");
                      option2.setAttribute("disabled", "");
                      option2.setAttribute("selected", "");
                      aeroporto.appendChild(option2);

                      for (let i = 0; i < json.length; i++) {
                          let publicacao = json[i];
                          let option = document.createElement("option");
                          option.innerHTML = publicacao.municipio;
                          option.setAttribute("value", publicacao.municipio);
                          municipio.appendChild(option);
                      }
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
}

function exibirAeroportosComTotens(municipio) {
  var estado = document.getElementById("select-estado");
  var municipio = document.getElementById("select-municipio");
  if (municipio.value == 0) {
      var aeroporto = document.getElementById("select-aeroporto");
      aeroporto.removeAttribute("disabled");
      aeroporto.innerHTML = "";
      let option3 = document.createElement("option");
      option3.innerHTML = "Selecione um municipio...";
      option3.setAttribute("data-default", "");
      option3.setAttribute("disabled", "");
      option3.setAttribute("selected", "");
      aeroporto.appendChild(option3);
      aeroporto.setAttribute("disabled", '')
  } else {
      fetch(`/graficoBruno/exibirAeroportosComTotens/${municipio.value}`)
          .then(function (resposta) {
              if (resposta.ok) {
                  resposta.json().then(json => {

                      var aeroporto = document.getElementById("select-aeroporto");
                      aeroporto.removeAttribute("disabled");
                      aeroporto.innerHTML = "";
                      let option = document.createElement("option");
                      option.innerHTML = "Todos os aeroportos";
                      option.setAttribute("data-default", "");
                      option.setAttribute("value", "0");
                      option.setAttribute("selected", "");
                      aeroporto.appendChild(option);

                      for (let i = 0; i < json.length; i++) {
                          let publicacao = json[i];
                          let option = document.createElement("option");
                          option.innerHTML = publicacao.nomeAeroporto;
                          option.setAttribute("value", publicacao.nomeAeroporto);
                          aeroporto.appendChild(option);
                      }

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
}


document.getElementById('select-aeroporto').addEventListener('change', function () {
    var selectedOption = this.options[this.selectedIndex];
    var nomeAeroporto = selectedOption.value;
    exibirTotensDoAeroporto(nomeAeroporto);
});


function exibirTotensDoAeroporto(aeroporto) {
  if (aeroporto == undefined || aeroporto == "") {
    alert("Parametro faltando")

  } else {
      fetch(`/graficoAna/exibirTotensDoAeroporto`,  {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "aeroporto": aeroporto
        })
      }).then((res) => res.json())
      .then((res) => {
          if (!res.error) {
                  document.getElementById('select-totem').innerHTML = `<option></option>`
                  for (let i = 0; i < res.length; i++) {
                    document.getElementById('select-totem').innerHTML += `<option value = '${res[0].nomeTotem}'>${res[0].nomeTotem}</option>`;
                  }
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
}