import CoreDatamapper from './coreDatamapper.js';

class Favorite extends CoreDatamapper {
  tableName = 'favorite';

    async findByUser(userId) {
      const rows = await this.db.query
        .from(this.tableName)
        .where({ user_id: userId })
        .cache(process.env.SQL_CACHE_TTL);
      return rows;
    }
    
    async create(user_id, inputData) {
      const rows = await this.db.query
        .into(this.tableName)
        .insert(inputData )
        .where({ user_id })
        .returning('*');
      return rows[0];
    }

    async update(user_id, event_id, inputData) {
      const rows = await this.db.query
        .from(this.tableName)
        .update(inputData)
        .where({ user_id, event_id })
        .returning('*');
      return rows[0];
    }

    async delete(user_id, event_id) {
      const rowCount = await this.db.query
      .from(this.tableName)
      .where({ user_id, event_id })
      .del()
      return !!rowCount;
    }
    
}

export default Favorite;

