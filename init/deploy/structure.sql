-- Deploy ojo:structure to pg

BEGIN;

-- XXX Add DDLs here.

CREATE DOMAIN "email" AS text
CHECK(
    value ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
);

CREATE DOMAIN "slot" AS text
CHECK(
    value ~ '\b([01][0-9]|2[0-3]):[0-5][0-9]-([01][0-9]|2[0-3]):[0-5][0-9]\b'
);

CREATE TABLE "site" 
(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"	TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "picture" TEXT,
    "description" TEXT,
    "latitude" FLOAT NOT NULL,
    "longitude" FLOAT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "game" 
(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label"	TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT FALSE,
    "paralympic" BOOLEAN NOT NULL DEFAULT FALSE,
    "tag" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "event" 
(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "day" DATE NOT NULL,
    "description" TEXT,
    "slot" slot NOT NULL,
    "game_id" INT NOT NULL REFERENCES "game" ("id"),
    "site_id" INT NOT NULL REFERENCES "site" ("id"), 
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user"
(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "mail" email NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "isadmin" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_has_event" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INT NOT NULL REFERENCES "user" ("id"),
    "event_id" INT NOT NULL REFERENCES "event" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);


COMMIT;
