const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3000;
var portaAberta = false;
var habilitarOperacaoInserir = false;
var viagemCriada = false;

var linha = '477P';
var placa = 'FWC3354';

var contadorPonto = 0;

var entradasAnteriores = 0;
var saidasAnteriores = 0;
var entradasVez = 0;
var saidaVez = 0;

const serial = async (
    valoresEntrada,
    valoresSaida
) => {
        const poolBancoDados = mysql.createPool(
            {
                host: 'localhost',
                port: 3306,
                user: 'urubu100',
                password: 'urubu100',
                database: 'buswayDb'
            }
        ).promise();

        const portas = await serialport.SerialPort.list();
        const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
        if (!portaArduino) {
            throw new Error('O arduino não foi encontrado em nenhuma porta serial');
        }
        const arduino = new serialport.SerialPort(
            {
                path: portaArduino.path,
                baudRate: SERIAL_BAUD_RATE
            }
        );
        arduino.on('open', () => {
            console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
        });
        arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
            const valores = data.split(';')

                var entradasTotais = parseInt(valores[0]);
                var saidasTotais = parseInt(valores[1]);
                
                var saldoPassageiros = entradasTotais - saidasTotais;
                
                entradasVez = entradasTotais - entradasAnteriores;
                saidaVez = saidasTotais - saidasAnteriores;

                valoresEntrada.push(entradasVez);
                valoresSaida.push(saidaVez);

                console.log("Entradas da vez: " + entradasVez + " Saídas da vez: " + saidaVez);
                console.log("Entradas totais: " + entradasTotais + " Saídas totais " + saidasTotais);
                console.log("Saldo de passageiros: " + saldoPassageiros);
                console.log("---------------------------------");

                if(habilitarOperacaoInserir)
                {
                    if(!viagemCriada){
                        await poolBancoDados.execute(
                            `INSERT INTO Viagem values(null, now(), null, (select idLinha from linha where codLinha = '${linha}'), (select idVeiculo from veiculo where placaVeiculo = '${placa}'))`
                        );
                        viagemCriada = true
                        console.log("-------------------------------\n NOVA VIAGEM CRIADA COM SUCESSO! \n-------------------------------");
                    }
                    await poolBancoDados.execute(
                        `INSERT INTO Fluxo VALUES (null, ${entradasVez}, ${saidaVez}, ${saldoPassageiros}, now(), (select idViagem from viagem order by idViagem desc limit 1), (select P.idPonto from ponto as p join linhaPonto as lp on p.idPonto = lp.fkPonto join linha as l on l.idLinha = lp.fkLinha where l.codLinha = '477P' limit 1) + ${contadorPonto})`
                    );
                    console.log("-------------------------------\n FLUXO ENVIADO COM SUCESSO \n-------------------------------");
                        
                    contadorPonto++;
                    habilitarOperacaoInserir = false;

                    entradasAnteriores = entradasVez;
                    saidasAnteriores = saidaVez;

                    entradasVez = 0;
                    saidaVez = 0;
                }
        });
        arduino.on('error', (mensagem) => {
            console.error(`Erro no arduino (Mensagem: ${mensagem}`)
        });
}

const servidor = (
    valoresEntrada,
    valoresSaida
) => {
    const app = express();
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });
    app.get("/", function (req, res) {
        res.render("index", { title: "Express" });
    });
    app.get('/sensores/chave', (_, response) => {
        return response.json([valoresEntrada, valoresSaida]);
    });
    app.get('/porta', (_, response) => {
        return response.json(habilitarOperacaoInserir)
    })
    app.get('/parada/:pParada', (request, response) => {
        parada = request.params.pParada;
        habilitarOperacaoInserir = parada;
        return response.json(habilitarOperacaoInserir)
    })
}

(async () => {
    const valoresEntrada = [];
    const valoresSaida = [];
    await serial(
        valoresEntrada,
        valoresSaida
    );
    servidor(
        valoresEntrada,
        valoresSaida
    );
    }
)();