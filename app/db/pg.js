/** For this app we choose to use a pool of clients 
 * instead of one client and we let our module
 * manage the connexions of several clients if needed
 * 
 * As for client object, Pool also has a query method,
 * so there is no impact on the rest of the code
 * 
 * Also, the connexions informations will be read in env file,
 * directly as for Client
 */

import debug from 'debug';
import pg from 'pg';

const debugSQL = debug('app:sql');

const pool = new pg.Pool();

let queryCount = 0;

export default {

  // export of the client pool as original in caution,
  originalClient: pool,

  // Display of the queries by transforming
  // the several variables in settings into an array,
  // using the operaor "rest" (...)
   async query(...params) {
    debugSQL(...params);
    queryCount += 1;
    debugSQL(`Req n°${queryCount}`);

    // Here we reverse and the array will be transform in a list of 
    // variables / settings so the query method of the client
    // will be called the same way as the module
     return this.originalClient.query(...params);
  },
};