%Anpassungen der Customers-Tabelle

alter table customers add email varchar(50);
alter table customers add password varchar(50) NOT NULL;
commit;


%Setzen von Passw�rtern f�r Bestandskunden
update customers set password = 'test12345' where password = '';
commit;