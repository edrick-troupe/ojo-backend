export default {

  async events({ id: siteId }, _, { dataSources }) {
    const events = await dataSources
    .ojoDB
    .eventDatamapper
    .batchBySite
    .load(siteId);
    return events;
  },
};



