/*
DROP DATABASE buswayDb;
*/
CREATE DATABASE buswayDb;
USE buswayDb;

CREATE USER IF NOT EXISTS urubu100 IDENTIFIED BY 'urubu100';
GRANT SELECT, INSERT, UPDATE, DELETE ON buswayDb.* TO urubu100;
FLUSH PRIVILEGES;

CREATE TABLE Empresa(
  idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
  cnpj CHAR(14) NOT NULL UNIQUE,
  nome VARCHAR(45) NOT NULL,
  foto VARCHAR(500)
);

CREATE TABLE Linha(
  idLinha INT PRIMARY KEY AUTO_INCREMENT,
  nomeLinhaIda VARCHAR(45) NOT NULL,
  nomeLinhaVolta VARCHAR(45) NOT NULL,
  codLinha CHAR(4),
  tipoLinha CHAR(2),
  fkEmpresa INT NOT NULL,
  FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Modelo(
  idModelo INT PRIMARY KEY AUTO_INCREMENT,
  nomeModelo VARCHAR(45) NOT NULL,
  kilowattPorTonelada DECIMAL(5,2) NOT NULL,
  lotacao INT NOT NULL,
  portasEntrada INT NOT NULL,
  portasSaida INT NOT NULL
);

CREATE TABLE Veiculo(
  idVeiculo INT PRIMARY KEY AUTO_INCREMENT,
  placaVeiculo CHAR(7) NOT NULL UNIQUE,
  anoAquisicao INT NOT NULL,
  fkModelo INT NOT NULL,
  fkEmpresa INT NOT NULL,
  FOREIGN KEY (fkModelo) REFERENCES Modelo(idModelo),
  FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Viagem(
  idViagem INT PRIMARY KEY AUTO_INCREMENT,
  horaInicio DATETIME NOT NULL,
  horaFim DATETIME,
  fkLinha INT NOT NULL,
  fkVeiculo INT NOT NULL,
  FOREIGN KEY (fkLinha) REFERENCES Linha(idLinha),
  FOREIGN KEY (fkVeiculo) REFERENCES Veiculo(idVeiculo)
);

CREATE TABLE Funcionario(
  idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
  cpf CHAR(11) NOT NULL UNIQUE,
  nome VARCHAR(75) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha CHAR(10) NOT NULL,
  celular CHAR(11) NOT NULL,
  fkEmpresa INT NOT NULL,
  fkRepresentante INT,
  foto VARCHAR(500),
  FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
  FOREIGN KEY (fkRepresentante) REFERENCES Funcionario(idFuncionario)
);

CREATE TABLE Ponto(
  idPonto INT PRIMARY KEY AUTO_INCREMENT,
  cep CHAR(8) NOT NULL,
  logradouro VARCHAR(45) NOT NULL,
  numNaRua INT,
  grausY CHAR(7),
  grausX CHAR(7)
);

CREATE TABLE Fluxo(
  idFluxo INT NOT NULL AUTO_INCREMENT,
  entradas INT,
  saidas INT,
  saldoPassageiros INT,
  dataHoraFluxo DATETIME NOT NULL,
  fkViagem INT NOT NULL,
  fkPonto INT NOT NULL,
  PRIMARY KEY (idFluxo, fkViagem),
  FOREIGN KEY (fkViagem) REFERENCES Viagem(idViagem),
  FOREIGN KEY (fkPonto) REFERENCES Ponto(idPonto)
);

CREATE TABLE LinhaPonto(
  fkLinha INT NOT NULL,
  fkPonto INT NOT NULL,
  PRIMARY KEY (fkLinha, fkPonto),
  FOREIGN KEY (fkLinha) REFERENCES Linha(idLinha),
  FOREIGN KEY (fkPonto) REFERENCES Ponto(idPonto)
);

INSERT INTO Modelo VALUES  (1, 'Basico', 0.46, 70, 2, 1),
						   (2, 'Micro-ônibus', 0.3, 20, 1, 1),
                           (3, 'Mini-ônibus', 0.3, 34, 1, 1),
                           (4, 'Midiônibus', 0.4, 50, 2, 1),
                           (5, 'Padron', 0.55, 93, 2, 2),
                           (6, 'Articulado', 0.71, 120, 4, 2),
                           (7, 'Superarticulado', 0.71, 120, 4, 2),
                           (8, 'Biarticulado', 0.8, 180, 4, 2);