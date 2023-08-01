export default {

  async event(parent, _, { dataSources }) {
    const { event_id: eventId } = parent;
    const event = await dataSources
      .ojoDB
      .eventDatamapper
      .batchByPk
      .load(eventId);
    return event;
  },
}
