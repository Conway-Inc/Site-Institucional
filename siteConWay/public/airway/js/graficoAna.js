exibirEstadosComTotens();
buscarInformacoes();

document.getElementById('select-aeroporto').addEventListener('change', function () {
  var selectedOption = this.options[this.selectedIndex];
  var nomeAeroporto = selectedOption.value;
  exibirTotensDoAeroporto(nomeAeroporto);
});

var selectedTotemId;
var totensPendentes;
var totensFinalizada;
var totensEmManutencao;
var totalTotens;


function atualizarKPITotalTotens(valor) {
  var kpiElement = document.getElementById("totalTotens");
  if (kpiElement) {
    kpiElement.innerText = valor;
  }
}

function atualizarKPITotalManutencao(valorManutencao) {
  var kpiManutencao = document.getElementById("totalManutencao");
  if (kpiManutencao) {
    kpiManutencao.innerText = valorManutencao
  }
}

function atualizarKPITotalOperacao() {
  var kpiOperacao = document.getElementById("totalOperacao");
  if (kpiOperacao) {
    var subtracaoTotens = totalTotens - totensEmManutencao;
    kpiOperacao.innerText = subtracaoTotens;
  }
}

function atualizarKPITotensPendentes(valorPendente) {
  var kpiPendente = document.getElementById("totalPendentes");
  if (kpiPendente) {
    kpiPendente.innerText = valorPendente;
  }
}


// DECLARE SUAS VARIAVEIS GLOBAIS QUE O FETCH VAI BUSCAR E SALVAR AQUI


function plotarGrafico() {
  var options = {
    series: [
      {
        name: 'Estado dos Totens',
        data: [totensEmManutencao, totalTotens]
      }
    ],
    chart: {
      height: 350,
      type: 'bar'
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
        distributed: true,
      }
    },
    colors: ['#FF5733', '#36b9cc'],
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Totens em Manutenção', 'Total dos totens'],
    },
    legend: {
      show: false
    }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();

}

function exibirTotensPendentes() {
  var nomeTotem = sessionStorage.NOME_TOTEM;
  var nomeAeroporto = sessionStorage.NOME_AEROPORTO_SELECIONADO;
  
  fetch(`/graficoAna/exibirTotensPendentes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nomeTotemServer: nomeTotem,
      nomeAeroportoServer: nomeAeroporto,
    })
  })
    .then(function (resposta) {
      if (resposta.ok) {
        return resposta.json();
      } else {
        throw new Error("Erro na requisição.");
      }
    })
    .then(function (dados) {
      console.log("Dados recebidos do servidor:", dados);

      var divManutencao = document.getElementById('divManutencao');
      var btnAprovar = document.getElementById('aprovarBtn');
      var btnRecusar = document.getElementById('recusarBtn');

      if (dados && dados.isTotemPendente) {
        divManutencao.style.display = 'block';
        btnAprovar.style.display = 'block';
        btnRecusar.style.display = 'block';

      } else {
        divManutencao.style.display = 'none';
        btnAprovar.style.display = 'none';
        btnRecusar.style.display = 'none';
      }
    })
    .catch(function (erro) {
      console.log(`#ERRO: ${erro.message}`);
      alert("Erro na requisição");
    });

  return false;
}



function buscarInformacoes() {
  var nomeAeroporto = sessionStorage.NOME_AEROPORTO_SELECIONADO;
  var dataAtual = new Date().toISOString();

  fetch(`/graficoAna/buscarInformacoes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "nomeAeroportoServer": nomeAeroporto,
      "dataAtualServer": dataAtual
    })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Erro na requisição.");
    }
  }).then((data) => {
    console.log(data);

    totensPendentes = data[0].qtdTotensAguardandoManutencaoCount;
    //totensFinalizada = data[0].qtdTotensManutencaoFinalizadaCount;
    totensEmManutencao = data[0].qtdTotensManutencaoEmAndamentoCount;
    totalTotens = data[0].qtdeTotemCount;

    plotarGrafico();
    atualizarKPITotalTotens(totalTotens);
    atualizarKPITotalManutencao(totensEmManutencao);
    atualizarKPITotalOperacao(totensFinalizada);
    atualizarKPITotensPendentes(totensPendentes);
  }).catch(function (erro) {
    console.log(erro);
  });
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

function exibirTotensDoAeroporto(aeroporto) {
  if (aeroporto == undefined || aeroporto == "") {
    alert("Parâmetro faltando");
  } else {
    fetch(`/graficoAna/exibirTotensDoAeroporto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "aeroporto": aeroporto,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          const selectTotem = document.getElementById('select-totem');
          selectTotem.innerHTML = `<option></option>`;
          for (let i = 0; i < res.length; i++) {
            selectTotem.innerHTML += `<option value=${res[i].idTotem}>${res[i].nomeTotem}</option>`;
          }

          selectTotem.addEventListener('change', function () {
            const selectedTotem = selectTotem.options[selectTotem.selectedIndex].text;
            selectedTotemId = selectTotem.value;

            Swal.fire({
              icon: 'success',
              title: 'Totem escolhido com sucesso!',
              text: 'Você selecionou o totem ' + selectedTotem,
            });
          });
        } else {
          console.error(res.error);
          Swal.fire({
            icon: 'error',
            title: 'Erro ao carregar totens',
            text: 'Houve um erro ao carregar os totens. Por favor, tente novamente.',
          });
        }
      })
      .catch(function (erro) {
        console.log(erro);
        Swal.fire({
          icon: 'error',
          title: 'Erro inesperado',
          text: 'Houve um erro inesperado. Por favor, tente novamente.',
        });
      });
    return false;
  }
}

function limparFormulario() {
  document.getElementById("select-aeroporto").value = "";
  document.getElementById("select-municipio").value = "";
  document.getElementById("select-estado").value = "";
  document.getElementById("select-motivo").value = "";
  document.getElementById("select-urgencia").value = "";
  document.getElementById("input_descricao").value = "";
  document.getElementById("select-totem").value = "";
}

function relatarCausaManutencao() {
  var motivoManutencao = document.getElementById("select-motivo").value;
  var urgenciaManutencao = document.getElementById("select-urgencia").value;
  var descricao = input_descricao.value;
  var dataInicio = document.getElementById("input-dataInicio").value;
  var dataLimite = document.getElementById("input-dataLimite").value;
  var valor = document.getElementById("input-valor").value;


  fetch(`/graficoAna/relatarCausaManutencao`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      motivoManutencaoServer: motivoManutencao,
      urgenciaManutencaoServer: urgenciaManutencao,
      descricaoServer: descricao,
      selectTotemServer: selectedTotemId,
      dataInicioServer: dataInicio,
      dataLimiteServer: dataLimite,
      valorServer: valor
    })
  }).then(function (resposta) {
    console.log("resposta: ", resposta);
    if (resposta.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Manutenção registrada com sucesso!',
        text: 'A manutenção foi registrada com sucesso.',
      });
      limparFormulario();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao registrar manutenção',
        text: 'Houve um erro ao registrar a manutenção. Por favor, tente novamente.',
      });
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`)
  });
  return false;
}

function exibirListaTotensManutencao() {
  fetch(`/graficoAna/exibirListaTotensManutencao/${sessionStorage.FK_EMPRESA}`).then(function (resposta) {
    if (resposta.ok) {
      if (resposta.status == 204) {
        var lista = document.getElementById("pedidosManutencao");
        var mensagem = document.createElement("p");
        mensagem.innerHTML = "Nenhum resultado encontrado.";
        lista.innerHTML = "";
        lista.appendChild(mensagem);
        throw "Nenhum resultado encontrado!!";
      }
      resposta.json().then(function (resposta) {
        var contId = 0;
        for (let i = resposta.length - 1; i >= 0; i--) {
          var lista = document.getElementById("pedidosManutencao");
          var publicacao = resposta[i];

          // Formatar a data
          var dataLimiteFormatada = new Date(publicacao.dataLimite);
          var options = { year: 'numeric', month: 'long', day: 'numeric' };
          var dataLimiteFormatadaString = dataLimiteFormatada.toLocaleDateString('pt-BR', options);

          var thNumero = document.createElement("th");
          thNumero.innerHTML = publicacao.idTotem;
          thNumero.setAttribute("scope", "row");
          var tdNome = document.createElement("td");
          tdNome.innerHTML = publicacao.nome;
          var tdAeroporto = document.createElement("td");
          tdAeroporto.innerHTML = publicacao.aeroportoTotem;
          var tdDataLimite = document.createElement("td");
          tdDataLimite.innerHTML = dataLimiteFormatadaString;
          var tdMaisInfos = document.createElement("td");

          var tr = document.createElement("tr");
          var tbody = document.getElementById("tbodyTable");

          var tdMaisInfos = document.createElement("td");
          var linkConfiraTotens = document.createElement("a");
          linkConfiraTotens.href = "javascript:void(0)";
          linkConfiraTotens.innerHTML = "Mais informações";

          linkConfiraTotens.addEventListener("click", (function (publicacao) {
            return function () {
              selecionarManutencao(publicacao.idTotem, publicacao.aeroportoTotem, publicacao.nome);
            };
          })(publicacao));

          tdMaisInfos.appendChild(linkConfiraTotens);

          tr.appendChild(thNumero);
          tr.appendChild(tdNome);
          tr.appendChild(tdAeroporto);
          tr.appendChild(tdDataLimite);
          tr.appendChild(tdMaisInfos);
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

function aprovarManutencao() {
  var totem = sessionStorage.ID_TOTEM_SELECIONADO;

  fetch(`/graficoAna/aprovarManutencao`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      totemServer: totem,
    })
  }).then(function (resposta) {
    console.log("resposta: ", resposta);
    if (resposta.ok) {
      Swal.fire({
        icon: 'success',
        title: 'A aprovação da manutenção foi aprovada!',
        text: 'A aprovação foi registrada com sucesso.',
      });

      // Esconder a div após aprovação
      var divManutencao = document.getElementById('divManutencao');
      if (divManutencao) {
        divManutencao.style.display = 'none';
      }

      limparFormulario();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao aprovar manutenção',
        text: 'Houve um erro ao aprovar a manutenção. Por favor, tente novamente.',
      });
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`)
  });

  return false;
}

function reprovarManutencao () {
  var totem = sessionStorage.ID_TOTEM_SELECIONADO;

  fetch(`/graficoAna/aprovarManutencao`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      totemServer: totem,
    })
  }).then(function (resposta) {
    console.log("resposta: ", resposta);
    if (resposta.ok) {
      Swal.fire({
        icon: 'success',
        title: 'A aprovação da manutenção foi recusada!',
        text: 'A aprovação foi recusada com sucesso.',
      });
      limparFormulario();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao recusar manutenção',
        text: 'Houve um erro ao recusar a manutenção. Por favor, tente novamente.',
      });
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`)
  });
  return false;

}

function selecionarManutencao(idTotem, nomeAeroporto, nome) {
  sessionStorage.ID_TOTEM_SELECIONADO = idTotem;
  sessionStorage.NOME_AEROPORTO_SELECIONADO = nomeAeroporto;
  sessionStorage.NOME_TOTEM = nome;

  window.location.href = 'graficoAna2.html';
}