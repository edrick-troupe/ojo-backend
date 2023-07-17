-- Revert ojo:structure from pg

BEGIN;

-- XXX Add DDLs here.

DROP TABLE "user_has_event", "event","user", "game", "site";

DROP DOMAIN "slot", "email", "slug";


COMMIT;
