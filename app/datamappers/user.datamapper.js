import CoreDatamapper from './coreDatamapper.js';

class User extends CoreDatamapper {
  tableName = 'user';

  async findByEvent(eventId) {
    const rows = await this.db.query
      .from(this.tableName)
      .join(
        'event_has_user',
        'event_has_user.user_id',
        'user.id',
      ).where({ event_id: eventId })
      .cache(process.env.SQL_CACHE_TTL);
    return rows;
  }
}

export default User;
