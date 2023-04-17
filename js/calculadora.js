function calcularEficiencia() {
    // Obter os dados de entrada do usuário
    var passageiros = Number(document.getElementById("passageiros").value);
    var distancia = Number(document.getElementById("distancia").value);
    var tempo = Number(document.getElementById("tempo").value);
    var custo = Number(document.getElementById("custo").value);

    // Calcular a eficiência com base nos dados fornecidos
    var eficiencia = (passageiros * distancia) / (tempo * custo) * 100;

    // Definir o rank de eficiência com base no resultado obtido
    var rank;
    var cor;
    if (eficiencia >= 90) {
      rank = "Excelente";
      cor = "#0792e3";
    } else if (eficiencia >= 70) {
      rank = "Bom";
      cor = "#75dc0d";
    } else if (eficiencia >= 50) {
      rank = "Regular";
      cor = "#F9f006";
    } else {
      rank = "Ruim";
      cor = "#F90d29";
    }

    // Exibir o resultado para o usuário
    document.getElementById("resultado").innerHTML = eficiencia.toFixed(2) + "%";
    document.getElementById("rank").innerHTML = rank;

    // Calcular o prejuízo da empresa caso não adote o projeto
    var custoTotal = passageiros * 5; // custo médio por passageiro
    var lucroTotal = passageiros * 2.5; // lucro médio por passageiro
    var custoManutencao = 500; // custo médio de manutenção do veículo por mês
    var precoCombustivel = 3.5; // preço médio do combustível por litro
    var consumoCombustivel = 10; // consumo médio de combustível do veículo (em km/L)

    var distanciaMensal = passageiros * distancia * 30; // distância percorrida mensalmente considerando 30 dias úteis
    var litrosCombustivel = distanciaMensal / consumoCombustivel;
    var custoCombustivel = litrosCombustivel * precoCombustivel;
    var custoTotalMensal = custoTotal + custoManutencao + custoCombustivel;
    var lucroTotalMensal = lucroTotal * passageiros * 30; // lucro mensal considerando 30 dias úteis

    document.getElementById("dados").innerHTML = `Seu lucro total mensal é: R$${lucroTotalMensal}<br><br>
      Seus gastos mensais considerando manutenção e combustível: R$${custoTotalMensal}<br><br>`;

    var money;
    if (custoTotalMensal > lucroTotalMensal || rank == "Ruim") {
      document.getElementById("dados").innerHTML += `A linha está com desempenho ruim, entre em contato com a Conway para entregarmos dados que podem ajudar a melhorar a eficiência dessa linha.`
    }
    else {
      if (rank == "Regular") {
        document.getElementById("dados").innerHTML += `A linha não está eficiênte, ela pode melhorar usando nosso sistema.`
      }
      else {
        if (rank == "Bom") {
          document.getElementById("dados").innerHTML += `A linha está eficiênte, mas pode melhorar usando nosso sistema.`
        }
        else {
          if (rank == "Excelente") {
            document.getElementById("dados").innerHTML += `A linha está em sua eficiencia máxima, se você deseja manter esse padrão e se preparar para crises contate a Conway.`
          }

        }
      }
    }
    div_msg.innerHTML = `Considerando o cenário atual, a empresa tem uma eficiência média de transporte de ${eficiencia.toFixed(2)}%. Se a empresa adotar o
      projeto, é garantido um aumento inicial para ${(eficiencia + 20).toFixed(2)}%. Com base nisso, podemos fazer a seguinte
      análise de viabilidade:`
    gerarGrafico(eficiencia, rank, cor);
  }
  function gerarGrafico(eficiencia, rank, cor) {
    var possivel = 100; 
    if(eficiencia>=100){
      possivel = 0;
      cor = "#0792e3";
    }
    const avaliacao = {
      labels: ["Otimização Atual","Otimização possível"],
      datasets: [{
        label: "A",
        backgroundColor: [cor,"white"],
        data: [Number(eficiencia),possivel],
        hoverOffset:4
      }
      ]
    }
    const configAvaliacao = {
      type: "doughnut",
      data: avaliacao
    }
    const graficoAvaliacao = new Chart(
        document.getElementById("graficoAvaliacao"),
        configAvaliacao
    );
  }