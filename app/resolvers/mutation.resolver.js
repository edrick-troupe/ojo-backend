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
};