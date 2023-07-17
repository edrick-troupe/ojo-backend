-- Seeding sample OJO

BEGIN;

INSERT INTO "site" ("name", "slug", "city", "picture", "description", "latitude", "latitude")

VALUES 
    ('Eiffel Tower Stadium', 'eiffel-tower-stadium', 'Paris', 'https://kids.nationalgeographic.com/history/article/eiffel-tower', 'lorem ipsum matea', 48.86, 2.33),
    ('Champs-de-Mars Arena', 'champs-de-mars-arena', 'Paris', 'https://kids.nationalgeographic.com/history/article/eiffel-tower', 'lorem ipsum matea', 48.86, 2.33),

INSERT INTO "game" ("label", "slug", "picture", "logo", "description", "favorite", "paralympic", "tag") 

VALUES
    ('volleyball de plage', 'volleyball-de-plage', 'https://suaps.univ-grenoble-alpes.fr/medias/photo/activite-athletisme-03_1657198355110-jpg', 'https://fr.wikipedia.org/wiki/Drapeau_olympique', 'Lorem ipsum', false, false, "aquatique"),
    ('judo', 'judo', 'https://suaps.univ-grenoble-alpes.fr/medias/photo/activite-athletisme-03_1657198355110-jpg', 'https://fr.wikipedia.org/wiki/Drapeau_olympique', 'Lorem ipsum', false, false, "aquatique"),
    ('lutte', 'lutte', 'https://suaps.univ-grenoble-alpes.fr/medias/photo/activite-athletisme-03_1657198355110-jpg', 'https://fr.wikipedia.org/wiki/Drapeau_olympique', 'Lorem ipsum', false, false, "aquatique"),
   
INSERT INTO "event" ("day", "description", "slot", "game_id", "site_id")

VALUES 
    ('27/07/24', 'lorem ipsum ipsum', '14:00-16:00', 1, 1),
    ('27/07/24', 'lorem ipsum ipsum', '18:00-20:00', 1, 1),
    ('27/07/24', 'lorem ipsum ipsum', '22:00-00:00', 1, 1),
    ('28/07/24', 'lorem ipsum ipsum', '09:00-13:00', 1, 1),
    ('28/07/24', 'lorem ipsum ipsum', '15:00-18:00', 1, 1),
    ('28/07/24', 'lorem ipsum ipsum', '20:00-23:00', 1, 1),
    ('29/07/24', 'lorem ipsum ipsum', '09:00-13:00', 1, 1),
    ('29/07/24', 'lorem ipsum ipsum', '15:00-18:00', 1, 1),
    ('29/07/24', 'lorem ipsum ipsum', '20:00-23:00', 1, 1),
    ('30/07/24', 'lorem ipsum ipsum', '09:00-13:00', 1, 1),
    ('30/07/24', 'lorem ipsum ipsum', '15:00-18:00', 1, 1),
    ('30/07/24', 'lorem ipsum ipsum', '20:00-23:00', 1, 1),
    ('31/07/24', 'lorem ipsum ipsum', '14:00-16:00', 1, 1),
    ('31/07/24', 'lorem ipsum ipsum', '18:00-20:00', 1, 1),
    ('31/07/24', 'lorem ipsum ipsum', '22:00-00:00', 1, 1),
    ('01/07/24', 'lorem ipsum ipsum', '09:00-13:00', 1, 1),
    ('01/07/24', 'lorem ipsum ipsum', '15:00-18:00', 1, 1),
    ('01/07/24', 'lorem ipsum ipsum', '20:00-23:00', 1, 1),
    ('02/07/24', 'lorem ipsum ipsum', '09:00-13:00', 1, 1),
    ('02/07/24', 'lorem ipsum ipsum', '15:00-18:00', 1, 1),
    ('02/07/24', 'lorem ipsum ipsum', '20:00-23:00', 1, 1),
    ('03/07/24', 'lorem ipsum ipsum', '09:00-13:00', 1, 1),
    ('03/07/24', 'lorem ipsum ipsum', '15:00-18:00', 1, 1),
    ('03/07/24', 'lorem ipsum ipsum', '20:00-23:00', 1, 1),
    ('27/07/24', 'lorem ipsum ipsum', '14:00-16:00', 2, 2),
    ('27/07/24', 'lorem ipsum ipsum', '18:00-20:00', 2, 2),
    ('27/07/24', 'lorem ipsum ipsum', '22:00-00:00', 2, 2),
    ('28/07/24', 'lorem ipsum ipsum', '09:00-13:00', 2, 2),
    ('28/07/24', 'lorem ipsum ipsum', '15:00-18:00', 2, 2),
    ('28/07/24', 'lorem ipsum ipsum', '20:00-23:00', 2, 2),
    ('29/07/24', 'lorem ipsum ipsum', '09:00-13:00', 2, 2),
    ('29/07/24', 'lorem ipsum ipsum', '15:00-18:00', 2, 2),
    ('29/07/24', 'lorem ipsum ipsum', '20:00-23:00', 2, 2),
    ('30/07/24', 'lorem ipsum ipsum', '09:00-13:00', 2, 2),
    ('30/07/24', 'lorem ipsum ipsum', '15:00-18:00', 2, 2),
    ('30/07/24', 'lorem ipsum ipsum', '20:00-23:00', 3, 2),
    ('31/07/24', 'lorem ipsum ipsum', '14:00-16:00', 3, 2),
    ('31/07/24', 'lorem ipsum ipsum', '18:00-20:00', 3, 2),
    ('31/07/24', 'lorem ipsum ipsum', '22:00-00:00', 3, 2),
    ('01/07/24', 'lorem ipsum ipsum', '09:00-13:00', 3, 2),
    ('01/07/24', 'lorem ipsum ipsum', '15:00-18:00', 3, 2),
    ('01/07/24', 'lorem ipsum ipsum', '20:00-23:00', 3, 2),
    ('02/07/24', 'lorem ipsum ipsum', '09:00-13:00', 3, 2),
    ('02/07/24', 'lorem ipsum ipsum', '15:00-18:00', 3, 2),
    ('02/07/24', 'lorem ipsum ipsum', '20:00-23:00', 3, 2),
    ('03/07/24', 'lorem ipsum ipsum', '09:00-13:00', 3, 2),
    ('03/07/24', 'lorem ipsum ipsum', '15:00-18:00', 3, 2),
    ('03/07/24', 'lorem ipsum ipsum', '20:00-23:00', 3, 2),








COMMIT;