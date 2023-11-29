var metricasModel = require("../models/metricasModel");

function cadastrarMetricasCpu(req, res){
    var fkEmpresa = req.body.fkEmpresaServer;
    var alertaCpu = req.body.alertaCpuServer;
    var criticoCpu = req.body.criticoCpuServer;

    if (alertaCpu == undefined) {
        res.status(400).send("a sua métrica para estado de ALERTA da CPU está undefined")
    } else if(criticoCpu == undefined){
        res.status(400).send("a sua métrica para estado de CRÍTICO da CPU está undefined")
    } else if(fkEmpresa == undefined){
        res.status(400).send("a sua identificação empresarial (fkEmpresa) está undefined")
    } 
    else{
        metricasModel.cadastrarMetricasCpu(fkEmpresa, alertaCpu, criticoCpu)
            .then(
                function(resultado){
                    res.json(resultado);
                }
            ).catch(
                function(erro){
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro!Erro: ",
                    erro.sqlMessage
                    );
                    res.status(500).send(erro.sqlMessage);
                }
            )
    }
}

function cadastrarMetricasMemo(req, res){
    var fkEmpresa = req.body.fkEmpresaServer;
    var alertaMemo = req.body.alertaMemoServer;
    var criticoMemo = req.body.criticoMemoServer;

    if (alertaMemo == undefined) {
        res.status(400).send("a sua métrica para estado de ALERTA da Memória está undefined")
    } else if(criticoMemo == undefined){
        res.status(400).send("a sua métrica para estado de CRÍTICO da Memória está undefined")
    } else if(fkEmpresa == undefined){
        res.status(400).send("a sua identificação empresarial (fkEmpresa) está undefined")
    } 
    else{
        metricasModel.cadastrarMetricasMemo(fkEmpresa, alertaMemo, criticoMemo)
            .then(
                function(resultado){
                    res.json(resultado);
                }
            ).catch(
                function(erro){
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro!Erro: ",
                    erro.sqlMessage
                    );
                    res.status(500).send(erro.sqlMessage);
                }
            )
    }
}


function cadastrarMetricasDisco(req, res){
    var fkEmpresa = req.body.fkEmpresaServer;
    var alertaDisco = req.body.alertaDiscoServer;
    var criticoDisco = req.body.criticoDiscoServer;

    if (alertaDisco == undefined) {
        res.status(400).send("a sua métrica para estado de ALERTA do Disco está undefined")
    } else if(criticoDisco == undefined){
        res.status(400).send("a sua métrica para estado de CRÍTICO do Disco está undefined")
    } else if(fkEmpresa == undefined){
        res.status(400).send("a sua identificação empresarial (fkEmpresa) está undefined")
    } 
    else{
        metricasModel.cadastrarMetricasDisco(fkEmpresa, alertaDisco, criticoDisco)
            .then(
                function(resultado){
                    res.json(resultado);
                }
            ).catch(
                function(erro){
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro!Erro: ",
                    erro.sqlMessage
                    );
                    res.status(500).send(erro.sqlMessage);
                }
            )
    }
}

module.exports = {
    cadastrarMetricasCpu,
    cadastrarMetricasMemo,
    cadastrarMetricasDisco
}