-- Verify ojo:comment on pg

BEGIN;

-- XXX Add verifications here.
SELECT "comment" FROM "event_has_user" WHERE FALSE;

ROLLBACK;
