-- Revert ojo:structure from pg

BEGIN;

-- XXX Add DDLs here.

DROP TABLE "event_has_user", "event","user", "game", "site";

DROP DOMAIN "day_format", "slot", "email", "slug";


COMMIT;
