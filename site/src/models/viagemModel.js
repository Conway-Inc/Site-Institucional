var database = require("../database/config");

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

function diasPorHorario(horario, codLinha){
    console.log("ACESSEI O VIAGEM MODEL \n", codLinha)
    var instrucao = 
    `select 
        date_format(horaInicio, "%d-%m-%Y %h:%m") as dataV,
        dayname(horaInicio) as diaSemana,
        avg(pctOtimizacao) as pctOtimizacao
        from vwViagem
            where hour(horaInicio) = '${horario}' and codLinha = '${codLinha}'
            group by dataV, diaSemana
            limit 7;`;
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

function fluxoDias(codLinha, data){
    console.log("ACESSEI O VIAGEM MODEL \n", codLinha)
    var instrucao = 
    `select 
    idPonto,
    date_format(horaInicio, "%d-%m-%Y %h:%m") as dataV,
    round(avg(saldoPassageiros),1) as saldoPass
            from vwFluxo as f
            join viagem as v on f.fkViagem = v.idViagem
            where CodLinha = '${codLinha}' and hour(horaInicio) = ${data}
            group by dataV, idPonto;`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    horariosPorRota,
    diasPorHorario,
    mediaPassageirosPorHorario,
    fluxoViagens,
    fluxoDias
};
  