-- Active: 1695823604597@@127.0.0.1@3306@ConWay

USE ConWay; 

CREATE TABLE Empresa (
idEmpresa INT PRIMARY KEY IDENTITY(1,1), 
cnpj CHAR(14),
nome VARCHAR(60),
cep CHAR(8),
logradouro VARCHAR(150),
num INT,
telefone CHAR(11)
);

CREATE TABLE Ramo (
	idRamo INT PRIMARY KEY IDENTITY(1,1),
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
    idFuncionario INT PRIMARY KEY IDENTITY(1,1),
    email VARCHAR(80),
    senha VARCHAR(16),
    nome VARCHAR(60),
    cpf CHAR(11),
    telefone CHAR(11),
    dataNascimento DATE,
    foto VARCHAR(255),
    fkGerente INT FOREIGN KEY REFERENCES Funcionario(idFuncionario),
    fkEmpresa INT FOREIGN KEY REFERENCES Empresa(idEmpresa),
);

CREATE TABLE Aeroporto (
    idAeroporto INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(150),
    estado CHAR(2),
    municipio VARCHAR(60)
);

CREATE TABLE temperaturaAeroporto(
	idTempAeroporto INT PRIMARY KEY IDENTITY(1,1),
    temperatura DECIMAL(4,2),
    graus VARCHAR(15),
    dataHora DATETIME,
    fkAeroporto INT FOREIGN KEY REFERENCES Aeroporto(idAeroporto),
);

CREATE TABLE Totem (
idTotem INT PRIMARY KEY IDENTITY(1,1),
nome VARCHAR(45) UNIQUE,
fkAeroporto INT FOREIGN KEY  REFERENCES Aeroporto(idAeroporto) ON DELETE CASCADE,
fkEmpresa INT FOREIGN KEY REFERENCES Empresa(idEmpresa) ON DELETE CASCADE
);

CREATE TABLE Manutencao (
    idManutencao INT PRIMARY KEY IDENTITY(1,1),
    dataManutencao DATE,
    dataLimite DATE,
    motivoManutencao VARCHAR(70),
    urgenciaManutencao VARCHAR(70),
    descricaoManutencao VARCHAR(255),
    valor DECIMAL(8,2),
    fkTotem INT,
    aprovado BIT,
    dataAtual DATE,
    FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem)
);

CREATE TABLE Componente (
    idComponente INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(45),
    unidadeMedida VARCHAR(45)
);

CREATE TABLE Registro (
    idRegistro INT PRIMARY KEY IDENTITY(1,1),
    valor DECIMAL(8,2),
    dataHora DATETIME,
    fkComponente INT FOREIGN KEY REFERENCES Componente(idComponente) ON DELETE CASCADE,
    fkTotem INT FOREIGN KEY REFERENCES Totem(idTotem)
);

CREATE TABLE GrupoProcesso (
     idGrupoProcesso INT PRIMARY KEY AUTO_INCREMENT,
     quantidadeProcesso INT, 
     dataHora DATETIME,
     processoUsoCpu VARCHAR (100),
     processoUsoMemoria varchar(100),
     fkTotem INT,
     FOREIGN KEY (fkTotem) REFERENCES Totem (idTotem) 	
);

CREATE TABLE TotemComponente (
    fkComponente INT FOREIGN KEY  REFERENCES Componente(idComponente) ON DELETE CASCADE,
    fkTotem INT FOREIGN KEY  REFERENCES Totem(idTotem) ON DELETE CASCADE,
    valor FLOAT,
    alerta INT,
	PRIMARY KEY (fkComponente, fkTotem),
    critico INT,
);

CREATE TABLE Alerta (
    idAlerta INT IDENTITY(1,1),
    tipo INT,
    descricao VARCHAR(20),
    fkRegistro INT,
    FOREIGN KEY (fkRegistro) REFERENCES Registro(idRegistro) ON DELETE CASCADE,
    PRIMARY KEY (idAlerta, fkRegistro)
);
GO


CREATE PROCEDURE cadastrarTotem
	@nomeTotem VARCHAR(45),
	@fKAeroporto INT,
	@fkEmpresa INT
AS
	INSERT INTO Totem (nome, fkAeroporto, fkEmpresa)
	VALUES (@nomeTotem, @fKAeroporto, @fkEmpresa);

	SELECT MAX(idTotem) AS idTotem FROM Totem;
GO


CREATE PROCEDURE inserirDadosTotem
    @nomeTotem VARCHAR(45),
    @co1_nome VARCHAR(45),
    @re1_valor DECIMAL(8, 2),
    @co2_nome VARCHAR(45),
    @re2_valor DECIMAL(8, 2),
    @co3_nome VARCHAR(45),
    @re3_valor DECIMAL(8, 2),
    @re_data DATETIME
AS
	INSERT INTO Registro (fkTotem, fkComponente, valor, dataHora) VALUES 
	((SELECT idTotem FROM Totem WHERE nome = @nomeTotem), (SELECT idComponente FROM Componente WHERE nome = @co1_nome), @re1_valor, @re_data);
    INSERT INTO Registro (fkTotem, fkComponente, valor, dataHora) VALUES 
	((SELECT idTotem FROM Totem WHERE nome = @nomeTotem), (SELECT idComponente FROM Componente WHERE nome = @co2_nome), @re2_valor, @re_data);
    INSERT INTO Registro (fkTotem, fkComponente, valor, dataHora) VALUES 
	((SELECT idTotem FROM Totem WHERE nome = @nomeTotem), (SELECT idComponente FROM Componente WHERE nome = @co2_nome), @re3_valor, @re_data);
GO

CREATE PROCEDURE inserirDadosTotemID(@idTotem INT,
                                  @co1_nome VARCHAR(45),
                                  @re1_valor DECIMAL(8, 2),
                                  @co2_nome VARCHAR(45),
                                  @re2_valor DECIMAL(8, 2),
                                  @co3_nome VARCHAR(45),
                                  @re3_valor DECIMAL(8, 2),
                                  @co4_nome VARCHAR(45),
                                  @re4_valor DECIMAL(8, 2),
                                  @re_data DATETIME)
AS
BEGIN
    DECLARE @fkComponente1 INT;
    DECLARE @fkComponente2 INT;
    DECLARE @fkComponente3 INT;
    DECLARE @fkComponente4 INT;

    SET @fkComponente1 = (SELECT idComponente FROM Componente WHERE nome = @co1_nome);
    SET @fkComponente2 = (SELECT idComponente FROM Componente WHERE nome = @co2_nome);
    SET @fkComponente3 = (SELECT idComponente FROM Componente WHERE nome = @co3_nome);
    SET @fkComponente4 = (SELECT idComponente FROM Componente WHERE nome = @co4_nome);


    INSERT INTO Registro (fkTotem, fkComponente, valor, dataHora)
    VALUES (@idTotem, @fkComponente1, @re1_valor, @re_data);

    INSERT INTO Registro (fkTotem, fkComponente, valor, dataHora)
    VALUES (@idTotem, @fkComponente2, @re2_valor, @re_data);

    INSERT INTO Registro (fkTotem, fkComponente, valor, dataHora)
    VALUES (@idTotem, @fkComponente3, @re3_valor, @re_data);

    INSERT INTO Registro (fkTotem, fkComponente, valor, dataHora)
    VALUES (@idTotem, @fkComponente4, @re4_valor, @re_data);
END

-- SCRIPTs GERAIS
SET IDENTITY_INSERT Ramo ON;
INSERT INTO Ramo(idRamo, nome) VALUES (1, 'AirWay'), (2, 'BusWay');
SET IDENTITY_INSERT Ramo OFF;
GO
-- ADMIN
SET IDENTITY_INSERT Empresa ON;
INSERT INTO Empresa (idEmpresa, cnpj, nome) VALUES (1,'1212312300099', 'Airway');
SET IDENTITY_INSERT Empresa OFF;
GO

SET IDENTITY_INSERT Funcionario ON;
INSERT INTO Funcionario(idFuncionario,email,senha,nome,cpf,telefone,dataNascimento,foto,fkGerente, fkEmpresa) VALUES (1,'adm@airway.com', '12345', 'ADMIN AIRWAY', '91836727364', 11956890451, '2000-01-01', NULL, NULL, 1);
SET IDENTITY_INSERT Funcionario OFF;
GO

-- LATAM
INSERT INTO Empresa(cnpj,nome,cep,logradouro,num,telefone) VALUES ('33937681000178', 'LATAM AIRLINES GROUP S/A', '04634042', 'Rua Atica' , 673, '11226872400');
GO

-- COMPONENTE
INSERT INTO Componente (nome, unidadeMedida) VALUES
-- ('CPU', 'GHZ'), ('Memória', 'GB'), ('Disco', 'KB'),
('CPU', '%'), ('MEMORIA', '%'), ('DISCO', '%'), ('TEMPERATURA_CPU', '°C');
GO

INSERT INTO Funcionario(email,senha,nome,cpf,telefone,dataNascimento,foto,fkGerente, fkEmpresa) VALUES ('pedro.henrique@latam.com', '12345', 'Pedro Henrique', '54693866209', '19273526271', '1986-01-01', NULL,1, 2);
GO
INSERT INTO Funcionario(email,senha,nome,cpf,telefone,dataNascimento,foto,fkGerente, fkEmpresa) VALUES ('ana.carolina@latam.com', '12345', 'Ana Carolina', '99988823417', '18273817261', '1994-01-01', NULL, 2, 2);
GO

INSERT INTO Aeroporto (nome, estado, municipio) VALUES ('Congonhas Airport', 'SP', 'Sao Paulo'),
													   ('Brasilia International Airport', 'DF', 'Brasilia'),
													   ('Belo Horizonte International Airport', 'BH', 'Confins');
GO

SET IDENTITY_INSERT Totem ON;
INSERT INTO Totem (idTotem, nome, fkAeroporto, fkEmpresa) VALUES (1,'TLT-1', 1, 2),
                                                        (2,'TLT-8', 1, 2),
                                                        (3,'JDK-3', 2, 2),
                                                        (4,'JDK-9', 2, 2),
                                                        (5,'PYR-3', 3, 2),
                                                        (6,'PYR-10', 3, 2);
SET IDENTITY_INSERT Totem OFF;
GO

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
GO

SET IDENTITY_INSERT Registro ON;
-- Inserir registros para Totens com temperatura em Alerta
INSERT INTO Registro (idRegistro ,valor, dataHora, fkComponente, fkTotem) VALUES
(100026, 78.5, '2023-11-26 10:30:00', 4, 1),
(100027, 76.0, '2023-11-26 11:15:00', 4, 2);
GO

-- Inserir registros para Totens com temperatura Crítica
INSERT INTO Registro (idRegistro, valor, dataHora, fkComponente, fkTotem) VALUES
(100028, 80.0, '2023-11-26 13:45:00', 4, 4),
(100029, 81.8, '2023-11-26 15:15:00', 4, 2);
SET IDENTITY_INSERT Registro OFF;
GO



SET IDENTITY_INSERT Registro ON;
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
SET IDENTITY_INSERT Registro OFF;
GO

INSERT INTO Alerta (tipo, fkRegistro) VALUES (1,100000),
 											 (2,100001),
 											 (2,100002),
 											 (2,100003),
 											 (2,100004),
 											 (2,100005),
 											 (1,100006),
 											 (2,100007),
 											 (2,100008),
 											 (2,100009),
                                             (1,100010),
 											 (2,100011),
 											 (2,100012), 
 											 (2,100013),  
 											 (2,100014), 
 											 (2,100015), 
 											 (1,100016),
 											 (2,100017),
 											 (2,100018), 
 											 (2,100019),
                                             (2,100020), 
                                             (2,100021),
                                             (1,100024),
                                             (1,100025); 
GO

INSERT INTO GrupoProcesso  (quantidadeProcesso, dataHora, processoUsoCpu, processoUsoMemoria, fkTotem )VALUES (13, now(), "Chrome", "IntelliJ", 1),
						                                                                                      (18, now(), "MySQL WorkBench", "Visual Studio", 2),
                                                                                                              (25, now(), "System", "System", 10);
GO

INSERT INTO Manutencao (dataManutencao, dataLimite, motivoManutencao, urgenciaManutencao, descricaoManutencao, valor, fkTotem, aprovado, dataAtual) 
VALUES 
('2023-11-26', '2023-12-01', 'Falha t�cnica', 'Baixa', 'N�o funciona mais.', 650.00, 21, 0, '2023-11-26'),
('2023-11-26', '2023-12-01', 'Desempenho anormal', 'Alta', 'Mostra informa��es que n�o deveria.', 330.00, 22, 0, '2023-11-26'),
('2023-11-26', '2023-12-01', 'Manuten��o preventiva', 'Baixa', 'Manuten��o para que n�o ocorra erros no per�odo de f�rias.', 100.00, 23, 0, '2023-11-26'),
('2023-11-30', '2023-12-01', 'Manuten��o preventiva', 'Baixa', 'Precisar� de manuten��o preventiva para verifica��o dos componentes.', 140.00, 24, 0, '2023-11-26'),
('2023-11-30', '2023-12-01', 'Atualiza��o de software', 'M�dia', 'Muitos erros de software.', 120.00, 25, 0, '2023-11-26'),
('2023-11-30', '2023-12-01', 'Manuten��o preventiva', 'Baixa', 'Manuten��o preventiva para bom funcionamento dos totens no per�odo de f�rias.', 300.00, 11, 0, '2023-11-26'),
('2023-11-30', '2023-12-01', 'Manuten��o preventiva', 'Alta', 'Manuten��o preventiva para �poca de f�rias.', 323.00, 12, 0, '2023-11-26'),
('2023-11-26', '2023-12-01', 'Atualiza��o de software', 'Alta', 'Atualiza��o de software.', 323.00, 13, 0, '2023-11-26'),
('2023-11-26', '2023-12-01', 'Desempenho anormal', 'M�dia', 'Est� muito demorado, com fun��es que n�o deveriam aparecer para os clientes.', 124.00, 14, 0, '2023-11-26'),
('2023-11-27', '2023-12-01', 'Manuten��o preventiva', 'Alta', 'Manuten��o preventiva para �pocas de f�rias.', 124.00, 15, 0, '2023-11-26'),
('2023-11-26', '2023-12-01', 'Atualiza��o de software', 'Baixa', 'Software muito antigo, deve ser atualizado.', 300.00, 1, 0, '2023-11-26'),
('2023-11-26', '2023-12-01', 'Falha t�cnica', 'Alta', 'Falha t�cnica no totem, deve ser concertado imediatamente.', 128.00, 2, 0, '2023-11-26'),
('2023-11-30', '2023-12-01', 'Atualiza��o de software', 'Baixa', 'Deve ser atualizado mais para frente, por enquanto tem um bom funcionamento.', 128.00, 3, 0, '2023-11-26'),
('2023-11-30', '2023-12-01', 'Manuten��o preventiva', 'M�dia', 'Deve ser atualizado para as f�rias.', 128.00, 4, 0, '2023-11-26'),
('2023-11-30', '2023-12-01', 'Manuten��o preventiva', 'Alta', 'Deve ser atualizado para as f�rias.', 128.00, 5, 0, '2023-11-26');
GO

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
GO


-- VIEW
DROP VIEW IF EXISTS vw_aeroportos;
GO
CREATE VIEW vw_aeroportos 
AS
SELECT * FROM Aeroporto;
GO

DROP VIEW IF EXISTS vw_RegistroEstruturado;
GO

CREATE OR ALTER VIEW vw_RegistroEstruturado 
AS 
SELECT r.fkTotem as "idTotem", t.nome as "nome", r.dataHora as "data",
    MAX( CASE WHEN r.fkComponente = 1 THEN r.valor END ) "cpu" ,
    MAX( CASE WHEN r.fkComponente = 2 THEN r.valor END ) "memoria" ,
    MAX( CASE WHEN r.fkComponente = 3 THEN r.valor END ) "disco",
    MAX( CASE WHEN r.fkComponente = 4 THEN r.valor END ) "temperatura",
    a.nome as nomeAero, 
    a.municipio, 
    a.estado, 
    t.fkEmpresa
FROM Registro as r JOIN Totem as t ON r.fkTotem = t.idTotem
JOIN Aeroporto as a ON t.fkAeroporto = a.idAeroporto
GROUP BY r.fkTotem, r.dataHora, t.nome,t.fkEmpresa, a.nome, a.municipio, a.estado;

GO

DROP VIEW IF EXISTS vw_totem_estado;
GO

CREATE VIEW vw_totem_estado AS
SELECT idTotem, t.nome as nomeTotem, fkEmpresa, idAeroporto, a.nome as nomeAeroporto, estado, municipio
		FROM Totem as t JOIN Aeroporto as a ON fkAeroporto = idAeroporto;
GO

DROP VIEW IF EXISTS vw_alertas;
GO

CREATE VIEW vw_alertas AS
SELECT idAlerta, 
        dataHora, 
        tipo, 
        idRegistro, 
        valor, 
        fkComponente as comp, 
        idTotem, 
        Totem.nome, 
        a.idAeroporto as idAero, 
        a.nome as aeroporto, 
        a.estado, 
        a.municipio, fkEmpresa

FROM 
    Alerta 
JOIN 
    Registro ON fkRegistro = idRegistro 
JOIN Totem ON fkTotem = idTotem 
JOIN Aeroporto as a ON fkAeroporto = idAeroporto   
GO

CREATE OR ALTER VIEW vw_totensEmAlerta AS 
SELECT 
    t.idTotem, 
    t.nome AS nomeTotem, 
    MIN(a.tipo) AS tipoAlerta, 
    ar.idAeroporto, 
    ar.nome AS nomeAeroporto, 
    t.fkEmpresa AS idEmpresa
FROM 
    Totem AS t
    INNER JOIN Aeroporto AS ar ON t.fkAeroporto = ar.idAeroporto
    INNER JOIN Registro AS r ON t.idTotem = r.fkTotem
    INNER JOIN Alerta AS a ON r.idRegistro = a.fkRegistro
WHERE 
    dataHora >= DATEADD(SECOND, -10, GETDATE())
    AND dataHora <= GETDATE()
GROUP BY 
    idTotem, t.nome, idAeroporto, ar.nome, t.fkAeroporto, t.fkEmpresa;
GO

SET IDENTITY_INSERT Ramo ON;
INSERT INTO Ramo(idRamo, nome) VALUES (1, 'AirWay'), (2, 'BusWay');
SET IDENTITY_INSERT Ramo OFF;
GO

INSERT INTO RamoEmpresa VALUES (2,1);
GO

INSERT INTO RamoEmpresa VALUES (2,2);
GO


CREATE VIEW maximoValor AS
WITH RankedComponents AS (
    SELECT
        idTotem,
        comp AS componente_mais_problematico,
        COUNT(comp) AS quantidade_de_ocorrencias,
        ROW_NUMBER() OVER (PARTITION BY idTotem ORDER BY COUNT(comp) DESC) AS rn
    FROM vw_alertas
    GROUP BY idTotem, comp
)
SELECT a.idTotem, MAX(a.valor) AS max_valor
FROM vw_alertas a
JOIN RankedComponents rc ON a.idTotem = rc.idTotem AND a.comp = rc.componente_mais_problematico
WHERE rc.rn = 1
GROUP BY a.idTotem;
GO

CREATE VIEW componenteProblematico AS
SELECT idTotem, comp AS componente_mais_problematico
FROM (
    SELECT
        idTotem,
        comp,
        ROW_NUMBER() OVER (PARTITION BY idTotem ORDER BY COUNT(comp) DESC) AS rn
    FROM vw_alertas
    GROUP BY idTotem, comp
) AS RankedComponents
WHERE rn = 1;
GO

CREATE VIEW infosTotem AS
SELECT
    idTotem,
    nome,
    SUM(CASE WHEN valor >= 85.00 AND comp = 1 THEN 1 ELSE 0 END) AS alertaCpu,
    SUM(CASE WHEN valor >= 85.00 AND comp = 2 THEN 1 ELSE 0 END) AS alertaMem,
    SUM(CASE WHEN valor >= 85.00 AND comp = 3 THEN 1 ELSE 0 END) AS alertaDisco
FROM vw_alertas 
GROUP BY idTotem, nome;
GO

DROP VIEW IF EXISTS view_registrosTotem;
GO
CREATE VIEW view_registrosTotem AS
SELECT
    G.fkTotem,
    G.dataHora,
    G.quantidadeProcesso AS ultimoQuantidadeProcesso,
    (SELECT R.valor FROM Registro R WHERE R.fkTotem = G.fkTotem AND R.fkComponente = (SELECT idComponente FROM Componente WHERE nome = 'CPU') ORDER BY R.dataHora DESC LIMIT 1) AS ultimoValorCpu,
    (SELECT R.valor FROM Registro R WHERE R.fkTotem = G.fkTotem AND R.fkComponente = (SELECT idComponente FROM Componente WHERE nome = 'Memória') ORDER BY R.dataHora DESC LIMIT 1) AS ultimoValorMemoria,
    (SELECT R.valor FROM Registro R WHERE R.fkTotem = G.fkTotem AND R.fkComponente = (SELECT idComponente FROM Componente WHERE nome = 'Disco') ORDER BY R.dataHora DESC LIMIT 1) AS ultimoValorDisco
FROM
    GrupoProcesso G;
GO