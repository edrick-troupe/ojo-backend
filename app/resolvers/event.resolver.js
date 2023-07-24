export default {

  async game(parent, _, { dataSources }) {
    const { game_id: gameId } = parent;
    const game = await dataSources
      .ojoDB
      .gameDatamapper
      .batchByPk
      .load(gameId);
    return game;
  },

  async site(parent, _, { dataSources }) {
    const { site_id: siteId } = parent;
    const site = await dataSources
      .ojoDB
      .siteDatamapper
      .batchByPk
      .load(siteId);
    return site;
  },

  async users({ id: eventId }, _, { dataSources }) {
    const users = await dataSources
      .ojoDB
      .userDatamapper
      .findByevent(eventId);
    return users;
  },
};


