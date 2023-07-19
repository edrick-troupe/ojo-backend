/**
 * Here we use BatchedSQLDataSource that combines the power of Knex with Apollo DataSources
 * along with the benefit of having batching functionality from the DataLoader package.
 * 
 * Cf link:https://socket.dev/npm/package/@nic-jennings/batched-sql-datasource
 */

import { BatchedSQLDataSource } from '@nic-jennings/sql-datasource';
import Event from '../datamappers/event.datamapper.js';

export default class RestoDB extends BatchedSQLDataSource {

  eventDatamapper;

  /**
   * @typedef {object} Config
   * @property {object} knexConfig
   * @property {object} cache
   */
  /**
   * @param {Config} config
   */
  
  constructor(config) {
  
    super(config);
    // Nous ce qui nous intéresse c'est l'objet généré par le module qui va nous permettre de faire
    // nos requêtes SQL avec le query Builder, nous permmettre de mettre en cache, et nous permettre
    // une récupération par batch.

    // Cet objet on le transemt à chaque datamapper
    this.eventDatamapper = new Event(this.db);

    // Afin d'activer les récupération par batch après la définition de chaque tableName, on est
    // obligé d'appeler une méthode init sur chaque datamapper.
    this.eventDatamapper.init();
  }
}
