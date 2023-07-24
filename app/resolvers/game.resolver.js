export default {
  async events({ id: gameId }, _, { dataSources }) {
    const events = await dataSources
      .ojoDB
      .eventDatamapper
      .batchByGame
      .load(gameId);
    return events;
  },
};

