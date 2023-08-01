export default {

  async user_has_events({id: userId}, _, { dataSources }) {
    const user_has_events = dataSources
    .ojoDB
    .userHasEventDatamapper
    .findByUser(userId);
    return user_has_events;
  }

};

