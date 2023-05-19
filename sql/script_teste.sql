USE buswayDb;
INSERT INTO Empresa VALUES (1, '12345678901234', 'ConWay', 'foto.jpg');
INSERT INTO Funcionario VALUES (1, '12345678901', 'Alexandra', 'alexandra@conway.com', '12345', '11940028922', 1, null, 'alexandra.jpg'),
							   (2, '12345678902', 'Gustavo', 'gustavo@conway.com', '12345', '11940028923', 1, 1, 'gustavo.jpg'),
							   (3, '12345678903', 'Mateus', 'mateus@conway.com', '12345', '11940028923', 1, 1, 'mateus.jpg'),
							   (4, '12345678904', 'Adriano', 'adriano@conway.com', '12345', '11940028923', 1, null, 'adriano.jpg'),
							   (5, '12345678905', 'Felipe', 'felipe@conway.com', '12345', '11940028923', 1, 1, 'felipe.jpg'),
							   (6, '12345678906', 'Danielle', 'danielle@conway.com', '12345', '11940028923', 1, 5, 'danielle.jpg');
                               
INSERT INTO Modelo VALUES (1, 'Padron', 8.5, 60, 1, 1);
INSERT INTO Veiculo VALUES (1, 'ABC123', 2002, 1, 1);

INSERT INTO Ponto VALUES (1, '01414000', 'Rua Haddock Lobo', 595, null, null);
INSERT INTO Linha VALUES (1, 'Vila Ida', 'Vila Volta', 'ABCD', '01', 1);
INSERT INTO LinhaPonto VALUES (1, 1);