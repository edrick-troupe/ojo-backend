-- Deploy ojo:structure to pg

BEGIN;

-- XXX Add DDLs here.

CREATE DOMAIN slug AS TEXT
  CHECK(
    VALUE ~ '^[a-z]+(?:-[a-z]+)*$'
);

CREATE DOMAIN "email" AS text
  CHECK(
    value ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
);

CREATE DOMAIN "slot" AS text
  CHECK(
    value ~ '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'
);

CREATE TABLE "site" 
(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"	TEXT NOT NULL,
    "slug" slug NOT NULL,
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
    "slug" slug NOT NULL,
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
    "email" email NOT NULL,
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
