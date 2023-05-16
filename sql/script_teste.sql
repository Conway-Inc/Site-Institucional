USE buswayDb;
INSERT INTO Empresa VALUES (1, '12345678901234', 'ConWay', 'foto.png');
INSERT INTO Funcionario VALUES (1, '12345678901', 'Alexandra', 'alexandra@conway.com', '12345', '11940028922', 1, null, 'foto.png'),
							   (2, '12345678902', 'Gustavo', 'gustavo@conway.com', '12345', '11940028923', 1, 1, 'foto.png');

INSERT INTO Modelo VALUES (1, 'Padron', 8.5, 60, 1, 1);
INSERT INTO Veiculo VALUES (1, 'ABC123', 2002, 1, 1);

INSERT INTO Ponto VALUES (1, '01414-000', 'Rua Haddock Lobo', 595, null, null);
INSERT INTO Linha VALUES (1, 'Vila Ida', 'Vila Volta', 'ABCD', '01', 1);
INSERT INTO LinhaPonto VALUES (1, 1);