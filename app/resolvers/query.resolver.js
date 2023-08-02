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
  async login(_, { email, password }, { dataSources }) {
    
    const [user] = await dataSources.ojoDB.userDatamapper.findAll({ where: { email } });
    if (!user) {
      throw new GraphQLError('Mail(tobedeleted) Authentication failed.', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    // If email is validated by DB, we verify the password using bcrypt
    const passwordIsValid = await bcrypt.compare(password, user.password);
    
    if (!passwordIsValid) {
      throw new GraphQLError('Password(tobedeleted) Authentication failed.', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    // Once the email and password are validated we can create the token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      process.env.JSON_WEB_TOKEN_PRIVATE_KEY,
      { expiresIn: process.env.JSON_WEB_TOKEN_EXPIRES_DURATION },
    );
    
    return {
      token,
    };
  },

  // User : potentialy already loogedin with JWT
  async user(_, __, { dataSources, newUser }) {
    if (!newUser) {
      throw new GraphQLError("Access denied: Please register before login", {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    const user = await dataSources.ojoDB.userDatamapper.findByPk(newUser.id);
    return user;
  },
  
  
  async favorites (_, __, { dataSources, newUser }) {
    if (!newUser) {
      throw new GraphQLError("Access denied: Please register before login", {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    const favorites = await dataSources.ojoDB.favoriteDatamapper.findAll({ where: { user_id: newUser.id} });
    return favorites;
  }
  
}






