import { faker } from '@faker-js/faker';
import debug from 'debug';
// eslint-disable-next-line no-unused-vars
import dotenv from '../app/helpers/env.loader.js';

import db from '../app/db/pg.js';

const debugSeeding = debug('seeding');

db.queryCount = 0;

faker.locale = 'fr';
const NB_USERS = 50;

function generateUsers(nbUsers) {
  const users = [];
  for (let iUser = 0; iUser < nbUsers; iUser += 1) {
    const user = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    users.push(user);
  }
  return users;
}

async function insertUsers(users) {
  await db.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE');
  const userValues = users.map((user) => `(
                 '${user.firstname}',
                 '${user.lastname}',
                 '${user.email}',
                 '${user.password}'
             )`);

  const queryStr = `
             INSERT INTO "user"
             (
                 "firstname",
                 "lastname",
                 "email",
                 "password"
             )
             VALUES
             (
                 '"Arnaud"',
                 '"Valentin"',
                 'arno@oclock.io',
                 '$2b$10$h4Dh2fRGAf4YdC.Cqg1yleq41QHmG61B76THHCp03SgMEizvZlscy'
             ),-- superpass
             ${userValues}
             RETURNING id
     `;
  const result = await db.query(queryStr);
  return result.rows;
}

(async () => {
  /**
      * Générations d'utilisateurs fake
      * Ajout de ces utilisateurs en BDD
      */
  const users = generateUsers(NB_USERS);
  const insertedUsers = await insertUsers(Users);
  debugSeeding(`${insertedUsers.length} users inserted`);
  const userIds = insertedUsers.map((user) => user.id);
});

