DROP DATABASE Airway;
CREATE DATABASE Airway;
USE Airway; 

CREATE TABLE Empresa (
idEmpresa int primary key auto_increment, 
cnpjEmpr char(14),
nomeEmpr varchar(45),
ramoEmpr varchar(45),
adm boolean
);

select * from Empresa;


CREATE TABLE Funcionario (
    idFuncionario int primary key auto_increment,
    cpfFunc CHAR(11),
    nomeFunc Varchar(45),
    emailFunc varchar(45),
    senhaFunc varchar(45),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

                          
CREATE VIEW vwFuncsEmpresa AS
SELECT
    f.*,
    e.idEmpresa,
    e.ramoEmpr,
    e.cnpjEmpr,
    e.nomeEmpr AS nomeEmpresa
FROM Empresa AS e
JOIN Funcionario AS f ON e.idEmpresa = f.fkEmpresa;

CREATE TABLE Modelo (
idModelo INT primary key auto_increment,
nomeModelo varchar(45),
kmsPorLitro DECIMAL (5,2),
lotacao INT,
portasEntrada INT,  
portasSaida INT
);

CREATE TABLE Veiculo (
    idVeiculo int auto_increment,
    placaVeiculo char(7),
    anoAquisicao YEAR,
    Modelo_idModelo INT,
    Empresa_idEmpresa INT,
    PRIMARY KEY (idVeiculo, Empresa_idEmpresa, Modelo_idModelo), 
    FOREIGN KEY (Modelo_idModelo) REFERENCES Modelo(idModelo),
    FOREIGN KEY (Empresa_idEmpresa) REFERENCES Empresa(idEmpresa)
);


CREATE TABLE Linha (
idLinha int primary key auto_increment,
codLinha char(4),
tipoLinha char(2),
nomeLinhaIda varchar(45),
nomeLinhaVolta varchar(45),
Empresa_idEmpresa int,
FOREIGN KEY (Empresa_idEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Viagem (
idViagem int auto_increment,
horarioInicio datetime,
horaFim datetime,
fk_veiculo INT,
Linha_idLinha INT,
FOREIGN KEY (fk_Veiculo) REFERENCES Veiculo(idVeiculo),
FOREIGN KEY (Linha_idLinha) REFERENCES Linha(idLinha),
PRIMARY KEY (idViagem, Linha_idLinha)
);


CREATE TABLE Ponto (
idPonto int primary key auto_increment,
cep char(8),
logradouro varchar(45),
numNaRua INT,
grausY char(7),
grausX char(7)
);

CREATE TABLE LinhaPonto (
    fkLinha int,
    fkPonto int,
    FOREIGN KEY (fkLinha) REFERENCES Linha(idLinha),
    FOREIGN KEY (fkPonto) REFERENCES Ponto(idPonto),
    PRIMARY KEY (fkLinha, fkPonto)
);

CREATE TABLE Fluxo (
idFluxo int auto_increment,
dataHoraFluxo datetime,
entradas INT,
saidas INT,
Viagem_idViagem INT,
Viagem_Linha_idLinha INT,
FOREIGN KEY (Viagem_idViagem) REFERENCES Viagem(idViagem),
FOREIGN KEY (Viagem_Linha_idLinha) REFERENCES Linha(idLinha),
PRIMARY KEY(idFluxo, Viagem_idViagem,Viagem_Linha_idLinha),
Ponto_idPonto INT,
FOREIGN KEY (Ponto_idPonto) REFERENCES Ponto(idPonto)
);


CREATE TABLE Componentes (
idComponente int primary key auto_increment,
nomeComponente varchar(45),
metricaComponente varchar(45),
limiteComponente DECIMAL(6,2),
minimoComponente DECIMAL(6,2),
maxTempComponente DECIMAL(6,2),
minTempComponente DECIMAL(6,2)
);

CREATE TABLE Aeroporto (
    idAeroporto int primary key auto_increment,
    nomeAeroporto varchar(45),
    cep char(8),
    logradouro varchar(45),
    numero INT,
    cidade varchar(45),
    estado varchar(45),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);


CREATE TABLE Totem (
idTotem int primary key auto_increment,
marcaTotem varchar(45),
nomeTotem varchar(45),
numeroSerieTotem varchar(45),
fkAeroporto INT,
FOREIGN KEY (fkAeroporto) REFERENCES Aeroporto(idAeroporto)
);


CREATE TABLE Dados (
    idDados int auto_increment,
    dataHoraDados datetime,
    valor decimal(7,2),
    fkComponente int,
    fkTotem int,
    PRIMARY KEY(idDados, fkComponente),
    FOREIGN KEY (fkComponente) REFERENCES Componentes(idComponente),
    FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem)
);


