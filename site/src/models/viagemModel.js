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
    `select hour(horaInicio) as horario
    from fluxo as f
        join viagem as v on f.fkViagem = v.idViagem
        join linha as l on l.idLinha = v.fkLinha
        where codLinha = '${codLinha}'
        group by hour(horaInicio)`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mediaPassageirosPorHorario(codLinha){
    console.log("ACESSEI O VIAGEM MODEL \n", codLinha)
    var instrucao = 
    `select hour(horaInicio) as horario,
    round(avg(saldoPassageiros),1) as mediaPass,
    round(avg(lotacao),0) as lotacao
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
    `select 
    idPonto,
    hour(horaInicio) as horario,
    round(avg(saldoPassageiros),1) as saldoPass
            from vwFluxo as f
            join viagem as v on f.fkViagem = v.idViagem
            where CodLinha = '${codLinha}'
            group by hour(horaInicio), idPonto;`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    otimizacaoHorario,
    horariosPorRota,
    mediaPassageirosPorHorario,
    fluxoViagens
};
  