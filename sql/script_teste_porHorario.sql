-- Pegar as viagens de um horário
select 
date(horaInicio) as dataV,
dayname(horaInicio) as diaSemana,
avg(pctOtimizacao) as pctOtimizacao
from vwViagem where hour(horaInicio) = '12' and codLinha = '477P'
group by dataV, diaSemana
limit 7;

select * from vwViagem;
-- Viagens
INSERT INTO Viagem VALUES(null, '2023-05-30 12:00:00', '2023-05-30 14:52:43',1,2);
INSERT INTO Viagem VALUES(null, '2023-05-31 12:00:00', '2023-05-31 14:53:12',1,2);

-- Fluxo 30/05 12:00
INSERT INTO Fluxo VALUES(1,12,0,10,'2023-05-30 12:00:00',5,1); -- Saldo de pessoas 10
INSERT INTO Fluxo VALUES(2,8,0,18,'2023-05-30 12:07:00',5,2); -- Saldo de pessoas 18
INSERT INTO Fluxo VALUES(3,8,0,22,'2023-05-30 12:14:00',5,3); -- Saldo de pessoas 22
INSERT INTO Fluxo VALUES(4,9,1,23,'2023-05-30 12:16:00',5,4); -- Saldo de pessoas 23
INSERT INTO Fluxo VALUES(5,9,0,24,'2023-05-30 12:20:00',5,5); -- Saldo de pessoas 24
INSERT INTO Fluxo VALUES(6,9,0,27,'2023-05-30 12:26:00',5,6); -- Saldo de pessoas 27
INSERT INTO Fluxo VALUES(7,9,0,40,'2023-05-30 12:31:00',5,7); -- Saldo de pessoas 40
INSERT INTO Fluxo VALUES(8,6,2,43,'2023-05-30 12:36:00',5,8); -- Saldo de pessoas 43
INSERT INTO Fluxo VALUES(9,1,0,46,'2023-05-30 12:45:00',5,9); -- Saldo de pessoas 46
INSERT INTO Fluxo VALUES(10,3,1,52,'2023-05-30 12:52:00',5,10); -- Saldo de pessoas 52
INSERT INTO Fluxo VALUES(11,6,4,54,'2023-05-30 12:59:00',5,11); -- Saldo de pessoas 54
INSERT INTO Fluxo VALUES(12,4,0,59,'2023-05-30 13:03:00',5,12); -- Saldo de pessoas 59
INSERT INTO Fluxo VALUES(13,5,0,63,'2023-05-30 13:08:00',5,13); -- Saldo de pessoas 63
INSERT INTO Fluxo VALUES(14,4,2,67,'2023-05-30 13:13:00',5,14); -- Saldo de pessoas 67
INSERT INTO Fluxo VALUES(15,10,6,71,'2023-05-30 13:19:00',5,15); -- Saldo de pessoas 71
INSERT INTO Fluxo VALUES(16,5,2,73,'2023-05-30 13:22:00',5,16); -- Saldo de pessoas 73 -------
INSERT INTO Fluxo VALUES(17,1,7,71,'2023-05-30 13:29:00',5,17); -- Saldo de pessoas 71
INSERT INTO Fluxo VALUES(18,0,2,65,'2023-05-30 13:32:00',5,18); -- Saldo de pessoas 65
INSERT INTO Fluxo VALUES(19,0,2,62,'2023-05-30 13:39:00',5,19); -- Saldo de pessoas 62
INSERT INTO Fluxo VALUES(20,1,9,57,'2023-05-30 13:45:00',5,20); -- Saldo de pessoas 57
INSERT INTO Fluxo VALUES(21,0,2,54,'2023-05-30 13:47:00',5,21); -- Saldo de pessoas 54
INSERT INTO Fluxo VALUES(22,1,1,50,'2023-05-30 13:52:00',5,22); -- Saldo de pessoas 50
INSERT INTO Fluxo VALUES(23,0,8,46,'2023-05-30 13:54:00',5,23); -- Saldo de pessoas 46
INSERT INTO Fluxo VALUES(24,1,7,43,'2023-05-30 13:58:00',5,24); -- Saldo de pessoas 43
INSERT INTO Fluxo VALUES(25,0,5,39,'2023-05-30 14:04:00',5,25); -- Saldo de pessoas 39
INSERT INTO Fluxo VALUES(26,2,16,34,'2023-05-30 14:08:00',5,26); -- Saldo de pessoas 34
INSERT INTO Fluxo VALUES(27,0,4,30,'2023-05-30 14:13:00',5,27); -- Saldo de pessoas 30
INSERT INTO Fluxo VALUES(28,0,9,25,'2023-05-30 14:16:00',5,28); -- Saldo de pessoas 25
INSERT INTO Fluxo VALUES(29,0,2,21,'2023-05-30 14:19:00',5,29); -- Saldo de pessoas 21
INSERT INTO Fluxo VALUES(30,1,2,18,'2023-05-30 14:23:00',5,30); -- Saldo de pessoas 18
INSERT INTO Fluxo VALUES(31,1,5,14,'2023-05-30 14:26:00',5,31); -- Saldo de pessoas 14
INSERT INTO Fluxo VALUES(32,2,5,10,'2023-05-30 14:29:00',5,32); -- Saldo de pessoas 10
INSERT INTO Fluxo VALUES(33,0,3,7,'2023-05-30 14:33:00',5,33); -- Saldo de pessoas 7
INSERT INTO Fluxo VALUES(34,0,5,3,'2023-05-30 14:36:00',5,34); -- Saldo de pessoas 3

	-- Fluxo 31/05 12:00
	INSERT INTO Fluxo VALUES(1,12,0,8,'2023-05-30 12:00:00',6,1); -- Saldo de pessoas 8
	INSERT INTO Fluxo VALUES(2,8,0,13,'2023-05-30 12:07:00',6,2); -- Saldo de pessoas 13
	INSERT INTO Fluxo VALUES(3,8,0,27,'2023-05-30 12:14:00',6,3); -- Saldo de pessoas 17
	INSERT INTO Fluxo VALUES(4,9,1,20,'2023-05-30 12:16:00',6,4); -- Saldo de pessoas 20
	INSERT INTO Fluxo VALUES(5,9,0,23,'2023-05-30 12:20:00',6,5); -- Saldo de pessoas 23
	INSERT INTO Fluxo VALUES(6,9,0,25,'2023-05-30 12:26:00',6,6); -- Saldo de pessoas 25
	INSERT INTO Fluxo VALUES(7,9,0,37,'2023-05-30 12:31:00',6,7); -- Saldo de pessoas 37
	INSERT INTO Fluxo VALUES(8,6,2,40,'2023-05-30 12:36:00',6,8); -- Saldo de pessoas 40
	INSERT INTO Fluxo VALUES(9,1,0,44,'2023-05-30 12:45:00',6,9); -- Saldo de pessoas 44
	INSERT INTO Fluxo VALUES(10,3,1,46,'2023-05-30 12:52:00',6,10); -- Saldo de pessoas 46
	INSERT INTO Fluxo VALUES(11,6,4,50,'2023-05-30 12:59:00',6,11); -- Saldo de pessoas 50
	INSERT INTO Fluxo VALUES(12,4,0,53,'2023-05-30 13:03:00',6,12); -- Saldo de pessoas 53
	INSERT INTO Fluxo VALUES(13,5,0,58,'2023-05-30 13:08:00',6,13); -- Saldo de pessoas 58
	INSERT INTO Fluxo VALUES(14,4,2,62,'2023-05-30 13:13:00',6,14); -- Saldo de pessoas 62
	INSERT INTO Fluxo VALUES(15,10,6,76,'2023-05-30 13:19:00',6,15); -- Saldo de pessoas 66
	INSERT INTO Fluxo VALUES(16,5,2,72,'2023-05-30 13:22:00',6,16); -- Saldo de pessoas 72
	INSERT INTO Fluxo VALUES(17,1,7,70,'2023-05-30 13:29:00',6,17); -- Saldo de pessoas 70
	INSERT INTO Fluxo VALUES(18,0,2,64,'2023-05-30 13:32:00',6,18); -- Saldo de pessoas 64
	INSERT INTO Fluxo VALUES(19,0,2,58,'2023-05-30 13:39:00',6,19); -- Saldo de pessoas 58
	INSERT INTO Fluxo VALUES(20,1,9,52,'2023-05-30 13:45:00',6,20); -- Saldo de pessoas 52
	INSERT INTO Fluxo VALUES(21,0,2,49,'2023-05-30 13:47:00',6,21); -- Saldo de pessoas 49
	INSERT INTO Fluxo VALUES(22,1,1,46,'2023-05-30 13:52:00',6,22); -- Saldo de pessoas 46
	INSERT INTO Fluxo VALUES(23,0,8,40,'2023-05-30 13:54:00',6,23); -- Saldo de pessoas 40
	INSERT INTO Fluxo VALUES(24,1,7,37,'2023-05-30 13:58:00',6,24); -- Saldo de pessoas 37
	INSERT INTO Fluxo VALUES(25,0,5,34,'2023-05-30 14:04:00',6,25); -- Saldo de pessoas 34
	INSERT INTO Fluxo VALUES(26,2,16,28,'2023-05-30 14:08:00',6,26); -- Saldo de pessoas 28
	INSERT INTO Fluxo VALUES(27,0,4,24,'2023-05-30 14:13:00',6,27); -- Saldo de pessoas 24
	INSERT INTO Fluxo VALUES(28,0,9,20,'2023-05-30 14:16:00',6,28); -- Saldo de pessoas 20
	INSERT INTO Fluxo VALUES(29,0,2,16,'2023-05-30 14:19:00',6,29); -- Saldo de pessoas 16
	INSERT INTO Fluxo VALUES(30,1,2,15,'2023-05-30 14:23:00',6,30); -- Saldo de pessoas 15
	INSERT INTO Fluxo VALUES(31,1,5,12,'2023-05-30 14:26:00',6,31); -- Saldo de pessoas 12
	INSERT INTO Fluxo VALUES(32,2,5,9,'2023-05-30 14:29:00',6,32); -- Saldo de pessoas 9
	INSERT INTO Fluxo VALUES(33,0,3,5,'2023-05-30 14:33:00',6,33); -- Saldo de pessoas 5
	INSERT INTO Fluxo VALUES(34,0,5,2,'2023-05-30 14:36:00',6,34); -- Saldo de pessoas 2