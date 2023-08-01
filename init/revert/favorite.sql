-- Revert ojo:favorite from pg

BEGIN;

-- XXX Add DDLs here.

ALTER TABLE "event_has_user"
  DROP COLUMN "favorite"; 

COMMIT;
