process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";
// algo

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");
var funcionariosRouter = require("./src/routes/funcionarios");
var linhaRouter = require("./src/routes/linha");
var pontoRouter = require("./src/routes/ponto");
var veiculoRouter = require("./src/routes/veiculos");
var linhaPontoRouter = require("./src/routes/linhaPonto");
var viagemRouter = require("./src/routes/viagem");
var mailer = require("./src/routes/mailer");
var interno = require("./src/routes/interno");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter);
app.use("/funcionarios", funcionariosRouter);
app.use("/linha", linhaRouter);
app.use("/ponto", pontoRouter);
app.use("/veiculos", veiculoRouter);
app.use("/linhaPonto", linhaPontoRouter);
app.use("/viagem", viagemRouter);
app.use("/mailer", mailer);
app.use("/interno", interno)

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
