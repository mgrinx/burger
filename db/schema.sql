drop database if exists burger_db;
create database burger_db;
use burger_db;

create table burgers (
    id int not null auto_increment,
    burger_name varchar(30) not null,
    devoured boolean default false,
    primary key (id)
);