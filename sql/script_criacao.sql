CREATE DATABASE buswayDb;
USE buswayDb;

CREATE TABLE Empresa(
  idEmpr INT PRIMARY KEY AUTO_INCREMENT,
  cpnjEmpr CHAR(14) NOT NULL UNIQUE,
  nomeEmpr VARCHAR(45) NOT NULL,
  foto VARCHAR(500)
);

CREATE TABLE Linha(
  idLinha INT PRIMARY KEY AUTO_INCREMENT,
  nomeLinhaIda VARCHAR(45) NOT NULL,
  nomeLinhaVolta VARCHAR(45) NOT NULL,
  codLinha CHAR(4),
  tipoLinha CHAR(2),
  fkEmpr INT NOT NULL,
  FOREIGN KEY (fkEmpr) REFERENCES Empresa(idEmpr)
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
  FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpr)
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

CREATE TABLE Fluxo(
  idFluxo INT NOT NULL,
  entradas INT,
  saidas INT,
  dataHoraFluxo DATETIME NOT NULL,
  fkViagem INT NOT NULL,
  PRIMARY KEY (idFluxo, fkViagem),
  FOREIGN KEY (fkViagem) REFERENCES Viagem(idViagem)
);

CREATE TABLE Funcionario(
  idFunc INT NOT NULL AUTO_INCREMENT,
  cpfFunc CHAR(11) NOT NULL UNIQUE,
  nomeFunc VARCHAR(45) NOT NULL,
  emailFunc VARCHAR(45) NOT NULL UNIQUE,
  senhaFunc CHAR(10) NOT NULL,
  fkEmpr INT NOT NULL,
  fkRepresentante INT,
  foto VARCHAR(500),
  PRIMARY KEY (idFunc, fkEmpr),
  FOREIGN KEY (fkEmpr) REFERENCES Empresa(idEmpr),
  FOREIGN KEY (fkRepresentante) REFERENCES Funcionario(idFunc)
);

CREATE TABLE Ponto(
  idPonto INT PRIMARY KEY,
  cep CHAR(8) NOT NULL,
  logradouro VARCHAR(45) NOT NULL,
  numNaRua INT NOT NULL,
  grausY CHAR(7),
  grausX CHAR(7)
);

CREATE TABLE LinhaPonto(
  idLinha INT NOT NULL,
  idPonto INT NOT NULL,
  PRIMARY KEY (idLinha, idPonto),
  FOREIGN KEY (idLinha) REFERENCES Linha(idLinha),
  FOREIGN KEY (idPonto) REFERENCES Ponto(idPonto)
);

