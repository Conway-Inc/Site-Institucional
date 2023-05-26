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
  kmsPorLitro DECIMAL(5,2) NOT NULL,
  lotacao INT NOT NULL,
  portasEntrada INT NOT NULL,
  portasSaida INT NOT NULL
);

CREATE TABLE Veiculo(
  idVeiculo INT PRIMARY KEY AUTO_INCREMENT,
  placaVeiculo CHAR(6) NOT NULL UNIQUE,
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
  nome VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  senha CHAR(10) NOT NULL,
  celular CHAR(11) NOT NULL,
  fkEmpresa INT NOT NULL,
  fkRepresentante INT,
  foto VARCHAR(500),
  FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
  FOREIGN KEY (fkRepresentante) REFERENCES Funcionario(idFuncionario)
);

CREATE TABLE Ponto(
  idPonto INT PRIMARY KEY,
  cep CHAR(8) NOT NULL,
  logradouro VARCHAR(45) NOT NULL,
  numNaRua INT NOT NULL,
  grausY CHAR(7),
  grausX CHAR(7)
);

CREATE TABLE Fluxo(
  idFluxo INT NOT NULL,
  entradas INT,
  saidas INT,
  dataHoraFluxo DATETIME NOT NULL,
  fkViagem INT NOT NULL,
  fkPonto INT NOT NULL,
  PRIMARY KEY (idFluxo, fkViagem),
  FOREIGN KEY (fkViagem) REFERENCES Viagem(idViagem),
  FOREIGN KEY (fkPonto) REFERENCES Ponto(idPonto)
);

CREATE TABLE LinhaPonto(
  idLinha INT NOT NULL,
  idPonto INT NOT NULL,
  PRIMARY KEY (idLinha, idPonto),
  FOREIGN KEY (idLinha) REFERENCES Linha(idLinha),
  FOREIGN KEY (idPonto) REFERENCES Ponto(idPonto)
);