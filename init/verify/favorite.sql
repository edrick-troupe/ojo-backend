-- Verify ojo:favorite on pg

BEGIN;

-- XXX Add verifications here.
SELECT "favorite" FROM "event_has_user" WHERE FALSE;

ROLLBACK;
