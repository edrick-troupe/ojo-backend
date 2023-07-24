import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

/**
   *
   * @param {object} _ parent usually used in Query type
   * @param {object} args informations as argument in client query
   * @param {object} context datasource
   * @param {object} infos
   * @returns
   */

export default {

  app() {
    return 'OJO 2024';
  },

  async events(_, __, { dataSources }) {
    const events = await dataSources.ojoDB.eventDatamapper.findAll();
    return events;
  },

  async event(_, args, { dataSources }) {
    const { id: eventId } = args;
    const event = await dataSources.ojoDB.eventDatamapper.findByPk(eventId);
    return event;
  },

  async sites(_, __, { dataSources }) {
    const sites = await dataSources.ojoDB.siteDatamapper.findAll();
    return sites;
  },

  async site(_, args, { dataSources }) {
    const { id: siteId } = args;
    const site = await dataSources.ojoDB.siteDatamapper.findByPk(siteId);
    return site;
  },

  async games(_, __, { dataSources }) {
    const games = await dataSources.ojoDB.gameDatamapper.findAll();
    return games;
  },

  async game(_, args, { dataSources }) {
    const { id: gameId } = args;
    const game = await dataSources.ojoDB.gameDatamapper.findByPk(gameId);
    return game;
  },

  // For login function, verify if the user email already exists in DB
  async login(_, { email, password }, { dataSources, ip }) {
    
    const [user] = await dataSources.ojoDB.userDatamapper.findAll({ where: { email } });
    if (!user) {
      throw new GraphQLError('Authentication failed.', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    // If email is validated by DB, we verify the password using bcrypt
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new GraphQLError('Authentication failed.', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    // Once the email and password are validated we can create the token
    const expiresIn = parseInt(process.env.JSON_WEB_TOKEN_EXPIRES_IN_SECONDS, 10) ?? 300;
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        // We can add additional information like the user ip
        ip,
      },
      process.env.JSON_WEB_TOKEN_PRIVATE_KEY,
      { expiresIn },
    );

    const now = new Date();
    const time = now.getTime();

    return {
      token,
      expireAt: time + expiresIn,
    };
  },

  // Here we define the resolver of User ( maybe already authenticated by JWT )
  async user(_, __, { dataSources, user }) {
    if (!user) {
      throw new GraphQLError("Access denied", {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    const loggeddUser = await dataSources.ojoDB.userDatamapper.findByPk(user.id);
    return loggeddUser;
  },
}

