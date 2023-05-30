const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3000;
var habilitarOperacaoInserir = false;
var viagemCriada = false;

var codLinha = '477P';
var placaVeiculo = 'DMB4413';
var contadorPonto = 0;

const serial = async (
    // valoresDht11Umidade,
    // valoresDht11Temperatura,
    // valoresLuminosidade,
    // valoresLm35Temperatura,
    // valoresChave
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
        // const dht11Umidade = parseFloat(valores[0]);
        // const dht11Temperatura = parseFloat(valores[1]);
        // const luminosidade = parseFloat(valores[2]);
        // const lm35Temperatura = parseFloat(valores[3]);
        const entradaPassageiros = parseInt(valores[0]);
        const saidaPassageiros = parseInt(valores[1]);
        // console.log(data)

        // valoresDht11Umidade.push(dht11Umidade);
        // valoresDht11Temperatura.push(dht11Temperatura);
        // valoresLuminosidade.push(luminosidade);
        // valoresLm35Temperatura.push(lm35Temperatura);
        valoresEntrada.push(entradaPassageiros);
        valoresSaida.push(saidaPassageiros);

        if (habilitarOperacaoInserir) {
            if(!viagemCriada){
                await poolBancoDados.execute(
                    `INSERT INTO Viagem values(null,
                        now(),
                        null,
                        (select idLinha from linha where codLinha = '?'),
                        (select idVeiculo from veiculo where placaVeiculo = '?')
                        `,
                    [codLinha, placaVeiculo],
                );
                viagemCriada = true
            }
            await poolBancoDados.execute(
                `INSERT INTO Fluxo (idFluxo, entradas, saidas, dataHoraFluxo, fkViagem, fkPonto)
                VALUES (
                null,
                ?,
                ?,
                now(),
                (select idViagem from viagem order by idViagem desc limit 1),
                (select P.idPonto from ponto as p
                                join linhaPonto as lp on p.idPonto = lp.idPonto
                                join linha as l on l.idLinha = lp.idLinha
                                where l.codLinha = '?' limit 1) + ?
                 );`,
                'INSERT INTO Fluxo (idFluxo, entradas, saidas, dataHoraFluxo, fkViagem, fkPonto) VALUES (?, ?, now(), ?, ?)',
                [entradaPassageiros, saidaPassageiros, codLinha, contadorPonto],
            );
            contadorPonto++;
            habilitarOperacaoInserir = false
        }

    });
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

const servidor = (
    // valoresDht11Umidade,
    // valoresDht11Temperatura,
    // valoresLuminosidade,
    // valoresLm35Temperatura,
    // valoresChave
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
    // app.get('/sensores/dht11/umidade', (_, response) => {
    //     return response.json(valoresDht11Umidade);
    // });
    // app.get('/sensores/dht11/temperatura', (_, response) => {
    //     return response.json(valoresDht11Temperatura);
    // });
    // app.get('/sensores/luminosidade', (_, response) => {
    //     return response.json(valoresLuminosidade);
    // });
    // app.get('/sensores/lm35/temperatura', (_, response) => {
    //     return response.json(valoresLm35Temperatura);
    // });
    app.get('/sensores/chave', (_, response) => {
        return response.json([valoresEntrada, valoresSaida]);
    });
    app.get('/porta', (_, response) => {
        return response.json(habilitarOperacaoInserir)
    })
    app.post('/porta/:fechar', (request, response) => {
        req = request.params.fechar
        habilitarOperacaoInserir = Boolean(req)
        return response.json(habilitarOperacaoInserir)
    })
    app.post('/viagem', (request, response) => {
        codLinha = req.params.linha;
        placaVeiculo = req.params.placa;
        return response.json({codLinha, placaVeiculo})
    })
}

(async () => {
    // const valoresDht11Umidade = [];
    // const valoresDht11Temperatura = [];
    // const valoresLuminosidade = [];
    // const valoresLm35Temperatura = [];
    // const valoresChave = [];
    const valoresEntrada = [];
    const valoresSaida = [];
    await serial(
        // valoresDht11Umidade,
        // valoresDht11Temperatura,
        // valoresLuminosidade,
        // valoresLm35Temperatura,
        // valoresChave
        valoresEntrada,
        valoresSaida
    );
    servidor(
        // valoresDht11Umidade,
        // valoresDht11Temperatura,
        // valoresLuminosidade,
        // valoresLm35Temperatura,
        // valoresChave
        valoresEntrada,
        valoresSaida
    );
})();
