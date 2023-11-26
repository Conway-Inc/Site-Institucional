var mysql = require("mysql2");
var sql = require('mssql');

var sqlServerConfig = {
<<<<<<< HEAD
        server: "localhost",
	database: "ConWay",
=======
        server: "18.232.10.255",
        database: "ConWay",
>>>>>>> a2b20bbde0f5efcb4ff64092062012fb76a226c4
        user: "sa",
        password: "urubu100",
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        options: {
<<<<<<< HEAD
            encrypt: true, // for azure
	    trustServerCertificate: true
        }
    }
=======
            encrypt: true,
            trustServerCertificate: true
        }
    }

>>>>>>> a2b20bbde0f5efcb4ff64092062012fb76a226c4
var mySqlConfig = {
    host: "localhost",
    database: "ConWay",
    user: "user_conway",
    password: "urubu100"
};

function executar(instrucao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        return new Promise(function (resolve, reject) {
            sql.connect(sqlServerConfig).then(function () {
                return sql.query(instrucao);
            }).then(function (resultados) {
                console.log(resultados);
                resolve(resultados.recordset);
            }).catch(function (erro) {
                reject(erro);
                console.log('ERRO: ', erro);
            });
            sql.on('error', function (erro) {
                return ("ERRO NO SQL SERVER (Azure): ", erro);
            });
        });
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        return new Promise(function (resolve, reject) {
            var conexao = mysql.createConnection(mySqlConfig);
            conexao.connect();
            conexao.query(instrucao, function (erro, resultados) {
                conexao.end();
                if (erro) {
                    reject(erro);
                }
                console.log(resultados);
                resolve(resultados);
            });
            conexao.on('error', function (erro) {
                return ("ERRO NO MySQL WORKBENCH (Local): ", erro.sqlMessage);
            });
        });
    } else {
        return new Promise(function (resolve, reject) {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            reject("AMBIENTE NÃO CONFIGURADO EM app.js")
        });
    }
}

module.exports = {
    executar
}