function saibaMais() {
  tela2.style.display = 'flex'
  tela3.style.display = 'none'
}

function calcularEficiencia() {
  tela2.style.display = 'none'
  tela3.style.display = 'flex'
  // Obter os dados de entrada do usuário
  const limitePassageiros = 70;
  var passageiros = Number(document.getElementById("passageiros").value);
  var distancia = Number(document.getElementById("distancia").value);
  var custo = Number(document.getElementById("custo").value);

  // Calcular a eficiência com base nos dados fornecidos
  var eficiencia = (passageiros / limitePassageiros) * 100;

  // Definir o rank de eficiência com base no resultado obtido
  var rank;
  var cor;
  if (eficiencia > 100) {
    eficiencia = (eficiencia - 100) * -1;
    rank = "Superlotado";
    cor = "#0792e3";
    resultado.style.color = "red";
    spanRank.style.color = "red";
  } else if (eficiencia >= 90) {
    rank = "Excelente";
    cor = "#0792e3";
    resultado.style.color = "green";
    spanRank.style.color = "green";
  } else if (eficiencia >= 70) {
    rank = "Bom";
    cor = "#75dc0d";
    resultado.style.color = "blue";
    spanRank.style.color = "blue";
  } else if (eficiencia >= 50) {
    rank = "Regular";
    cor = "#F9f006";
    resultado.style.color = "yellow";
    spanRank.style.color = "yellow";
  } else {
    rank = "Ruim";
    cor = "#F90d29";
    resultado.style.color = "red";
    spanRank.style.color = "red";
  }

  // Exibir o resultado para o usuário
  document.getElementById("resultado").innerHTML = eficiencia.toFixed(2) + "%";
  document.getElementById("spanRank").innerHTML = rank;

  // Calcular o prejuízo da empresa caso não adote o projeto
  var custoTotal = passageiros * 5 + custo / passageiros; // custo médio por passageiro
  var custoManutencao = 500; // custo médio de manutenção do veículo por mês
  var precoCombustivel = 3.5; // preço médio do combustível por litro
  var consumoCombustivel = 10; // consumo médio de combustível do veículo (em km/L)

  var distanciaMensal = passageiros * distancia * 30; // distância percorrida mensalmente considerando 30 dias úteis
  var litrosCombustivel = distanciaMensal / consumoCombustivel;
  var custoCombustivel = litrosCombustivel * precoCombustivel;
  var custoTotalMensal = custoTotal * 30 + custoManutencao + custoCombustivel;

  document.getElementById("dados").innerHTML = `
      Seus gastos mensais considerando manutenção e combustível: 
      R$-${custoTotalMensal.toFixed(2)}<br><br>`;

  var money;
  if (rank == "Ruim") {
    document.getElementById(
      "dados"
    ).innerHTML += `A linha está com desempenho ruim, entre em contato com a Conway para entregarmos dados que podem ajudar a melhorar a eficiência dessa linha.`;
  } else if (rank == "Regular") {
    document.getElementById(
      "dados"
    ).innerHTML += `A linha não está eficiente, ela pode melhorar usando nosso sistema.`;
  } else if (rank == "Bom") {
    document.getElementById(
      "dados"
    ).innerHTML += `A linha está eficiente, mas pode melhorar usando nosso sistema.`;
  } else if (rank == "Excelente") {
    document.getElementById(
      "dados"
    ).innerHTML = `A linha está em sua eficiência máxima, se você deseja manter esse padrão e se preparar para crises contate a Conway.`;
  } else if (rank == "Superlotado") {
    document.getElementById(
      "dados"
    ).innerHTML += `A linha está sofrendo com superlotação, se você deseja corrigir esse problema, contate a Conway.`;
  }
  div_msg.innerHTML = `Considerando o cenário atual, a empresa tem uma eficiência média de transporte de ${eficiencia.toFixed(
    2
  )}%. Se a empresa adotar o
    projeto, é garantido um aumento inicial para ${(eficiencia + 20).toFixed(
    2
  )}%. Com base nisso, podemos fazer a seguinte
    análise de viabilidade:`;

  gerarGrafico(eficiencia, rank, cor);
  tela3.style.display = "flex";
}
function gerarGrafico(eficiencia, rank, cor) {
  var possivel = 100;
  if (eficiencia >= 100) {
    possivel = 0;
    cor = "#0792e3";
  }
  const avaliacao = {
    labels: ["Otimização Atual", "Otimização possível"],
    datasets: [
      {
        label: "A",
        backgroundColor: [cor, "white"],
        data: [Number(eficiencia), possivel],
        hoverOffset: 4,
      },
    ],
  };
  const configAvaliacao = {
    type: "doughnut",
    data: avaliacao,
  };
  const graficoAvaliacao = new Chart(
    document.getElementById("graficoAvaliacao"),
    configAvaliacao
  );
}