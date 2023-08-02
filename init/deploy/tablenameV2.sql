-- Deploy ojo:tablename to pg

BEGIN;

-- XXX Add DDLs here.

ALTER TABLE "user_has_event"
    RENAME TO "favorite";


COMMIT;
