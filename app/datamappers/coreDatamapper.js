/**
 * For this CoreDatamapper we will use knex as a query builder
 * providing a batch/cache support.
 * 
 * Batch: DataLoaders help us by collecting all of our queries and combining them in a single one.
 * 
 * Cache: SQLDataSource leverages Apollo's caching strategy to save results,
 * between requests and makes that available via .cache().
 * 
 * This method accepts one OPTIONAL parameter, TTL that is the number of seconds,
 * to retain the data in the cache.
 * The default value for cache is 5 seconds but we can adjust it with process.env.SQL_CACHE_TTL.
 * 
 * Cf link:https://socket.dev/npm/package/@nic-jennings/batched-sql-datasource
 */

class CoreDatamapper {
  tableName;

  constructor(db) {
    this.db = db;
  }

  // Dataloading process using .batch & .cache methods
  init() {
    this.batchByPk = this.db.query
      .from(this.tableName)
      .batch(async (query, ids) => {
        const rows = await query
        .whereIn('id', ids)
        .cache(process.env.SQL_CACHE_TTL);
        // ids = [12,34,2,56,2]
        const reorderedRows = ids.map(
          // id = 12
          (id) => {
            // rows = [{id: 1, name: 'Paris'}, {id: 2, name: 'Marseille'}, {…}, …]
            const foundRow = rows?.find((row) => row.id === id);
            return foundRow;
            // …12… ---> …{id: 12, name: 'Nantes'}…
          },
        );
        return reorderedRows;
      });
  }

  /**
     * Informations on how to get data by id
     * @param {number|number[]} id id or list of id's
     * @returns a record or list of records
     */
  async findByPk(id) {
    const row = await this.db.query
      .from(this.tableName)
      .where({ id })
      .first()
      .cache(process.env.SQL_CACHE_TTL);
    return row;
    /* Equivalent to:
    const preparedQuery = {
      text: `SELECT * FROM "${this.tableName}" WHERE id = $1`,
      values: [id]};
    const result = await this.db.query(preparedQuery);
    if (!result.rows[0]) {
      return null;
    }
    return result.rows[0];
    */
  }

  async findAll(params) {
    const query = this.db.query
      .from(this.tableName);
   
    if (params?.where) {
      query.where(params.where);
    }

    const rows = await query.cache(process.env.SQL_CACHE_TTL);
    return rows;
    /* Equivalent to:
    const preparedQuery = {
      text: `SELECT * FROM "${this.tableName}"};
    const result = await this.db.query(preparedQuery);
    if (!result.rows) {
      return null;
    }
    return result.rows;
    */

    /*
    Example if where :
    const events = await dataSources.ojoDB.eventDatamapper
    .findAll({where: {day: '27/07/24'}})
    const preparedQuery = {
      text: `SELECT * FROM "event" WHERE "day" = $1`,
      values: ['27/07/24']};
    const result = await this.db.query(preparedQuery);
    if (!result.rows) {
      return null;
    }
    return result.rows;
    */
  }

  async create(inputData) {
    const rows = await this.db.query
      .into(this.tableName)
      .insert(inputData)
      .returning('*');
    return rows[0];
    /* Example:
    const preparedQuery = {
      text: `INSERT INTO "event" ("day", "description", "game_id", "site_id", "slot") 
      values ($1, $2, $3, $4, $5) returning *`,
      [ inputData.day, inputData.description, inputData.game_id, inputData.site_id, inputData.slot]
      const result = await this.db.query(preparedQuery);
     */
  }
  
  async update(id, inputData) {
    const rows = await this.db.query
      .from(this.tableName)
      .update(inputData)
      .where({ id })
      .returning('*');
    return rows[0];
    /* Example:
    const preparedQuery = {
      text: `UPDATE "event" SET "description" = $1 WHERE "id" = $2 RETURNING *`,
      values: [ inputData.description, id]};
      const result = await this.db.query(preparedQuery);
     */
  }

  async delete(id) {
    const rowCount = await this.db.query
    .from(this.tableName)
    .delete(id)
    .where({ id });
    return !!rowCount;
    /* Equivalent to:
    const preparedQuery = {
      text: `DELETE FROM "${this.tableName}" WHERE id = $1`,
      values: [id]};
    const result = await this.db.query(preparedQuery);
    return !!preparedQuery.rowCount;
    Here we cast the result returned to be a boolean (true/false)
    If rowCount = 1 (truthy) => deleted
    If rowCount = 0 (falsy) => already deleted or id not registered
    */
  }
}

export default CoreDatamapper;

