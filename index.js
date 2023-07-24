/** 
 * Import of Apollo Server IAW tutorial "Get started":
 * https://www.apollographql.com/docs/apollo-server/getting-started;
 * TypeDefs required by Apollo defines the structure of data using 
 * schemas in GraphQL and resolvers in JS.
 * 
 * ojoDB is a class instanciated from BatchedSQLDataSource using Knex for Batch management.
 * 
 * Knex link:https://knexjs.org/guide/ is the query builder that manages batch & cache
 * 
 * Debug for an enriched log that helps debugging.
 * 
 * Import of an helper for dotenv required by eslint type module.
 * 
 * Authenticate will import a function that calls JWT
 * 
 * Weather calls an object RESTDataSource from @apollo/datasource-rest module,
 * that will call the api https://www.weatherapi.com/
 * 
 * 
*/

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './app/typeDefs.js';
import resolvers from './app/resolvers/index.resolver.js';
import ojoDB from './app/datasources/ojo.db.datasource.js';
import debug from 'debug';
import './app/helpers/env.loader.js';
import authenticate from './app/helpers/authenticate.js';
import Weather from './app/datasources/weather.datasource.js';

// For this Api we will use knex as a query builder,
// providing a batch/cache support.
const knexConfig = {
  client: 'pg',
  connection: {
    host: process.env.PGHOST ?? 'localhost',
    port: process.env.PGPORT ?? 5432,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE ?? 'ojo',
  },
};

// Use of debug for our sever
const debugServer = debug('server');

// Call of Apollo as a big middleware that will handle
// all the queries on HTTP route "/" (by default)
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// As suggested by Apollo tuto, we use a function like a middleware 
// to get a promised object (usually available in express)
const { url } = await startStandaloneServer(server, {

  context: async ({ req }) => {
    const { cache } = server;
    return {
      dataSources: {
        ojoDB: new ojoDB({ knexConfig, cache }),
        weather: new Weather({ cache }),
      },
      ip: req.ip,
      user: await authenticate.getUser(req),
    };
  },
  listen: { port: 3000 },
});

debugServer(`🚀  Server ready at: ${url}`);