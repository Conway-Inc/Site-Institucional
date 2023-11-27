SELECT fu.idFuncionario as idFuncionario,
           fu.nome as nomeFuncionario,
           fu.email,
           fu.senha,
           fu.cpf,
           fu.telefone as telefoneFuncionario,
           fu.dataNascimento,
           fu.foto,
           fu.fkGerente,
           em.idEmpresa,
           em.nome as nomeEmpresa,
           em.cnpj,
           rm.fkRamo as ramo FROM Funcionario AS fu 
           JOIN Empresa AS em ON em.idEmpresa = fu.fkEmpresa
           JOIN RamoEmpresa AS rm ON em.idEmpresa = rm.fkEmpresa
            WHERE email = 'ana.carolina@latam.com' AND senha = '12345';

    

SELECT * FROM Funcionario WHERE email = 'ana.carolina@latam.com' AND senha = '12345';

SELECT * FROM Funcionario;

SELECT * FROM Ramo;
SELECT * FROM RamoEmpresa;

