
CREATE TYPE sex AS ENUM ('MALE', 'FEMALE');
CREATE TYPE status AS ENUM ('ACTIVE', 'REMOVED');
CREATE TYPE visit AS ENUM ('VISIT', 'FREEZING', 'SICK');

create table clients (
  id bigserial PRIMARY KEY,
  status status,
  created timestamp,
  updated timestamp,
  name varchar(255),
  surname varchar(255),
  patronymic varchar(255),
  contract bigserial,
  birthday date,
  sex sex,
  mobile1 varchar(255),
  mobile2 varchar(255),
  email varchar(255),
  address varchar(255),
  passport varchar(255),
  source bigint,
  parent_name varchar(255),
  parent_surname varchar(255),
  parent_patronymic varchar(255),
  parent_mobile1 varchar(255),
  parent_mobile2 varchar(255),
  notes varchar(255),
  active boolean
);

create table employees (
  id bigserial PRIMARY KEY,
  status status,
  created timestamp,
  updated timestamp,
  name varchar(255),
  phone varchar(255),
  email varchar(255)
);

create table organizations (
  id bigserial PRIMARY KEY,
  created timestamp,
  updated timestamp,
  name varchar(255),
  phone varchar(255),
  email varchar(255)
);


create table groups (
  id bigserial PRIMARY KEY,
  status status,
  created timestamp,
  updated timestamp,
  name varchar(255)
);

create table client_to_group (
  client_id bigint REFERENCES clients(id),
  group_id bigint REFERENCES groups(id)
);

create table visits (
  client_id bigint REFERENCES clients(id),
  group_id bigint REFERENCES groups(id),
  year int,
  month int,
  day int,
  visit visit,
  PRIMARY KEY (client_id, group_id, year, month, day, visit)
)

create or replace view v_visits as (
select clients.id, clients.name, visits.*, client_to_group.group_id as client_to_group_group_id from clients
left join visits on (clients.id = visits.client_id)
left join client_to_group on (clients.id = client_to_group.client_id)
)


-- billing
--
-- CREATE TYPE paymentFromType as ENUM ('clinet', 'employee', 'organization');
-- CREATE TYPE paymentForType as ENUM ('product', 'otherpayment');
--
-- create table payments (
--   id bigserial PRIMARY KEY,
--   status status,
--   created timestamp,
--   updated timestamp,
--   direction boolean,
--   amount money,
--   paymentFromType paymentFromType,
--   paymentFrom bigint,
--   paymentForType paymentForType,
--   paymentFor bigint
-- );
