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
    nome VARCHAR(150) UNIQUE,
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
    alerta INT,
    critico INT,
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

CREATE TABLE Manutencao (
     idManutenção INT PRIMARY KEY AUTO_INCREMENT,
     dataManutencao DATE,
     dataLimite DATE,
     motivoManutencao VARCHAR (70),
     urgenciaManutencao VARCHAR (70),
     descricaoManutencao VARCHAR (255),
     valor DECIMAL (8,2),
	 fkTotem INT,
     aprovado BOOLEAN,
     dataAtual DATE,
     FOREIGN KEY (fkTotem) REFERENCES Totem (idTotem) 
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

DELIMITER //
CREATE PROCEDURE inserirDadosTotemID(IN 
    idTotem INT,
    co1_nome VARCHAR(45),
    re1_valor DECIMAL(8, 2),
    co2_nome VARCHAR(45),
    re2_valor DECIMAL(8, 2),
    co3_nome VARCHAR(45),
    re3_valor DECIMAL(8, 2),
    co4_nome VARCHAR(45),
    re4_valor DECIMAL(8, 2),
    re_data DATETIME
)
BEGIN
	INSERT INTO Registro (fkTotem, fkComponente, valor, dataHora) VALUES 
	(idTotem, (SELECT idComponente FROM Componente WHERE nome = co1_nome), re1_valor, re_data);
    INSERT INTO Registro (fkTotem, fkComponente, valor, dataHora) VALUES 
	(idTotem, (SELECT idComponente FROM Componente WHERE nome = co2_nome), re2_valor, re_data);
    INSERT INTO Registro (fkTotem, fkComponente, valor, dataHora) VALUES 
	(idTotem, (SELECT idComponente FROM Componente WHERE nome = co3_nome), re3_valor, re_data);
     INSERT INTO Registro (fkTotem, fkComponente, valor, dataHora) VALUES 
	(idTotem, (SELECT idComponente FROM Componente WHERE nome = co4_nome), re4_valor, re_data);
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
('CPU', '%'), ('Memória', '%'), ('Disco', '%'), ('Temperatura CPU', '°C');

INSERT INTO Funcionario VALUES (NULL, 'pedro.henrique@latam.com', '12345', 'Pedro Henrique', '54693866209', '19273526271', '1986-01-01', NULL,1, 2);
INSERT INTO Funcionario VALUES (NULL, 'ana.carolina@latam.com', '12345', 'Ana Carolina', '99988823417', '18273817261', '1994-01-01', NULL, 2, 2);

INSERT INTO Aeroporto (nome, estado, municipio) VALUES ('Congonhas Airport', 'SP', 'São Paulo'),
													   ('Brasilia International Airport', 'DF', 'Brasília'),
													   ('Belo Horizonte International Airport', 'BH', 'Confins');


INSERT INTO Totem (idTotem, nome, fkAeroporto, fkEmpresa) VALUES (1,'TLT-1', 1, 2),
                                                        (2,'TLT-8', 1, 2),
                                                        (3,'JDK-3', 2, 2),
                                                        (4,'JDK-9', 2, 2),
                                                        (5,'PYR-3', 3, 2),
                                                        (6,'PYR-10', 3, 2);
                                                        
INSERT INTO Totem (nome, fkAeroporto, fkEmpresa) VALUES ('TLT-2', 1, 2),
													    ('TLT-3', 1, 2),
                                                        ('TLT-4', 1, 2),
                                                        ('TLT-5', 1, 2),
                                                        ('TLT-6', 1, 2),
                                                        ('TLT-7', 1, 2),
                                                        ('TLT-9', 1, 2),
                                                        ('TLT-10', 1, 2),
													    ('JDK-1', 2, 2),
													    ('JDK-2', 2, 2),
                                                        ('JDK-4', 2, 2),
                                                        ('JDK-5', 2, 2),
                                                        ('JDK-6', 2, 2),
                                                        ('JDK-7', 2, 2),
                                                        ('JDK-8', 2, 2),
                                                        ('JDK-10', 2, 2),
                                                        ('PYR-1', 3, 2),
                                                        ('PYR-2', 3, 2),
                                                        ('PYR-4', 3, 2),
                                                        ('PYR-5', 3, 2),
                                                        ('PYR-6', 3, 2), 
                                                        ('PYR-7', 3, 2),
                                                        ('PYR-8', 3, 2),
                                                        ('PYR-9', 3, 2),
                                                        ('PYR-11', 3, 2);

INSERT INTO Manutencao (dataManutencao, dataLimite, motivoManutencao, urgenciaManutencao, descricaoManutencao, valor, fkTotem, aprovado, dataAtual) 
VALUES 
('2023-11-26', '2023-12-01', 'Falha técnica', 'Baixa', 'Não funciona mais.', 650.00, 21, 0, '2023-11-26'),
('2023-11-26', '2023-12-01', 'Desempenho anormal', 'Alta', 'Mostra informações que não deveria.', 330.00, 22, 0, '2023-11-26'),
('2023-11-26', '2023-12-01', 'Manutenção preventiva', 'Baixa', 'Manutenção para que não ocorra erros no período de férias.', 100.00, 23, 0, '2023-11-26'),
('2023-11-30', '2023-12-01', 'Manutenção preventiva', 'Baixa', 'Precisará de manutenção preventiva para verificação dos componentes.', 140.00, 24, 0, '2023-11-26'),
('2023-11-30', '2023-12-01', 'Atualização de software', 'Média', 'Muitos erros de software.', 120.00, 25, 0, '2023-11-26'),
('2023-11-30', '2023-12-01', 'Manutenção preventiva', 'Baixa', 'Manutenção preventiva para bom funcionamento dos totens no período de férias.', 300.00, 11, 0, '2023-11-26'),
('2023-11-30', '2023-12-01', 'Manutenção preventiva', 'Alta', 'Manutenção preventiva para época de férias.', 323.00, 12, 0, '2023-11-26'),
('2023-11-26', '2023-12-01', 'Atualização de software', 'Alta', 'Atualização de software.', 323.00, 13, 0, '2023-11-26'),
('2023-11-26', '2023-12-01', 'Desempenho anormal', 'Média', 'Está muito demorado, com funções que não deveriam aparecer para os clientes.', 124.00, 14, 0, '2023-11-26'),
('2023-11-27', '2023-12-01', 'Manutenção preventiva', 'Alta', 'Manutenção preventiva para épocas de férias.', 124.00, 15, 0, '2023-11-26'),
('2023-11-26', '2023-12-01', 'Atualização de software', 'Baixa', 'Software muito antigo, deve ser atualizado.', 300.00, 1, 0, '2023-11-26'),
('2023-11-26', '2023-12-01', 'Falha técnica', 'Alta', 'Falha técnica no totem, deve ser concertado imediatamente.', 128.00, 2, 0, '2023-11-26'),
('2023-11-30', '2023-12-01', 'Atualização de software', 'Baixa', 'Deve ser atualizado mais para frente, por enquanto tem um bom funcionamento.', 128.00, 3, 0, '2023-11-26'),
('2023-11-30', '2023-12-01', 'Manutenção preventiva', 'Média', 'Deve ser atualizado para as férias.', 128.00, 4, 0, '2023-11-26'),
('2023-11-30', '2023-12-01', 'Manutenção preventiva', 'Alta', 'Deve ser atualizado para as férias.', 128.00, 5, 0, '2023-11-26');

INSERT INTO TotemComponente VALUES (1, 1, null, 85, 95),
                                   (2, 1, null, 85, 95),
                                   (3, 1, null, 85, 95),
                                   (1, 2, null, 85, 95),
                                   (2, 2, null, 85, 95),
                                   (3, 2, null, 85, 95),
                                   (1, 3, null, 85, 95),
                                   (2, 3, null, 85, 95),
                                   (3, 3, null, 85, 95),
                                   (1, 4, null, 85, 95),
                                   (2, 4, null, 85, 95),
                                   (3, 4, null, 85, 95),
                                   (1, 5, null, 85, 95),
                                   (2, 5, null, 85, 95),
                                   (3, 5, null, 85, 95),
                                   (1, 6, null, 85, 95),
                                   (2, 6, null, 85, 95),
                                   (3, 6, null, 85, 95),
                                   (1, 7, null, 85, 95),
                                   (2, 7, null, 85, 95),
                                   (3, 7, null, 85, 95),
                                   (1, 8, null, 85, 95),
                                   (2, 8, null, 85, 95),
                                   (3, 8, null, 85, 95),
                                   (1, 9, null, 85, 95),
                                   (2, 9, null, 85, 95),
                                   (3, 9, null, 85, 95),
                                   (1, 10, null, 85, 95),
                                   (2, 10, null, 85, 95),
                                   (3, 10, null, 85, 95),
                                   (1, 11, null, 85, 95),
                                   (2, 11, null, 85, 95),
                                   (3, 11, null, 85, 95),
                                   (1, 12, null, 85, 95),
                                   (2, 12, null, 85, 95),
                                   (3, 12, null, 85, 95),
                                   (1, 13, null, 85, 95),
                                   (2, 13, null, 85, 95),
                                   (3, 13, null, 85, 95),
                                   (1, 14, null, 85, 95),
                                   (2, 14, null, 85, 95),
                                   (3, 14, null, 85, 95),
                                   (1, 15, null, 85, 95),
                                   (2, 15, null, 85, 95),
                                   (3, 15, null, 85, 95),
                                   (1, 16, null, 85, 95),
                                   (2, 16, null, 85, 95),
                                   (3, 16, null, 85, 95),
                                   (1, 17, null, 85, 95),
                                   (2, 17, null, 85, 95),
                                   (3, 17, null, 85, 95),
                                   (1, 18, null, 85, 95),
                                   (2, 18, null, 85, 95),
                                   (3, 18, null, 85, 95),
                                   (1, 19, null, 85, 95),
                                   (2, 19, null, 85, 95),
                                   (3, 19, null, 85, 95),
                                   (1, 20, null, 85, 95),
                                   (2, 20, null, 85, 95),
                                   (3, 20, null, 85, 95),
                                   (1, 21, null, 85, 95),
                                   (2, 21, null, 85, 95),
                                   (3, 21, null, 85, 95),
                                   (1, 22, null, 85, 95),
                                   (2, 22, null, 85, 95),
                                   (3, 22, null, 85, 95),
                                   (1, 23, null, 85, 95),
                                   (2, 23, null, 85, 95),
                                   (3, 23, null, 85, 95),
                                   (1, 24, null, 85, 95),
                                   (2, 24, null, 85, 95),
                                   (3, 24, null, 85, 95),
                                   (1, 25, null, 85, 95),
                                   (2, 25, null, 85, 95),
                                   (3, 25, null, 85, 95),
                                   (1, 26, null, 85, 95),
                                   (2, 26, null, 85, 95),
                                   (3, 26, null, 85, 95),
                                   (1, 27, null, 85, 95),
                                   (2, 27, null, 85, 95),
                                   (3, 27, null, 85, 95),
                                   (1, 28, null, 85, 95),
                                   (2, 28, null, 85, 95),
                                   (3, 28, null, 85, 95),
                                   (1, 29, null, 85, 95),
                                   (2, 29, null, 85, 95),
                                   (3, 29, null, 85, 95),
                                   (1, 30, null, 85, 95),
                                   (2, 30, null, 85, 95),
                                   (3, 30, null, 85, 95),
                                   (1, 31, null, 85, 95),
                                   (2, 31, null, 85, 95),
                                   (3, 31, null, 85, 95);
         
INSERT INTO Registro (idRegistro,valor, dataHora, fkComponente, fkTotem) VALUES (100000,0.0, '2023-11-07 12:00:00', 1,1),
                                                                                (100001,0.0, '2023-11-07 12:00:00', 2,1),
                                                                                (100002,0.0, '2023-11-07 12:00:00', 1,2),
                                                                                (100003,0.0, '2023-11-07 12:00:00', 2,2),
                                                                                (100004,0.0, '2023-11-07 12:00:00', 1,3),
                                                                                (100005,0.0, '2023-11-07 12:00:00', 2,3),
                                                                                (100006,0.0, '2023-11-07 12:00:00', 1,4),
                                                                                (100007,0.0, '2023-11-07 12:00:00', 2,4),
                                                                                (100008,0.0, '2023-11-07 12:00:00', 1,5),
                                                                                (100009,0.0, '2023-11-07 12:00:00', 2,5),
                                                                                (100010,0.0, '2023-11-07 12:00:00', 1,6),
                                                                                (100011,0.0, '2023-11-07 12:00:00', 2,6),
                                                                                (100012,0.0, '2023-11-07 12:10:00', 1,1),
                                                                                (100013,0.0, '2023-11-07 12:10:00', 2,1),
                                                                                (100014,0.0, '2023-11-07 12:10:00', 1,2),
                                                                                (100015,0.0, '2023-11-07 12:10:00', 2,2),
                                                                                (100016,0.0, '2023-11-07 12:10:00', 1,3),
                                                                                (100017,0.0, '2023-11-07 12:10:00', 2,3),
                                                                                (100018,0.0, '2023-11-07 12:10:00', 1,4),
                                                                                (100019,0.0, '2023-11-07 12:10:00', 2,4),
                                                                                (100020,0.0, '2023-11-07 12:10:00', 1,5),
                                                                                (100021,0.0, '2023-11-07 12:10:00', 2,5),
                                                                                (100022,0.0, '2023-11-07 12:10:00', 1,6),
                                                                                (100023,0.0, '2023-11-07 12:10:00', 2,6),
                                                                                (100024,0.0, '2023-10-16 00:00:00', 1,6),
 																	            (100025,0.0, '2023-10-16 00:00:00', 1,6);
                                                                                
-- Inserir registros para Totens com temperatura em Alerta
INSERT INTO Registro (valor, dataHora, fkComponente, fkTotem) VALUES
(78.5, '2023-11-26 10:30:00', 4, 1),
(77.8, '2023-11-26 10:30:00', 4, 1),
(76.0, '2023-11-26 11:15:00', 4, 2);

-- Inserir registros para Totens com temperatura Crítica
INSERT INTO Registro (valor, dataHora, fkComponente, fkTotem) VALUES
(80.0, '2023-11-26 13:45:00', 4, 4);
 
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

DROP VIEW IF EXISTS vw_alertas;
CREATE VIEW vw_alertas AS
SELECT idAlerta, dataHora, tipo, idRegistro, valor, fkComponente as comp, idTotem, Totem.nome, a.idAeroporto as idAero, a.nome as aeroporto, a.estado, a.municipio, fkEmpresa
		FROM Alerta JOIN Registro ON fkRegistro = idRegistro JOIN Totem ON fkTotem = idTotem JOIN Aeroporto as a ON fkAeroporto = idAeroporto ORDER BY dataHora DESC;       

CREATE VIEW vw_totensEmAlerta AS 
SELECT t.idTotem, t.nome AS nomeTotem, min(a.tipo) AS tipoAlerta, ar.idAeroporto, ar.nome AS nomeAeroporto, t.fkEmpresa AS idEmpresa
    FROM Totem AS t
    INNER JOIN Aeroporto AS ar ON t.fkAeroporto = ar.idAeroporto
    INNER JOIN Registro AS r ON t.idTotem = r.fkTotem
    INNER JOIN Alerta AS a ON r.idRegistro = a.fkRegistro
    WHERE dataHora = (SELECT dataHora FROM vw_alertas ORDER BY idAlerta DESC LIMIT 1) GROUP BY idTotem, nomeTotem, idAeroporto, nomeAeroporto;     