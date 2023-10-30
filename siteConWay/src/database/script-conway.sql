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

CREATE TABLE temperaturaAeroporto(
	idTempAeroporto INT PRIMARY KEY AUTO_INCREMENT,
    temperatura DECIMAL(4,2),
    graus VARCHAR(15),
    dataHora DATETIME,
    fkAeroporto INT,
    FOREIGN KEY(fkAeroporto) REFERENCES Aeroporto(idAeroporto)
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
    valor DOUBLE,
    FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente) ON DELETE CASCADE,
    FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem) ON DELETE CASCADE,
	PRIMARY KEY (fkComponente, fkTotem)
);

CREATE TABLE Alerta (
    idAlerta INT AUTO_INCREMENT,
    tipo INT,
    descricao VARCHAR(20),
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

DELIMITER //
CREATE PROCEDURE cadastrarTotem(
	nomeTotem VARCHAR(45),
    fKAeroporto INT,
    fkEmpresa INT
)
BEGIN 
	INSERT INTO Totem (nome, fkAeroporto, fkEmpresa) VALUES(nomeTotem, fkAeroporto, fkEmpresa) ;
    SELECT MAX(idTotem) AS idTotem FROM Totem;
END//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE inserirDadosTotem(IN 
    nomeTotem VARCHAR(45),
    co1_nome VARCHAR(45),
    re1_valor DECIMAL(8, 2),
    co2_nome VARCHAR(45),
    re2_valor DECIMAL(8, 2),
    co3_nome VARCHAR(45),
    re3_valor DECIMAL(8, 2),
    re_data DATETIME
)
BEGIN
	INSERT INTO Registro (fkTotem, fkComponente, valor, dataHora) VALUES 
	((SELECT idTotem FROM Totem WHERE nome = nomeTotem), (SELECT idComponente FROM Componente WHERE nome = co1_nome), re1_valor, re_data);
    INSERT INTO Registro (fkTotem, fkComponente, valor, dataHora) VALUES 
	((SELECT idTotem FROM Totem WHERE nome = nomeTotem), (SELECT idComponente FROM Componente WHERE nome = co2_nome), re2_valor, re_data);
    INSERT INTO Registro (fkTotem, fkComponente, valor, dataHora) VALUES 
	((SELECT idTotem FROM Totem WHERE nome = nomeTotem), (SELECT idComponente FROM Componente WHERE nome = co2_nome), re3_valor, re_data);
END//
DELIMITER ;

-- SCRIPTs GERAIS
INSERT INTO Ramo VALUES (1, 'AirWay'), (2, 'BusWay');

-- ADMIN
INSERT INTO Empresa (idEmpresa, cnpj, nome) VALUES (1,'1212312300099', 'Airway');
INSERT INTO RamoEmpresa VALUES (2,1);


INSERT INTO Funcionario VALUES (NULL, 'adm@airway.com', '12345', 'ADMIN AIRWAY', '91836727364', 11956890451, '2000-01-01', NULL, NULL, 1);

-- LATAM
INSERT INTO Empresa VALUES (NULL, '33937681000178', 'LATAM AIRLINES GROUP S/A', '04634042', 'Rua Atica' , 673, '11226872400');
INSERT INTO RamoEmpresa VALUES (2,2);

-- COMPONENTE
INSERT INTO Componente (nome, unidadeMedida) VALUES
-- ('CPU', 'GHZ'), ('Memória', 'GB'), ('Disco', 'KB'),
('CPU', '%'), ('Memória', '%'), ('Disco', '%'),('Disco','GB');

INSERT INTO Funcionario VALUES (NULL, 'gerente@latam.com', '12345', 'Pedro Henrique', '54693866209', '19273526271', '1986-01-01', NULL,1, 2);
INSERT INTO Funcionario VALUES (NULL, 'analista@latam.com', '12345', 'Ana Carolina', '99988823417', '18273817261', '1994-01-01', NULL, 2, 2);

INSERT INTO Aeroporto (nome, estado, municipio) VALUES ('Congonhas', 'SP', 'São Paulo'),
													   ('Brasília', 'DF', 'Brasília'),
													   ('Confins', 'BH', 'Confins');
						
INSERT INTO Totem (nome, fkAeroporto, fkEmpresa) VALUES ('TLT-1', 1, 2),
													    ('TLT-2', 1, 2),
													    ('TLT-3', 1, 2),
													    ('JDK-1', 2, 2),
													    ('JDK-2', 2, 2),
                                                        ('PYR-1', 3, 2);

INSERT INTO TotemComponente VALUES (4,1,256.4),
								   (4,2,528.6),
                                   (4,3,128.8);
                                   
INSERT INTO Registro (idRegistro,valor, dataHora, fkComponente, fkTotem) VALUES (100000,0.0, NOW(), 1,1),
																	 (100001,0.0, NOW(), 2,1),
																	 (100002,0.0, NOW(), 1,2),
																	 (100003,0.0, NOW(), 2,2),
																	 (100004,0.0, NOW(), 1,3),
																	 (100005,0.0, NOW(), 2,3),
																	 (100006,0.0, NOW(), 1,4),
																	 (100007,0.0, NOW(), 2,4),
																	 (100008,0.0, NOW(), 1,5),
																	 (100009,0.0, NOW(), 2,5),
																	 (100010,0.0, NOW(), 1,6),
																	 (100011,0.0, NOW(), 2,6);
                                                                     
                                                                   
INSERT INTO Alerta (tipo, fkRegistro) VALUES (1,100000),
 											 (1,100001),
 											 (1,100002),
 											 (1,100003),
 											 (1,100004),
 											 (1,100005),
 											 (1,100006),
 											 (1,100007),
 											 (1,100008),
 											 (1,100009),
 											 (1,100010),
 											 (1,100011);


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
SELECT r.fkTotem as "idTotem", t.nome as "nome", r.dataHora as "data",
MAX( CASE WHEN r.fkComponente = 1 THEN r.valor END ) "cpu" ,
MAX( CASE WHEN r.fkComponente = 2 THEN r.valor END ) "memoria" ,
MAX( CASE WHEN r.fkComponente = 3 THEN r.valor END ) "disco",
a.nome as nomeAero, a.municipio, a.estado, t.fkEmpresa
FROM Registro as r JOIN Totem as t ON r.fkTotem = t.idTotem
JOIN Aeroporto as a ON t.fkAeroporto = a.idAeroporto
GROUP BY r.fkTotem, r.dataHora
ORDER BY r.fkTotem, r.dataHora ASC;

DROP VIEW IF EXISTS vw_totem_estado;
CREATE VIEW vw_totem_estado AS
SELECT idTotem, t.nome as nomeTotem, fkEmpresa, idAeroporto, a.nome as nomeAeroporto, estado, municipio
		FROM Totem as t JOIN Aeroporto as a ON fkAeroporto = idAeroporto;
        
-- View para coletar os ultimos dados do disco de todas as máquinas, para filtrar por idTotem na rota do webdataviz
DROP VIEW IF EXISTS vw_disco_atual;
CREATE VIEW vw_disco_atual AS
SELECT t.idTotem, t.nome as totem, c.idComponente as idComp, c.nome as comp, tc.valor, c.unidadeMedida as medida, r.valor as porcent, r.dataHora
		FROM Totem as t JOIN TotemComponente as tc ON fkTotem = idTotem 
			JOIN Componente as c ON fkComponente = idComponente
				JOIN Registro as r ON r.fkTotem = idTotem AND r.fkComponente = 3 ORDER BY dataHora DESC;

DROP VIEW IF EXISTS vw_alertas;
CREATE VIEW vw_alertas AS
SELECT idAlerta, dataHora, tipo, idRegistro, valor, fkComponente as comp, idTotem, Totem.nome, a.idAeroporto as idAero, a.nome as aeroporto, a.estado, a.municipio, fkEmpresa
		FROM Alerta JOIN Registro ON fkRegistro = idRegistro JOIN Totem ON fkTotem = idTotem JOIN Aeroporto as a ON fkAeroporto = idAeroporto ORDER BY dataHora DESC;                