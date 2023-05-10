USE buswayDb;

CREATE TABLE TipoLinha(
  idTipoLinha INT PRIMARY KEY AUTO_INCREMENT,
  nomeTipoLinha VARCHAR(45) NOT NULL
);
INSERT INTO TipoLinha VALUES (1, 'DESESPERO');

CREATE TABLE Empresa(
  idEmpr INT PRIMARY KEY AUTO_INCREMENT,
  cpnjEmpr CHAR(16) NOT NULL UNIQUE,
  nomeEmpr VARCHAR(45) NOT NULL
);

INSERT INTO Empresa VALUES (1, '123456790123456', 'Cadeiras YARA');

CREATE TABLE Linha(
  idLinha INT PRIMARY KEY AUTO_INCREMENT,
  nomeLinhaIda VARCHAR(45) NOT NULL,
  nomeLinhaVolta VARCHAR(45) NOT NULL,
  fkTipoLinha INT NOT NULL,
  fkEmpr INT NOT NULL,
  FOREIGN KEY (fkTipoLinha) REFERENCES TipoLinha(idTipoLinha),
  FOREIGN KEY (fkEmpr) REFERENCES Empresa(idEmpr)
);

INSERT INTO Linha VALUES (1, 'Desespero', 'Arrependimento', 1, 1);

CREATE TABLE Modelo(
  idModelo INT PRIMARY KEY AUTO_INCREMENT,
  nomeModelo VARCHAR(45) NOT NULL,
  kmsPorLitro DECIMAL(5,2) NOT NULL,
  lotacao INT NOT NULL,
  portasEntrada INT NOT NULL,
  portasSaida INT NOT NULL
);

INSERT INTO Modelo VALUES (1, 'Padron', 8.5, 60, 1, 1);

CREATE TABLE Veiculo(
  idVeiculo INT PRIMARY KEY AUTO_INCREMENT,
  codVeiculo CHAR(6) NOT NULL UNIQUE,
  anoAquisicao INT NOT NULL,
  fkModelo INT NOT NULL,
  FOREIGN KEY (fkModelo) REFERENCES Modelo(idModelo)
);

INSERT INTO Veiculo VALUES (1, '123456', 2013, 1);

CREATE TABLE Viagem(
  idViagem INT PRIMARY KEY AUTO_INCREMENT,
  horaSaida VARCHAR(45) NOT NULL,
  horaPrevChegada VARCHAR(45) NOT NULL,
  horaChegada VARCHAR(45),
  fkLinha INT NOT NULL,
  fkVeiculo INT NOT NULL,
  FOREIGN KEY (fkLinha) REFERENCES Linha(idLinha),
  FOREIGN KEY (fkVeiculo) REFERENCES Veiculo(idVeiculo)
);

CREATE TABLE Fluxo(
  idFluxo INT NOT NULL,
  passageirosFluxo INT,
  dataHoraFluxo VARCHAR(45) NOT NULL,
  fkViagem INT NOT NULL,
  PRIMARY KEY (idFluxo, fkViagem),
  FOREIGN KEY (fkViagem) REFERENCES Viagem(idViagem)
);

CREATE TABLE Usuario(
  idUsua INT NOT NULL AUTO_INCREMENT,
  cpfUsua CHAR(11) NOT NULL UNIQUE,
  nomeUsua VARCHAR(45) NOT NULL,
  emailUsua VARCHAR(45) NOT NULL UNIQUE,
  senhaUsua CHAR(10) NOT NULL,
  fkEmpr INT NOT NULL,
  PRIMARY KEY (idUsua, fkEmpr),
  FOREIGN KEY (fkEmpr) REFERENCES Empresa(idEmpr)
);

CREATE TABLE Ponto(
  idPonto INT PRIMARY KEY,
  cep CHAR(8) NOT NULL,
  numNaRua INT NOT NULL,
  grausY CHAR(7),
  grausX CHAR(7)
);

CREATE TABLE linhaPonto(
  idLinha INT NOT NULL,
  idPonto INT NOT NULL,
  PRIMARY KEY (idLinha, idPonto),
  FOREIGN KEY (idLinha) REFERENCES Linha(idLinha),
  FOREIGN KEY (idPonto) REFERENCES Ponto(idPonto)
);

INSERT INTO Viagem VALUES (1, now(), '2023-05-09 13:22:00', null, 1, 1); 