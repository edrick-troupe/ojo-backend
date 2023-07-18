/** Import of Apollo Server IAW tutorial "Get started":
 * https://www.apollographql.com/docs/apollo-server/getting-started;
 * typeDefs required by Apollo defines the structure of data using schemas;
 * resolvers required by Apollo;
 * Weather is a class instanciated from a RESTDataSource;
 * ojoDB is a class instanciated from BatchedSQLDataSource using Knex for Batch management;
 * authenticate is an export of the function that provides user info;
 * Debug for an enriched log that helps debugging;
 * Import of an helper for dotenv required for eslint type module;
 */

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './app/typeDefs.js';
import resolvers from './app/resolvers/index.resolver.js';
import Weather from './app/datasources/weather.datasource.js';
import ojoDB from './app/datasources/ojo.db.datasource.js';
import authenticate from './app/helpers/authenticate.js';
import debug from 'debug';
import './app/helpers/env.loader.js';

// Call of Knex as a query builder
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

// As suggested by Apollo tuto, use of a function like a middleware 
// to get a promised object (usually available in express)
const { url } = await startStandaloneServer(server, {

  context: async ({ req }) => {
    const { cache } = server;
    return {
      dataSources: {
        weather: new Weather({ cache }),
        ojoDB: new ojoDB({ knexConfig, cache }),
      },
      ip: req.ip,
      user: await authenticate.getUser(req),
    };
  },
  listen: { port: 4000 },
});

debugServer(`🚀  Server ready at: ${url}`);