



-- BUSWAY
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
    idFluxo INT AUTO_INCREMENT,
    dataHoraFluxo DATETIME,
    entradas INT,
    saidas INT,
    Viagem_idViagem INT,
    Viagem_Linha_idLinha INT,
    FOREIGN KEY (Viagem_idViagem)
        REFERENCES Viagem (idViagem),
    FOREIGN KEY (Viagem_Linha_idLinha)
        REFERENCES Linha (idLinha),
    PRIMARY KEY (idFluxo , Viagem_idViagem , Viagem_Linha_idLinha),
    Ponto_idPonto INT,
    FOREIGN KEY (Ponto_idPonto)
        REFERENCES Ponto (idPonto)
);