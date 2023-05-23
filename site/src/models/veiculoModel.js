var database = require("../database/config");

function cadastrarVeiculo(
    placaVeiculo,
    anoAquisicao,
    fkModelo,
    fkEmpresa,
  ) {
    
  
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
      INSERT INTO Veiculo (placaVeiculo,anoAquisicao,fkModelo,fkEmpresa) VALUES ('${placaVeiculo}', '${anoAquisicao}', '${fkModelo}', ${fkEmpresa});
      `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }
  
  
module.exports = {
   cadastrarVeiculo,
};
