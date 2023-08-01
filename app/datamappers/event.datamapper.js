import CoreDatamapper from './coreDatamapper.js';

class Event extends CoreDatamapper {
  tableName = 'event';

  constructor(config) {
    super(config);

    this.batchBySite = this.db.query
      .from(this.tableName)
      .batch(async (query, siteIds) => {
        const rows = await query.whereIn('site_id', siteIds).cache(process.env.SQL_CACHE_TTL);
        const reorderedRows = siteIds.map(
          (siteId) => {
            const foundRow = rows?.filter((row) => row.site_id === siteId);
            return foundRow;
          },
        );
        return reorderedRows;
      });

    this.batchByGame = this.db.query
      .from(this.tableName)
      .batch(async (query, gameIds) => {
        const rows = await query.whereIn('game_id', gameIds).cache(process.env.SQL_CACHE_TTL);
        const reorderedRows = gameIds.map(
          (gameId) => {
            const foundRow = rows?.filter((row) => row.game_id === gameId);
            return foundRow;
          },
        );
        return reorderedRows;
      });
    }

  async findByGame(gameId) {
    const rows = await this.db.query
      .from(this.tableName)
      .where({ game_id: gameId })
      .cache(process.env.SQL_CACHE_TTL);
    return rows;
  }

  async findBySite(siteId) {
    const rows = await this.db.query
      .from(this.tableName)
      .where({ site_id: siteId })
      .cache(process.env.SQL_CACHE_TTL);
    return rows;
  }

  async findByUser(userId) {
    const rows = await this.db.query
      .from(this.tableName)
      .join(
        'user_has_event',
        'user_has_event.event_id',
        'event.id',
      ).where({ user_id: userId })
      .cache(process.env.SQL_CACHE_TTL);
    return rows;
  }
}


export default Event;

