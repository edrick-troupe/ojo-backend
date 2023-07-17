-- Verify ojo:structure on pg

BEGIN;

-- XXX Add verifications here.

SELECT id FROM "site" WHERE false;

SELECT id FROM "game" WHERE false;

SELECT id FROM "event" WHERE false;

SELECT id FROM "user" WHERE false;



ROLLBACK;
