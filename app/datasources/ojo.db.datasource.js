/**
 * Here we use BatchedSQLDataSource that combines the power of Knex with Apollo DataSources
 * along with the benefit of having batching functionality from the DataLoader package.
 * 
 * batched-sql-datasource link:https://socket.dev/npm/package/@nic-jennings/batched-sql-datasource
 * Knex link:https://knexjs.org/guide/
 */

import { BatchedSQLDataSource } from '@nic-jennings/sql-datasource';
import Event from '../datamappers/event.datamapper.js';
import User from '../datamappers/user.datamapper.js';
import Game from '../datamappers/game.datamapper.js';
import Site from '../datamappers/site.datamapper.js';
import BookEvent from '../datamappers/book-event.datamapper.js';

/**
 * @typedef {object} Config
 * @property {object} knexConfig
 * @property {object} cache
 */
/**
 * @param {Config} config
 */

export default class ojoDB extends BatchedSQLDataSource {

  // Here we define the tablename
  eventDatamapper;
  userDatamapper;
  gameDatamapper;
  siteDatamapper;
  bookEventDatamapper;

  // We put the config object for the BatchedSQLDataSource module.
  constructor(config) {

    // We use the generated object from the module and it will allow us to make SQL queries
    // with Knex query builder, collect by batch and put store data in cache
    super(config);

    // Here we create a new objects as datamappers that will help us using batch and cache
    this.eventDatamapper = new Event(this.db);
    this.userDatamapper = new User(this.db);
    this.gameDatamapper = new Game(this.db);
    this.siteDatamapper = new Site(this.db);
    this.bookEventDatamapper = new BookEvent(this.db);

    // Hence, in order to activate the the collection by batch, we need to use an Init function
    this.eventDatamapper.init();
    this.userDatamapper.init();
    this.gameDatamapper.init();
    this.siteDatamapper.init();
    this.bookEventDatamapper.init();
  }
}


