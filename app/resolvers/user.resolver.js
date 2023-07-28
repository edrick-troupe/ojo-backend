export default {

  async events({id: userId}, _, { dataSources }) {
    const events = dataSources
    .ojoDB
    .eventDatamapper
    .findByUser(userId);
    return events;
  },

};

