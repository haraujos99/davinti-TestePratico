create database davint

create table if not exists contatos (
  id serial primary key,
  nome text,
  idade int
);

create table if not exists telefones (
  id serial primary key,
  id_contato int references contatos(id),
  numero int
 )