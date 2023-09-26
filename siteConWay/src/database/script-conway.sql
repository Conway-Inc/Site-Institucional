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

CREATE TABLE Estado (
	idEstado INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60)
);

CREATE TABLE Municipio (
	idMunicipio INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    fkEstado INT,
    FOREIGN KEY (fkEstado) REFERENCES Estado(idEstado)
);

CREATE TABLE Aeroporto (
    idAeroporto INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    fkMunicipio INT,
    FOREIGN KEY (fkMunicipio) REFERENCES Municipio(idMunicipio)
);

CREATE TABLE Totem (
idTotem INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
fkAeroporto INT,
fkEmpresa INT,
FOREIGN KEY (fkAeroporto) REFERENCES Aeroporto(idAeroporto),
FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
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
    FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente),
    FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem)
);

CREATE TABLE TotemComponente (
    fkComponente INT,
    fkTotem INT,
    FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente),
    FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem),
	PRIMARY KEY (fkComponente, fkTotem)
);

-- SCRIPTs GERAIS
INSERT INTO Ramo VALUES (1, 'AirWay'), (2, 'BusWay');
INSERT INTO Aeroporto (nome, cep, logradouro, num) VALUES 
		('Aeroporto de São Paulo', '01001000', 'Avenida Santos Dumont', 3000);

-- ADMIN
INSERT INTO Empresa (idEmpresa, cnpj, nome) VALUES (1,'1212312300099', 'Airway');
INSERT INTO RamoEmpresa VALUES (2,1);
INSERT INTO Funcionario (idFuncionario, email, senha, nome, cpf, fkEmpresa) VALUES (1, 'admairway@gmail.com', '12345','ADMIN AIRWAY', '12312312300', 1);

-- LATAM
INSERT INTO Empresa (idEmpresa, cnpj, nome) VALUES (2,'93840678903846', 'Latam');
INSERT INTO RamoEmpresa VALUES (2,2);

INSERT INTO Funcionario (idFuncionario, email, senha, nome, cpf, fkGerente, fkEmpresa)
VALUES (2, 'gerentelatam@gmail.com', '12345', 'Fernando Brandão', '54693866209', 1, 2);
INSERT INTO Funcionario (idFuncionario, email, senha, nome, cpf, fkGerente, fkEmpresa)
VALUES (3, 'analistalatam@gmail.com', '12345', 'Julia Lima', '99988823417', 2, 2);

INSERT INTO Totem (idTotem, nome, fkAeroporto, fkEmpresa)
VALUES (1, 'Totem Latam 1', 1, 2);

-- USUÁRIO
DROP USER IF EXISTS 'user_conway'@'localhost';
CREATE USER 'user_conway'@'localhost' IDENTIFIED BY 'urubu100';
GRANT ALL ON conway.* TO 'user_conway'@'localhost';
FLUSH PRIVILEGES;

