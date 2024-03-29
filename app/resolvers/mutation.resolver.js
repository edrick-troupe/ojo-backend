import { GraphQLError } from 'graphql';

// Define mutation CRUD (POST, PATCH, DELETE)

export default {
  
  async addEvent(_, { input }, { dataSources }) {
    const event = await dataSources.ojoDB.eventDatamapper.create(input);
    return event;
  },

  async updateEvent(_, { id, input }, { dataSources }) {
    const event = await dataSources.ojoDB.eventDatamapper.update(id, input);
    return event;
  },

  async deleteEvent(_, { id }, { dataSources }) {
    const result = await dataSources.ojoDB.eventDatamapper.delete(id);
    return result;
  },

  async addSite(_, { input }, { dataSources }) {
    const site = await dataSources.ojoDB.siteDatamapper.create(input);
    return site;
  },

  async updateSite(_, { id, input }, { dataSources }) {
    const site = await dataSources.ojoDB.siteDatamapper.update(id, input);
    return site;
  },

  async deleteSite(_, { id }, { dataSources }) {
    const result = await dataSources.ojoDB.siteDatamapper.delete(id);
    return result;
  },

  async addGame(_, { input }, { dataSources }) {
    const game = await dataSources.ojoDB.gameDatamapper.create(input);
    return game;
  },

  async updateGame(_, { id, input }, { dataSources }) {
    const game = await dataSources.ojoDB.gameDatamapper.update(id, input);
    return game;
  },

  async deleteGame(_, { id }, { dataSources }) {
    const result = await dataSources.ojoDB.gameDatamapper.delete(id);
    return result;
  },

  async registerUser(_, { input }, { dataSources }) {
    const user = await dataSources.ojoDB.userDatamapper.register(input);
    return user;
  },

  async updateUser(_, { input }, { dataSources, newUser }) {
    
    if (!newUser) {
      throw new GraphQLError("Access denied: Please login before update", {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    const user = await dataSources.ojoDB.userDatamapper.update(newUser.id, input);
    return user;
  },

  async deleteUser(_, __, { dataSources, newUser }) {
    
    if (!newUser) {
      throw new GraphQLError("Access denied: Please login before delete ", {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    const result = await dataSources.ojoDB.userDatamapper.delete(newUser.id);
    return result;
  },
  
  async addFavorite (_,{ input }, { dataSources, newUser }) {
    console.log('+++Add++++', newUser.id, input )
    const favorite = await dataSources.ojoDB.favoriteDatamapper.create(newUser.id, input);
    return favorite;
  },

  async updateFavorite(_, { input }, { dataSources, newUser }) {
    console.log('+++Update++++', newUser.id, input.event_id )
    const favorite = await dataSources.ojoDB.favoriteDatamapper.update(newUser.id, input.event_id, input);
    return favorite;
  },

  async deleteFavorite(_,{ input }, { dataSources, newUser }) {
    console.log('+++Delete++++', newUser.id, input.event_id)
    const result = await dataSources.ojoDB.favoriteDatamapper.delete(newUser.id, input.event_id);
    return result;
  },
};

