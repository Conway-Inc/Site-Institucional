DROP DATABASE IF EXISTS ConWay ;
CREATE DATABASE ConWay;
USE ConWay; 

CREATE TABLE Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT, 
cnpjEmpr VARCHAR(19),
nomeEmpr VARCHAR(45),
ramoEmpr VARCHAR(45)
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
    idDados INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME,
    valor decimal(7,2),
    fkComponente int,
    fkTotem int,
    FOREIGN KEY (fkComponente) REFERENCES Componentes(idComponente),
    FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem)
);

-- ADMIN
INSERT INTO Empresa (idEmpresa, cnpjEmpr, nomeEmpr, ramoEmpr)
VALUES (1,'12345678901234', 'Airway', 'Transporte Aéreo');
INSERT INTO Funcionario (idFuncionario, cpfFunc, nomeFunc, emailFunc, senhaFunc, fkEmpresa)
VALUES (1,'54693866209', 'ADMIN AIRWAY', 'admairway@gmail.com', '12345', 1);

-- LATAM
INSERT INTO Empresa (idEmpresa, cnpjEmpr, nomeEmpr, ramoEmpr)
VALUES (2,'93840678903846', 'Latam', 'Transporte Aéreo');

INSERT INTO Funcionario (idFuncionario, cpfFunc, nomeFunc, emailFunc, senhaFunc, fkGerente, fkEmpresa)
VALUES (2,'54693866209', 'Fernando Brandão', 'gerentelatam@gmail.com', '12345', 1, 2);
INSERT INTO Funcionario (idFuncionario,cpfFunc, nomeFunc, emailFunc, senhaFunc, fkGerente, fkEmpresa)
VALUES (3,'99988823417', 'Julia Lima', 'analistalatam@gmail.com', '12345', 2, 2);

INSERT INTO Componentes (idComponente,nomeComponente, metricaComponente, limiteComponente, minimoComponente, maxTempComponente, minTempComponente)
VALUES (1,'cpuPercentual', '%', 95, 20, 90, 30),
	   (2,'cpuFrequencia', 'GhZ', 4300, 500, 90, 30),
       (3,'memoriaMB', 'MB', 16000, 2000, 70, 20);

INSERT INTO Aeroporto (idAeroporto, nomeAeroporto, cep, logradouro, numero, cidade, estado, fkEmpresa)
VALUES (1, 'Aeroporto de São Paulo', '01001000', 'Avenida Santos Dumont', 3000, 'São Paulo', 'SP', 2);

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
GRANT ALL ON conway.* TO 'user_conway'@'localhost';
FLUSH PRIVILEGES;

-- VIEW
CREATE VIEW CompRegistros AS SELECT * FROM Registros JOIn Componentes ON fkComponente = idComponente;

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
  CompRegistros; -- Aqui vem o nome da sua view!
  
-- max(case when Componente = 'Componente1' then Registro end) Componente1,
-- max(case when Componente = 'Componente2' then Registro end) Componente2, .....

SET @sql = CONCAT('SELECT fkTotem, dataHora, ', @sql, ' FROM CompRegistros GROUP BY fkTotem, dataHora'); -- Lembra de trocar as informações (idServidor, MomentoRegistro, tabelaRegistros) pelos nomes que você usou na view

PREPARE stmt FROM @sql; -- Prepara um statement para executar o comando guardado na variável @sql

-- EXECUTE stmt; -- Executa o statement
