DROP DATABASE IF EXISTS Conway;
CREATE DATABASE Conway;
USE Conway; 

-- CONWAY
CREATE TABLE Empresa (
idEmpresa int primary key auto_increment, 
cnpjEmpr varchar(19),
nomeEmpr varchar(45),
ramoEmpr varchar(45)
);

CREATE TABLE Funcionario (
    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    cpfFunc VARCHAR(15),
    nomeFunc VARCHAR(45),
    emailFunc VARCHAR(45),
    senhaFunc VARCHAR(45),
    fkGerente INT,
    fkEmpresa INT,
    FOREIGN KEY (fkGerente) REFERENCES Funcionario(idFuncionario),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

-- AIRWAY
CREATE TABLE Componentes (
idComponente int primary key auto_increment,
nomeComponente varchar(45),
metricaComponente varchar(45),
limiteComponente DECIMAL(8,2),
minimoComponente DECIMAL(8,2),
maxTempComponente DECIMAL(8,2),
minTempComponente DECIMAL(8,2)
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
FOREIGN KEY (fkAeroporto) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Registros (
    idRegistros INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME,
    valor DECIMAL(7,2),
    fkComponente INT,
    fkTotem INT,
    FOREIGN KEY (fkComponente) REFERENCES Componentes(idComponente),
    FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem)
);

-- ADMIN
INSERT INTO Empresa (idEmpresa, cnpjEmpr, nomeEmpr, ramoEmpr)
VALUES (1,'12345678901234', 'Airway', 'Transporte Aéreo');
INSERT INTO Funcionario (idFuncionario, nomeFunc, emailFunc, senhaFunc, fkEmpresa)
VALUES (1,'ADM AIRWAY', 'admairway@gmail.com', '12345', (SELECT idEmpresa FROM Empresa WHERE nomeEmpr = 'Airway'));

-- LATAM
INSERT INTO Empresa (idEmpresa, cnpjEmpr, nomeEmpr, ramoEmpr)
VALUES (2, '93840678903846', 'Latam', 'Transporte Aéreo');

INSERT INTO Funcionario (idFuncionario, cpfFunc, nomeFunc, emailFunc, senhaFunc, fkGerente, fkEmpresa)
VALUES (2, '54693866209', 'Fernando Brandão', 'gerentelatam@gmail.com', '12345', 1, 2),
	   (3, '99988823417', 'Julia Lima', 'analistalatam@gmail.com', '12345', 2, 2);

INSERT INTO Componentes (idComponente, nomeComponente, metricaComponente, limiteComponente, minimoComponente, maxTempComponente, minTempComponente)
VALUES (1,'cpuPercent', 'Porcentagem', 95, 20, 90, 30),
	   (2,'cpuFreq', 'GhZ', 4300, 500, 90, 30),
       (3,'memoriaMB', 'MB', 16000, 2000, 70, 20);

INSERT INTO Aeroporto (idAeroporto, nomeAeroporto, cep, logradouro, numero, cidade, estado, fkEmpresa)
VALUES (1, 'Aeroporto de São Paulo', '01001000', 'Avenida Santos Dumont', 3000, 'São Paulo', 'SP', (SELECT idEmpresa FROM Empresa WHERE nomeEmpr = 'Latam'));

INSERT INTO Totem (idTotem, marcaTotem, nomeTotem, numeroSerieTotem, fkAeroporto)
VALUES (1,'TotemAir', 'Totem 1', '1234567890', 1);

INSERT INTO Registros (dataHora, valor, fkComponente, fkTotem)
VALUES ('2023-07-20 10:00:00', 85, 1, 1),
	   ('2023-07-20 10:00:20', 85, 1, 1),
       ('2023-07-20 10:00:20', 2285, 2, 1),
       ('2023-07-20 10:00:20', 3385, 3, 1),
       ('2023-07-20 10:00:20', 1885, 3, 1);

-- USUÁRIO
DROP USER IF EXISTS 'user_conway'@'localhost';
CREATE USER 'user_conway'@'localhost' IDENTIFIED BY 'urubu100';
GRANT ALL ON airway.* TO 'user_conway'@'localhost';
FLUSH PRIVILEGES;

-- VIEW
CREATE VIEW CompDados AS 
SELECT * FROM Registros JOIn Componentes ON fkComponente = idComponente;

CREATE VIEW vwFuncsEmpresa AS
SELECT
    f.*,
    e.idEmpresa,
    e.ramoEmpr,
    e.cnpjEmpr,
    e.nomeEmpr AS nomeEmpresa
FROM Empresa AS e
JOIN Funcionario AS f ON e.idEmpresa = f.fkEmpresa;


SET @sql = NULL; -- Criando uma variável para armazenar o comando

SELECT
  GROUP_CONCAT(DISTINCT
    CONCAT(
      "max(case when nomeComponente = '" , nomeComponente , "'", -- aqui vem o nome que você setou para os componentes na view!
      " then valor end) as '",
      nomeComponente, "'" -- aqui vem o nome que você setou para os componentes na view!
    )
  )
INTO @sql

FROM
  CompDados; -- Aqui vem o nome da sua view!
  
-- max(case when Componente = 'Componente1' then Registro end) Componente1,
-- max(case when Componente = 'Componente2' then Registro end) Componente2, .....

SET @sql = CONCAT('SELECT fkTotem, dataHora, ', @sql, ' FROM CompDados GROUP BY fkTotem, dataHora'); -- Lembra de trocar as informações (idServidor, MomentoRegistro, tabelaRegistros) pelos nomes que você usou na view

PREPARE stmt FROM @sql; -- Prepara um statement para executar o comando guardado na variável @sql

EXECUTE stmt; -- Executa o statement









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