-- Deploy ojo:comment to pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "event_has_user"
  ADD COLUMN "comment" TEXT;

COMMIT;
