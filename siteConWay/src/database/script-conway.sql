-- Active: 1695823604597@@127.0.0.1@3306@ConWay
DROP DATABASE IF EXISTS ConWay ;
CREATE DATABASE ConWay;
USE ConWay; 

CREATE TABLE Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT, 
cnpj CHAR(14),
nome VARCHAR(60),
cep CHAR(8),
logradouro VARCHAR(150),
num INT,
telefone CHAR(11)
);

CREATE TABLE Ramo (
	idRamo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)
);

CREATE TABLE RamoEmpresa (
	fkRamo INT,
    fkEmpresa INT,
	FOREIGN KEY (fkRamo) REFERENCES Ramo(idRamo),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
	PRIMARY KEY (fkRamo, fkEmpresa)
);

CREATE TABLE Funcionario (
    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(80),
    senha VARCHAR(16),
    nome VARCHAR(60),
    cpf CHAR(11),
    telefone CHAR(11),
    dataNascimento DATE,
    foto VARCHAR(255),
    fkGerente INT,
    fkEmpresa INT,
    FOREIGN KEY (fkGerente) REFERENCES Funcionario(idFuncionario),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Aeroporto (
    idAeroporto INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150),
    estado CHAR(2),
    municipio VARCHAR(60)
);

CREATE TABLE Totem (
idTotem INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) UNIQUE,
fkAeroporto INT,
fkEmpresa INT,
FOREIGN KEY (fkAeroporto) REFERENCES Aeroporto(idAeroporto) ON DELETE CASCADE,
FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa) ON DELETE CASCADE
);

CREATE TABLE Componente (
    idComponente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    unidadeMedida VARCHAR(45)
);

CREATE TABLE Registro (
    idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    valor DECIMAL(8,2),
    dataHora DATETIME,
    fkComponente INT,
    fkTotem INT,
    FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente) ON DELETE CASCADE,
    FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem)
);

CREATE TABLE TotemComponente (
    fkComponente INT,
    fkTotem INT,
    FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente) ON DELETE CASCADE,
    FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem) ON DELETE CASCADE,
	PRIMARY KEY (fkComponente, fkTotem)
);

CREATE TABLE Alerta (
    idAlerta INT,
    tipo VARCHAR(45),
    descricao TEXT,
    fkRegistro INT,
    FOREIGN KEY (fkRegistro) REFERENCES Registro(idRegistro) ON DELETE CASCADE,
    PRIMARY KEY (idAlerta, fkRegistro)
);

DELIMITER //
CREATE PROCEDURE cadastrar_maquinaComponente(
	maco_fkComponente INT
)
BEGIN 
	INSERT INTO TotemComponente (fkComponente,fkTotem) VALUES (maco_fkComponente, (SELECT MAX(idTotem) FROM Totem));
END//
DELIMITER ;

-- CREATE PROCEDURE inserirDadosTotem(IN 
--     nomeTotem VARCHAR(45),
--     co1_nome VARCHAR(45),
--     re1_valor DECIMAL(8, 2),
--     co2_nome VARCHAR(45),
--     re2_valor DECIMAL(8, 2),
--     co3_nome VARCHAR(45),
--     re3_valor DECIMAL(8, 2),
--     re_data DATETIME
-- )
-- BEGIN
-- 	INSERT INTO Registro (fkTotem, fkComponente, valor, dataHora) VALUES 
-- 	((SELECT idTotem FROM Totem WHERE nome = nomeTotem), (SELECT idComponente FROM Componente WHERE nome = co1_nome), re1_valor, re_data);
--     INSERT INTO Registro (fkTotem, fkComponente, valor, dataHora) VALUES 
-- 	((SELECT idTotem FROM Totem WHERE nome = nomeTotem), (SELECT idComponente FROM Componente WHERE nome = co2_nome), re2_valor, re_data);
--     INSERT INTO Registro (fkTotem, fkComponente, valor, dataHora) VALUES 
-- 	((SELECT idTotem FROM Totem WHERE nome = nomeTotem), (SELECT idComponente FROM Componente WHERE nome = co3_nome), re3_valor, re_data);
-- END//
-- DELIMITER ;

-- SCRIPTs GERAIS
INSERT INTO Ramo VALUES (1, 'AirWay'), (2, 'BusWay');

-- ADMIN
INSERT INTO Empresa (idEmpresa, cnpj, nome) VALUES (1,'1212312300099', 'Airway');
INSERT INTO RamoEmpresa VALUES (2,1);
INSERT INTO Funcionario (idFuncionario, email, senha, nome, cpf, fkEmpresa) VALUES (1, 'admairway@gmail.com', '12345','ADMIN AIRWAY', '12312312300', 1);

-- LATAM
INSERT INTO Empresa (idEmpresa, cnpj, nome) VALUES (2,'93840678903846', 'Latam');
INSERT INTO Empresa VALUES (NULL, '33937681000178', 'LATAM AIRLINES GROUP S/A', '04634042', 'Rua Atica' , 673, '11226872400');
INSERT INTO RamoEmpresa VALUES (2,2);

-- COMPONENTE
INSERT INTO Componente (nome, unidadeMedida) VALUES
-- ('CPU', 'GHZ'), ('Memória', 'GB'), ('Disco', 'KB'),
('CPU', '%'), ('Memória', '%'), ('Disco', '%');

INSERT INTO Funcionario (idFuncionario, email, senha, nome, cpf, fkGerente, fkEmpresa)
VALUES (2, 'gerentelatam@gmail.com', '12345', 'Fernando Brandão', '54693866209', 1, 2);
INSERT INTO Funcionario (idFuncionario, email, senha, nome, cpf, fkGerente, fkEmpresa)
VALUES (3, 'analistalatam@gmail.com', '12345', 'Julia Lima', '99988823417', 2, 2);

INSERT INTO Aeroporto (nome, estado, municipio) VALUES ('Congonhas', 'SP', 'São Paulo'),
													   ('Viracopos', 'SP', 'Campinas');
						
INSERT INTO Totem (nome, fkAeroporto, fkEmpresa) VALUES ('TLT-1', 1, 2),
													    ('TLT-2', 1, 2),
                                                        ('TLT-3', 1, 2);

INSERT INTO Registro (valor, dataHora, fkComponente, fkTotem) VALUES (15.5, '2023-09-30 12:00:00', 1, 1),
																	 (27.8, '2023-09-30 12:00:00', 2, 1),
                                                                     (63.0, '2023-09-30 12:00:00', 3, 1);

-- USUÁRIO
DROP USER IF EXISTS 'user_conway'@'localhost';
CREATE USER 'user_conway'@'localhost' IDENTIFIED WITH mysql_native_password BY 'urubu100';
GRANT ALL ON ConWay.* TO 'user_conway'@'localhost';
FLUSH PRIVILEGES;

-- VIEW
DROP VIEW IF EXISTS vw_aeroportos;
CREATE VIEW vw_aeroportos AS
SELECT * FROM Aeroporto;

DROP VIEW IF EXISTS vw_RegistroEstruturado;
CREATE OR REPLACE VIEW vw_RegistroEstruturado AS 
SELECT Registro.fkTotem as "ID", Totem.nome as "Nome", Registro.dataHora as "Data",
MAX( CASE WHEN Registro.fkComponente = 1 THEN Registro.valor END ) "CPU" ,
MAX( CASE WHEN Registro.fkComponente = 2 THEN Registro.valor END ) "Memória" ,
MAX( CASE WHEN Registro.fkComponente = 3 THEN Registro.valor END ) "Disco"
FROM Registro JOIN Totem ON fkTotem = idTotem
GROUP BY Registro.fkTotem, Registro.dataHora
ORDER BY Registro.fkTotem, Registro.dataHora ASC;

CREATE VIEW vw_totem_estado AS
SELECT idTotem, t.nome as nomeTotem, fkEmpresa, idAeroporto, a.nome as nomeAeroporto, estado, municipio
		FROM Totem as t JOIN Aeroporto as a ON fkAeroporto = idAeroporto;










