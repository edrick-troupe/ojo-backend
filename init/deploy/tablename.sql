-- Deploy ojo:tablename to pg

BEGIN;

-- XXX Add DDLs here.

ALTER TABLE "event_has_user"
    RENAME TO "user_has_event";


COMMIT;
