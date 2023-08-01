-- Deploy ojo:favorite to pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "event_has_user"
  ADD COLUMN "favorite" BOOLEAN NOT NULL DEFAULT TRUE;

COMMIT;
