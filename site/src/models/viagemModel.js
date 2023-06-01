var database = require("../database/config");

function otimizacaoHorario(codLinha, horario){
    console.log("ACESSEI O VIAGEM MODEL \n", horario + " da linha " + codLinha)
    var instrucao = `
    select round(avg(pctOtimizacao),1) as otimizacao
        from vwViagem
        where
            codLinha = '${codLinha}' and
            horaInicio like '___________${horario.slice(0,2)}______'
        group by substring(horaInicio, 12, 5);`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function horariosPorRota(codLinha){
    console.log("ACESSEI O VIAGEM MODEL \n", codLinha)
    var instrucao = 
    `SELECT distinct substring(horaInicio, 12, 5) as horario, pctOtimizacao FROM vwviagem where codLinha = '${codLinha}';`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mediaPassageirosPorHorario(codLinha){
    console.log("ACESSEI O VIAGEM MODEL \n", codLinha)
    var instrucao = 
    `select substring(horaInicio, 12, 5) as horario,
	   round(avg(saldoPassageiros),1) as mediaPass
       from vwviagem as vw
			  join fluxo as f on vw.idViagem = f.fkViagem
              where vw.codLinha = '${codLinha}'
              group by horario;`;
              console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function fluxoViagens(codLinha){
    console.log("ACESSEI O VIAGEM MODEL \n", codLinha)
    var instrucao = 
    `select f.*, substring(horaInicio, 12, 5) as horario from vwFluxo as f
    join viagem as v on f.fkViagem = v.idViagem
    where CodLinha = '${codLinha}'`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    otimizacaoHorario,
    horariosPorRota,
    mediaPassageirosPorHorario,
    fluxoViagens
};
  