process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var totemRouter = require("./src/routes/totem");
var graficoBrunoRouter = require("./src/routes/graficoBruno");
var graficoJoaoRouter = require("./src/routes/graficoJoao");
// var graficoKauanRouter = require("./src/routes/graficoKauan");
var loginRouter = require("./src/routes/login");
var funcionarioRouter = require("./src/routes/funcionario")
var empresaRouter = require("./src/routes/empresa");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());


app.use("/funcionario", funcionarioRouter)
app.use("/totem", totemRouter);
app.use("/graficoBruno", graficoBrunoRouter);
app.use("/graficoJoao", graficoJoaoRouter);
// app.use("/graficoKauan", graficoKauanRouter);
app.use("/login", loginRouter);
app.use("/empresa", empresaRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
