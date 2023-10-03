var database = require("../database/config");

function exibirTotensEstado(estado) {
    console.log(
      "Acessei o grafiBrunoModel e executei a função exibirTotensEstado(): ",
      estado
    );
    var instrucao = `
    SELECT * FROM vw_totem_estado WHERE estado = '${estado}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }

module.exports = {
  exibirTotensEstado
};
