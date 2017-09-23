--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

create table ps__client (
    `partnerClientId`   varchar(255) primary key unique not null,
    `email`             varchar(255) unique not null,
    `clientPassword`    varchar(255) not null,

    `lastName`          varchar(255) not null,
    `firstName`         varchar(255) not null,
    `middleName`        varchar(255) not null,

    `SpamSubscribe`     numeric default  0 check (SpamSubscribe IN (0, 1))
);

create table ps__discount_code (
    `code`      varchar(255) primary key,
    `discount`  smallint default 0,
    `client`    varchar(255) default null,

    foreign key (`client`) references ps__client(`partnerClientId`)
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

drop table ps__discount_code;
drop table ps__client;