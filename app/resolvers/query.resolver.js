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
    return 'event';
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
}