export default {

  async favorites({id: userId}, _, { dataSources }) {
    const favorites = dataSources
    .ojoDB
    .favoriteDatamapper
    .findByUser(userId);
    return favorites;
  }
};

