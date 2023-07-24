export default {

  async weather({ latitude, longitude }, _, { dataSources }) {
    const weather = await dataSources
    .weather
    .getForecast(latitude, longitude);
    return weather;
  },
};