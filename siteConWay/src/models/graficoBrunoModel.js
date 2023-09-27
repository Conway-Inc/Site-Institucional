var database = require("../database/config");

function exibirMunicipios(estado) {
  console.log(
    "ACESSEI O graficoBrunoModel \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirMunicipios(): ",estado
  );
  var instrucao = `
    SELECT municipio FROM vw_aeroportos WHERE estado = '${estado}' GROUP BY municipio ORDER BY municipio;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  exibirMunicipios
};
