USE buswayDb;
/*DADOS BASE*/
/*Inserindo modelos dos veículos*/
INSERT INTO Modelo VALUES(null, 'Microônibus', 20, 9, 1, 1); 
INSERT INTO Modelo VALUES(null, 'Miniônibus', 12, 34, 1, 1); 
INSERT INTO Modelo VALUES(null, 'Midiônibus', 9, 50, 1, 2); 
INSERT INTO Modelo VALUES(null, 'Básico', 10, 70, 1, 2); 
INSERT INTO Modelo VALUES(null, 'Padron', 11, 80, 2, 2); 
INSERT INTO Modelo VALUES(null, 'Articulado', 10, 120, 2, 4); 
INSERT INTO Modelo VALUES(null, 'Superarticulado', 10, 125, 2, 4); 
INSERT INTO Modelo VALUES(null, 'Biarticulado', 7, 180, 2, 4); 
/*Views*/
-- Ver funcionários e suas empresas
create view vwFuncsEmpresa as
select f.*, e.idEmpresa, e.cnpj, e.nome as nomeEmpresa from Empresa as e
						  join Funcionario as f on e.idEmpresa = f.fkEmpresa;
-- Exemplo SELECT
select * from vwFuncsEmpresa where idEmpresa = 1; -- Pegar funcs da empresa de ID 1

-- Ver veículos de uma empresa
create view vwVeiculosEmpresa as 
select v.idVeiculo, v.placaVeiculo, v.anoAquisicao, m.nomeModelo, m.kilowattPorTonelada, m.lotacao, m.portasEntrada, m.portasSaida, e.idEmpresa,
e.cnpj, e.nome
	   from Veiculo as v
       join Modelo as m on v.fkModelo = m.idModelo
       join Empresa as e on v.fkEmpresa = e.idEmpresa;
-- Exemplo de SELECT:
select * from vwVeiculosEmpresa where idEmpresa = 1; -- Pegar veículos da empresa de ID 1

-- Ver veículos de uma linha
create view vwVeiculosLinha as
select * from vwVeiculosEmpresa as ve
		 join Viagem as v on v.fkVeiculo = ve.idVeiculo
		 join Linha as l on l.idLinha = v.fkLinha;
-- Exemplo de SELECT:
select * from vwVeiculosLinha where idLinha = 1; -- Pegar veículos da linha de ID 1
select * from vwVeiculosLinha where idLinha = 1 and horaInicio like '%12______'; -- Pegar veículos da linha de ID 1 no horário das 12:00

-- Ver fluxo com informações dos pontos, linha, veículos e empresa relacionados
create or replace view vwFluxo as
select f.fkViagem, f.idFluxo, f.dataHoraFluxo, p.idPonto, p.logradouro, p.numNaRua, p.cep, f.entradas, f.saidas, f.saldoPassageiros,
case when (100 * f.saldoPassageiros)/m.lotacao >= 111 then -- Tirando a porcentagem do saldo de passageiros em cada ponto para dar a métrica
		'Superlotado'
	 when (100 * f.saldoPassageiros)/m.lotacao between 101 and 110 then
		'Cheio'
	 when (100 * f.saldoPassageiros)/m.lotacao between 81 and 100 then
		'Ideal'
	 when (100 * f.saldoPassageiros)/m.lotacao between 51 and 80 then
		'Bom'
	 when (100 * f.saldoPassageiros)/m.lotacao between 31 and 50 then
		'Insuficiente'
	 when (100 * f.saldoPassageiros)/m.lotacao between 0 and 30 then 
		'Vazio'
	end as metrica,
l.codLinha, l.nomeLinhaIda, l.nomeLinhaVolta,
v.placaVeiculo, m.lotacao, m.nomeModelo, e.nome
	   from Fluxo as f
       join Ponto as p on f.fkPonto = p.idPonto
       join Viagem as vi on vi.idViagem = f.fkViagem
       join Veiculo as v on vi.fkVeiculo = v.idVeiculo
       join Modelo as m on v.fkModelo = m.idModelo
       join Linha as l on vi.fkLinha = l.idLinha
       join Empresa as e on l.fkEmpresa = e.idEmpresa;

-- Ver fluxo por linha
select logradouro, round(avg(saldoPassageiros),0) as mediaPassageiros from vwFluxo
	   where codLinha = '477P'
       group by logradouro;

-- Ver as informações de uma viagem, seus veículos, sua linha, sua empresa e seu nível de otimização
-- select sum(lotacao)*100/sum(saldoPassageiros) from vwFluxo as f
											  -- join linha as l on f.;
create or replace view vwViagem as
select vi.idViagem, vi.horaInicio, vi.horaFim,
lotacao,
round(sum(pctLotacao)*100/sum(lotacao),0) as pctOtimizacao, -- Pegando a soma dos saldos de passageiros de toda a viagem e tirando sua porcentagem do
l.codLinha, l.nomeLinhaIda, l.nomeLinhaVolta,				-- máximo possível de passageiros daquela viagem (soma da lotação do ônibus
e.cnpj, e.nome												-- em todos os pontos), resultando assim no percentual de otimização da viagem.
from Viagem as vi
	join
	(select fkViagem,
    round((100 * f.saldoPassageiros)/m.lotacao,0) as pctLotacao,  
    m.lotacao
		   from Fluxo as f
		   join Viagem as vi on vi.idViagem = f.fkViagem
		   join Veiculo as v on vi.fkVeiculo = v.idVeiculo
		   join Modelo as m on v.fkModelo = m.idModelo)
	as metrica on vi.idViagem = metrica.fkViagem
    join Linha as l on vi.fkLinha = l.idLinha
    join Empresa as e on l.fkEmpresa = e.idEmpresa
    group by vi.idViagem;

-- Ver as informações das linhas, suas empresas e seus níveis de otimização
create or replace view vwLinha as
select l.idLinha, l.codLinha, l.nomeLinhaIda, l.nomeLinhaVolta, l.tipoLinha, l.fkEmpresa,
sum(pctLotacao)*100 as x,
sum(lotacao)*100 as y,
round(sum(pctLotacao)*100/sum(lotacao),0) as pctOtimizacao,
e.cnpj, e.nome
from Linha as l
	join
	(select fkLinha,
    round((100 * f.saldoPassageiros)/m.lotacao,0) as pctLotacao,
    m.lotacao
		   from Fluxo as f
		   join Viagem as vi on vi.idViagem = f.fkViagem
		   join Veiculo as v on vi.fkVeiculo = v.idVeiculo
		   join Modelo as m on v.fkModelo = m.idModelo)
	as metrica on l.idLinha = metrica.fkLinha
    join Empresa as e on l.fkEmpresa = e.idEmpresa
    group by l.idLinha;

-- Ver as informações das KPIs da dashboard por horário
-- Horários mais/menos vazios com média de passageiros por ponto
select substring(horaInicio, 12, 5) as horario,
	   round(avg(saldoPassageiros),1) as mediaPass
       from vwviagem as vw
			  join fluxo as f on vw.idViagem = f.fkViagem
              where vw.codLinha = '477P'
              group by horario;

-- Pontos mais/menos movimentados
create or replace view vwKPIMovimentacaoHorario as
select
fkLinha, idViagem,
max(m.idPonto) as idPontoMaisMov,
max(logradouro) as logrMaisMov,
min(m.idPonto) as idPontoMenosMov,
min(logradouro) as logrMenosMov from
	(
	select p.idPonto, logradouro, (sum(f.entradas)-sum(f.saidas)) as movimentacao
		from Fluxo as f
		join Ponto as p on f.fkPonto = p.idPonto
        group by p.idPonto) as m
	join Fluxo as f on m.idPonto = f.fkPonto
    join Viagem as v on f.fkViagem = v.idViagem
    group by idViagem;
    
-- Número de pontos ruins por viagem no horário
create view vwKPIPontosRuinsHorario as
select 
	v.idViagem, 
	count(case when (100 * f.saldoPassageiros)/m.lotacao >= 120 OR (100 * f.saldoPassageiros)/m.lotacao <= 15 then 1 end) as pontoRuim
		from Fluxo as f
		join Ponto as p on f.fkPonto = p.idPonto
		join Viagem as v on f.fkViagem = v.idViagem
		join Veiculo as veic on v.fkVeiculo = veic.idVeiculo
		join Modelo as m on veic.fkModelo = m.idModelo
        where v.horaInicio like '%18______'
        group by v.idViagem;

-- Ver as informações das KPIs da dashboard por linha
-- Pontos mais/menos movimentados
select idPonto, movimentacao, logradouro FROM
	(
	select p.idPonto, logradouro, (sum(f.entradas)+sum(f.saidas)) as movimentacao
		from Fluxo as f
		join Ponto as p on f.fkPonto = p.idPonto
        group by p.idPonto) as m
	join Fluxo as f on m.idPonto = f.fkPonto
    join Viagem as v on f.fkViagem = v.idViagem
    join Linha as l on v.fkLinha = l.idLinha
    where codLinha = '477P'
	group by idPonto
	order by movimentacao desc;

-- View para o card de viagem do menu dashboard
select *,
(select count(fkVeiculo) from vwLinha as l
		 join Viagem as v on v.fkLinha = l.idLinha
         join Veiculo as veic on v.fkVeiculo = veic.idVeiculo) as numVeiculos
         from vwLinha as vwl
         join empresa as e on vwl.fkEmpresa = e.idEmpresa
         where e.idEmpresa = 1;

-- ------------- --
/*DADOS DINÂMICOS*/
-- ------------- --
/*Inserindo a empresa Conway e seus funcionários*/
INSERT INTO Empresa VALUES (1, '12345678901234', 'ConWay', 'foto.jpg');
INSERT INTO Funcionario VALUES (1, '12345678901', 'Alexandra', 'alexandra@conway.com', '12345', '11940028922', 1, null, 'alexandra.jpg'),
							   (2, '12345678902', 'Gustavo', 'gustavo@conway.com', '12345', '11940028923', 1, 1, 'gustavo.jpg'),
							   (3, '12345678903', 'Mateus', 'mateus@conway.com', '12345', '11940028923', 1, 1, 'mateus.jpg'),
							   (4, '12345678904', 'Adriano', 'adriano@conway.com', '12345', '11940028923', 1, null, 'adriano.jpg'),
							   (5, '12345678905', 'Felipe', 'felipe@conway.com', '12345', '11940028923', 1, 1, 'felipe.jpg'),
							   (6, '12345678906', 'Danielle', 'danielle@conway.com', '12345', '11940028923', 1, 5, 'danielle.jpg');
/*Veículos de Conway*/
INSERT INTO Veiculo VALUES(null,'FWC3354',2012,4,1); -- Básico antigo
INSERT INTO Veiculo VALUES(null,'DMB4413',2013,5,1); -- Padron antigo
INSERT INTO Veiculo VALUES(null,'GBQ0499',2016,5,1); -- Padron novo

INSERT INTO Veiculo VALUES(null,'EHJ1870',2016,5,1); -- Padron novo
INSERT INTO Veiculo VALUES(null,'DUS0900',2013,6,1); -- Articulado antigo
INSERT INTO Veiculo VALUES(null,'DKD0966',2023,6,1); -- Articulado novíssimo
INSERT INTO Veiculo VALUES(null,'EEW2542',2015,7,1); -- Superarticulado antigo

/*VIAGEM 477P Ipiranga - Rio Pequeno*/
INSERT INTO Linha VALUES (null, 'Rio Pequeno', 'Ipiranga', '477P', '10', 1);
/*Pontos*/
INSERT INTO Ponto VALUES (null, '04141040', 'Av. Inhaiba', 58, null, null);
INSERT INTO Ponto VALUES (null, '04292040', 'R. Eugênio Falk', 39, null, null);
INSERT INTO Ponto VALUES (null, '04280130', 'Av. Pres. Tancredo Neves', 656, null, null);
INSERT INTO Ponto VALUES (null, '04287010', 'Av. Pres. Tancredo Neves', 268, null, null);
INSERT INTO Ponto VALUES (null, '04208052', 'R. Silva Bueno', 2150, null, null);
INSERT INTO Ponto VALUES (null, '04208000', 'R. Silva Bueno', 1046, null, null);
INSERT INTO Ponto VALUES (null, '04208000', 'R. Silva Bueno', 327, null, null);
INSERT INTO Ponto VALUES (null, '04202010', 'R. Leais Paulistanos', 288, null, null);
INSERT INTO Ponto VALUES (null, '04202010', 'Pça. Do Monumento', null, null, null);
INSERT INTO Ponto VALUES (null, '04260020', 'Av. Ricardo Jafet', 365, null, null);
INSERT INTO Ponto VALUES (null, '04265070', 'Av. Ricardo Jafet', 745, null, null);
INSERT INTO Ponto VALUES (null, '04124190', 'Av. Ricardo Jafet', 2431, null, null);
INSERT INTO Ponto VALUES (null, '04123030', 'Av. Ricardo Jafet', 2123, null, null);
INSERT INTO Ponto VALUES (null, '04135040', 'Av. Prof. Abraão De Moraise', 503, null, null);
INSERT INTO Ponto VALUES (null, '04141040', 'Av. Bosque Da Saúde', 546, null, null);
INSERT INTO Ponto VALUES (null, '04140000', 'R. Gen. Serra Martins', 68, null, null);
INSERT INTO Ponto VALUES (null, '01414000', 'Av. Jabaquara', 1699, null, null);
INSERT INTO Ponto VALUES (null, '04070000', 'Av. Indianópolis', 3408, null, null);
INSERT INTO Ponto VALUES (null, '04062001', 'Av. Indianópolis', 1350, null, null);
INSERT INTO Ponto VALUES (null, '01414000', 'Al. Dos Nhambiquaras', 501, null, null);
INSERT INTO Ponto VALUES (null, '01414000', 'Al. Dos Nhambiquaras', 1951, null, null);
INSERT INTO Ponto VALUES (null, '01414000', 'R. Cde. De Porto Alegre', 1706, null, null);
INSERT INTO Ponto VALUES (null, '01414000', 'Av. Pe. Antônio José Dos Santos', 459, null, null);
INSERT INTO Ponto VALUES (null, '01414000', 'R. Guaraiuva', 1199, null, null);
INSERT INTO Ponto VALUES (null, '01414000', 'R. Nova Cidade', 290, null, null);
INSERT INTO Ponto VALUES (null, '01414000', 'Av. Brg. Faria Lima', 1352, null, null);
INSERT INTO Ponto VALUES (null, '01414000', 'Av. Brg. Faria Lima', 1352, null, null);
INSERT INTO Ponto VALUES (null, '01414000', 'Av. Brg. Faria Lima', 1352, null, null);
INSERT INTO Ponto VALUES (null, '01414000', 'Av. Brg. Faria Lima', 1352, null, null);
INSERT INTO Ponto VALUES (null, '01414000', 'R. Butantã', 305, null, null);
INSERT INTO Ponto VALUES (null, '01414000', 'R. MMDC', 252, null, null);
INSERT INTO Ponto VALUES (null, '01414000', 'Rod. Raposo Tavares', 15, null, null);
INSERT INTO Ponto VALUES (null, '01414000', 'Av. José Felipe Da Silva', 337, null, null);
INSERT INTO Ponto VALUES (null, '01414000', 'Av. Engenheiro Eiras Garcia', 595, null, null);

INSERT INTO LinhaPonto VALUES (1, 1);
INSERT INTO LinhaPonto VALUES (1, 2);
INSERT INTO LinhaPonto VALUES (1, 3);
INSERT INTO LinhaPonto VALUES (1, 4);
INSERT INTO LinhaPonto VALUES (1, 5);
INSERT INTO LinhaPonto VALUES (1, 6);
INSERT INTO LinhaPonto VALUES (1, 7);
INSERT INTO LinhaPonto VALUES (1, 8);
INSERT INTO LinhaPonto VALUES (1, 9);
INSERT INTO LinhaPonto VALUES (1, 10);
INSERT INTO LinhaPonto VALUES (1, 11);
INSERT INTO LinhaPonto VALUES (1, 12);
INSERT INTO LinhaPonto VALUES (1, 13);
INSERT INTO LinhaPonto VALUES (1, 14);
INSERT INTO LinhaPonto VALUES (1, 15);
INSERT INTO LinhaPonto VALUES (1, 16);
INSERT INTO LinhaPonto VALUES (1, 17);
INSERT INTO LinhaPonto VALUES (1, 18);
INSERT INTO LinhaPonto VALUES (1, 19);
INSERT INTO LinhaPonto VALUES (1, 20);
INSERT INTO LinhaPonto VALUES (1, 21);
INSERT INTO LinhaPonto VALUES (1, 22);
INSERT INTO LinhaPonto VALUES (1, 23);
INSERT INTO LinhaPonto VALUES (1, 24);
INSERT INTO LinhaPonto VALUES (1, 25);
INSERT INTO LinhaPonto VALUES (1, 26);
INSERT INTO LinhaPonto VALUES (1, 27);
INSERT INTO LinhaPonto VALUES (1, 28);
INSERT INTO LinhaPonto VALUES (1, 29);
INSERT INTO LinhaPonto VALUES (1, 30);
INSERT INTO LinhaPonto VALUES (1, 31);
INSERT INTO LinhaPonto VALUES (1, 32);
INSERT INTO LinhaPonto VALUES (1, 33);
INSERT INTO LinhaPonto VALUES (1, 34);

/*Viagens*/
INSERT INTO Viagem VALUES(null, '2023-05-29 09:00:00', '2023-05-29 11:36:00',1,1);
INSERT INTO Viagem VALUES(null, '2023-05-29 12:00:00', '2023-05-29 14:54:06',1,2);
INSERT INTO Viagem VALUES(null, '2023-05-29 18:00:00', '2023-05-29 20:57:32',1,3);
INSERT INTO Viagem VALUES(null, '2023-05-29 20:00:00', '2023-05-29 20:57:32',1,7);


/*Fluxo 29/05 09:00*/
INSERT INTO Fluxo VALUES(1,12,0,12,'2023-05-29 09:00:00',1,1); -- Saldo de pessoas 12
INSERT INTO Fluxo VALUES(2,6,0,18,'2023-05-29 09:07:00',1,2); -- Saldo de pessoas 18
INSERT INTO Fluxo VALUES(3,4,0,22,'2023-05-29 09:14:00',1,3); -- Saldo de pessoas 22
INSERT INTO Fluxo VALUES(4,5,1,26,'2023-05-29 09:16:00',1,4); -- Saldo de pessoas 26
INSERT INTO Fluxo VALUES(5,4,1,29,'2023-05-29 09:20:00',1,5); -- Saldo de pessoas 29
INSERT INTO Fluxo VALUES(6,4,0,33,'2023-05-29 09:26:00',1,6); -- Saldo de pessoas 33
INSERT INTO Fluxo VALUES(7,2,0,35,'2023-05-29 09:31:00',1,7); -- Saldo de pessoas 35
INSERT INTO Fluxo VALUES(8,6,2,39,'2023-05-29 09:36:00',1,8); -- Saldo de pessoas 39
INSERT INTO Fluxo VALUES(9,2,0,41,'2023-05-29 09:45:00',1,9); -- Saldo de pessoas 41
INSERT INTO Fluxo VALUES(10,3,0,44,'2023-05-29 09:52:00',1,10); -- Saldo de pessoas 44
INSERT INTO Fluxo VALUES(11,6,3,50,'2023-05-29 09:59:00',1,11); -- Saldo de pessoas 50
INSERT INTO Fluxo VALUES(12,6,0,56,'2023-05-29 10:03:00',1,12); -- Saldo de pessoas 56
INSERT INTO Fluxo VALUES(13,5,0,61,'2023-05-29 10:08:00',1,13); -- Saldo de pessoas 61
INSERT INTO Fluxo VALUES(14,4,1,64,'2023-05-29 10:13:00',1,14); -- Saldo de pessoas 64
INSERT INTO Fluxo VALUES(15,3,0,67,'2023-05-29 10:19:00',1,15); -- Saldo de pessoas 67
INSERT INTO Fluxo VALUES(16,4,0,71,'2023-05-29 10:22:00',1,16); -- Saldo de pessoas 71
INSERT INTO Fluxo VALUES(17,0,3,69,'2023-05-29 10:29:00',1,17); -- Saldo de pessoas 69
INSERT INTO Fluxo VALUES(18,0,4,65,'2023-05-29 10:32:00',1,18); -- Saldo de pessoas 65
INSERT INTO Fluxo VALUES(19,2,6,61,'2023-05-29 10:39:00',1,19); -- Saldo de pessoas 61
INSERT INTO Fluxo VALUES(20,0,4,57,'2023-05-29 10:45:00',1,20); -- Saldo de pessoas 57
INSERT INTO Fluxo VALUES(21,1,4,54,'2023-05-29 10:47:00',1,21); -- Saldo de pessoas 54
INSERT INTO Fluxo VALUES(22,3,5,52,'2023-05-29 10:52:00',1,22); -- Saldo de pessoas 52
INSERT INTO Fluxo VALUES(23,0,3,49,'2023-05-29 10:54:00',1,23); -- Saldo de pessoas 49
INSERT INTO Fluxo VALUES(24,0,5,44,'2023-05-29 10:58:00',1,24); -- Saldo de pessoas 44
INSERT INTO Fluxo VALUES(25,0,6,38,'2023-05-29 11:04:00',1,25); -- Saldo de pessoas 38
INSERT INTO Fluxo VALUES(26,1,4,35,'2023-05-29 11:08:00',1,26); -- Saldo de pessoas 35
INSERT INTO Fluxo VALUES(27,2,5,32,'2023-05-29 11:13:00',1,27); -- Saldo de pessoas 32
INSERT INTO Fluxo VALUES(28,0,5,27,'2023-05-29 11:16:00',1,28); -- Saldo de pessoas 27
INSERT INTO Fluxo VALUES(29,0,4,23,'2023-05-29 11:19:00',1,29); -- Saldo de pessoas 23
INSERT INTO Fluxo VALUES(30,1,3,21,'2023-05-29 11:23:00',1,30); -- Saldo de pessoas 21
INSERT INTO Fluxo VALUES(31,0,6,15,'2023-05-29 11:26:00',1,31); -- Saldo de pessoas 15
INSERT INTO Fluxo VALUES(32,0,3,12,'2023-05-29 11:29:00',1,32); -- Saldo de pessoas 12
INSERT INTO Fluxo VALUES(33,0,5,7,'2023-05-29 11:33:00',1,33); -- Saldo de pessoas 07
INSERT INTO Fluxo VALUES(34,0,3,4,'2023-05-29 11:36:00',1,34); -- Saldo de pessoas 04

/*Fluxo 29/05 12:00*/
INSERT INTO Fluxo VALUES(1,12,0,12,'2023-05-29 12:00:00',2,1); -- Saldo de pessoas 12
INSERT INTO Fluxo VALUES(2,8,0,20,'2023-05-29 12:07:00',2,2); -- Saldo de pessoas 20
INSERT INTO Fluxo VALUES(3,8,0,28,'2023-05-29 12:14:00',2,3); -- Saldo de pessoas 28
INSERT INTO Fluxo VALUES(4,9,1,36,'2023-05-29 12:16:00',2,4); -- Saldo de pessoas 36
INSERT INTO Fluxo VALUES(5,9,0,45,'2023-05-29 12:20:00',2,5); -- Saldo de pessoas 45
INSERT INTO Fluxo VALUES(6,9,0,54,'2023-05-29 12:26:00',2,6); -- Saldo de pessoas 54
INSERT INTO Fluxo VALUES(7,9,0,65,'2023-05-29 12:31:00',2,7); -- Saldo de pessoas 65
INSERT INTO Fluxo VALUES(8,6,2,69,'2023-05-29 12:36:00',2,8); -- Saldo de pessoas 69
INSERT INTO Fluxo VALUES(9,1,0,70,'2023-05-29 12:45:00',2,9); -- Saldo de pessoas 70
INSERT INTO Fluxo VALUES(10,3,1,72,'2023-05-29 12:52:00',2,10); -- Saldo de pessoas 72
INSERT INTO Fluxo VALUES(11,6,4,74,'2023-05-29 12:59:00',2,11); -- Saldo de pessoas 74
INSERT INTO Fluxo VALUES(12,4,0,78,'2023-05-29 13:03:00',2,12); -- Saldo de pessoas 78
INSERT INTO Fluxo VALUES(13,5,0,83,'2023-05-29 13:08:00',2,13); -- Saldo de pessoas 83
INSERT INTO Fluxo VALUES(14,4,2,85,'2023-05-29 13:13:00',2,14); -- Saldo de pessoas 85
INSERT INTO Fluxo VALUES(15,10,6,89,'2023-05-29 13:19:00',2,15); -- Saldo de pessoas 89
INSERT INTO Fluxo VALUES(16,5,2,92,'2023-05-29 13:22:00',2,16); -- Saldo de pessoas 92
INSERT INTO Fluxo VALUES(17,1,7,86,'2023-05-29 13:29:00',2,17); -- Saldo de pessoas 86
INSERT INTO Fluxo VALUES(18,0,2,84,'2023-05-29 13:32:00',2,18); -- Saldo de pessoas 84
INSERT INTO Fluxo VALUES(19,0,2,82,'2023-05-29 13:39:00',2,19); -- Saldo de pessoas 82
INSERT INTO Fluxo VALUES(20,1,9,74,'2023-05-29 13:45:00',2,20); -- Saldo de pessoas 74
INSERT INTO Fluxo VALUES(21,0,2,72,'2023-05-29 13:47:00',2,21); -- Saldo de pessoas 72
INSERT INTO Fluxo VALUES(22,1,1,72,'2023-05-29 13:52:00',2,22); -- Saldo de pessoas 72
INSERT INTO Fluxo VALUES(23,0,8,64,'2023-05-29 13:54:00',2,23); -- Saldo de pessoas 64
INSERT INTO Fluxo VALUES(24,1,7,58,'2023-05-29 13:58:00',2,24); -- Saldo de pessoas 58
INSERT INTO Fluxo VALUES(25,0,5,53,'2023-05-29 14:04:00',2,25); -- Saldo de pessoas 53
INSERT INTO Fluxo VALUES(26,2,16,39,'2023-05-29 14:08:00',2,26); -- Saldo de pessoas 39
INSERT INTO Fluxo VALUES(27,0,4,35,'2023-05-29 14:13:00',2,27); -- Saldo de pessoas 35
INSERT INTO Fluxo VALUES(28,0,9,26,'2023-05-29 14:16:00',2,28); -- Saldo de pessoas 26
INSERT INTO Fluxo VALUES(29,0,2,24,'2023-05-29 14:19:00',2,29); -- Saldo de pessoas 24
INSERT INTO Fluxo VALUES(30,1,2,23,'2023-05-29 14:23:00',2,30); -- Saldo de pessoas 23
INSERT INTO Fluxo VALUES(31,1,5,19,'2023-05-29 14:26:00',2,31); -- Saldo de pessoas 19
INSERT INTO Fluxo VALUES(32,2,5,16,'2023-05-29 14:29:00',2,32); -- Saldo de pessoas 16
INSERT INTO Fluxo VALUES(33,0,3,13,'2023-05-29 14:33:00',2,33); -- Saldo de pessoas 13
INSERT INTO Fluxo VALUES(34,0,5,8,'2023-05-29 14:36:00',2,34); -- Saldo de pessoas 8

/*Fluxo 29/05 18:00*/
INSERT INTO Fluxo VALUES(1,19,0,19,'2023-05-29 18:00:00',3,1); -- Saldo de pessoas 19
INSERT INTO Fluxo VALUES(2,7,0,26,'2023-05-29 18:07:00',3,2); -- Saldo de pessoas 26
INSERT INTO Fluxo VALUES(3,8,0,34,'2023-05-29 18:14:00',3,3); -- Saldo de pessoas 34
INSERT INTO Fluxo VALUES(4,5,0,39,'2023-05-29 18:16:00',3,4); -- Saldo de pessoas 39
INSERT INTO Fluxo VALUES(5,5,0,44,'2023-05-29 18:20:00',3,5); -- Saldo de pessoas 44
INSERT INTO Fluxo VALUES(6,8,2,50,'2023-05-29 18:26:00',3,6); -- Saldo de pessoas 50
INSERT INTO Fluxo VALUES(7,7,0,57,'2023-05-29 18:31:00',3,7); -- Saldo de pessoas 57
INSERT INTO Fluxo VALUES(8,8,0,65,'2023-05-29 18:36:00',3,8); -- Saldo de pessoas 65
INSERT INTO Fluxo VALUES(9,13,0,78,'2023-05-29 18:45:00',3,9); -- Saldo de pessoas 78
INSERT INTO Fluxo VALUES(10,9,3,84,'2023-05-29 18:52:00',3,10); -- Saldo de pessoas 84
INSERT INTO Fluxo VALUES(11,5,0,89,'2023-05-29 18:59:00',3,11); -- Saldo de pessoas 89
INSERT INTO Fluxo VALUES(12,5,3,91,'2023-05-29 19:03:00',3,12); -- Saldo de pessoas 91
INSERT INTO Fluxo VALUES(13,5,0,96,'2023-05-29 19:08:00',3,13); -- Saldo de pessoas 96
INSERT INTO Fluxo VALUES(14,10,3,103,'2023-05-29 19:13:00',3,14); -- Saldo de pessoas 103
INSERT INTO Fluxo VALUES(15,12,6,109,'2023-05-29 19:19:00',3,15); -- Saldo de pessoas 109
INSERT INTO Fluxo VALUES(16,2,7,104,'2023-05-29 19:22:00',3,16); -- Saldo de pessoas 104 -----
INSERT INTO Fluxo VALUES(17,0,1,103,'2023-05-29 19:29:00',3,17); -- Saldo de pessoas 103
INSERT INTO Fluxo VALUES(18,2,1,104,'2023-05-29 19:32:00',3,18); -- Saldo de pessoas 104
INSERT INTO Fluxo VALUES(19,0,6,98,'2023-05-29 19:39:00',3,19); -- Saldo de pessoas 98
INSERT INTO Fluxo VALUES(20,0,5,93,'2023-05-29 19:45:00',3,20); -- Saldo de pessoas 93
INSERT INTO Fluxo VALUES(21,3,10,86,'2023-05-29 19:47:00',3,21); -- Saldo de pessoas 86
INSERT INTO Fluxo VALUES(22,0,8,78,'2023-05-29 19:52:00',3,22); -- Saldo de pessoas 78
INSERT INTO Fluxo VALUES(23,0,7,71,'2023-05-29 19:54:00',3,23); -- Saldo de pessoas 71
INSERT INTO Fluxo VALUES(24,0,5,66,'2023-05-29 19:58:00',3,24); -- Saldo de pessoas 66
INSERT INTO Fluxo VALUES(25,0,7,59,'2023-05-29 20:04:00',3,25); -- Saldo de pessoas 59
INSERT INTO Fluxo VALUES(26,0,6,53,'2023-05-29 20:08:00',3,26); -- Saldo de pessoas 53
INSERT INTO Fluxo VALUES(27,3,15,41,'2023-05-29 20:13:00',3,27); -- Saldo de pessoas 41
INSERT INTO Fluxo VALUES(28,0,5,36,'2023-05-29 20:16:00',3,28); -- Saldo de pessoas 36
INSERT INTO Fluxo VALUES(29,0,5,31,'2023-05-29 20:19:00',3,29); -- Saldo de pessoas 31
INSERT INTO Fluxo VALUES(30,3,9,25,'2023-05-29 20:23:00',3,30); -- Saldo de pessoas 25
INSERT INTO Fluxo VALUES(31,2,8,19,'2023-05-29 20:26:00',3,31); -- Saldo de pessoas 19
INSERT INTO Fluxo VALUES(32,0,5,14,'2023-05-29 20:29:00',3,32); -- Saldo de pessoas 14
INSERT INTO Fluxo VALUES(33,0,6,8,'2023-05-29 20:33:00',3,33); -- Saldo de pessoas 8
INSERT INTO Fluxo VALUES(34,0,3,5,'2023-05-29 20:36:00',3,34); -- Saldo de pessoas 5