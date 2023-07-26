export default {

  async events({ id: siteId }, _, { dataSources }) {
    const events = await dataSources
    .ojoDB
    .eventDatamapper
    .batchBySite
    .load(siteId);
    return events;
  },

  async weather({ latitude, longitude }, _, { dataSources }) {
    const weather = await dataSources
    .weather
    .getForecast(latitude, longitude);
    return weather;
  },
};



