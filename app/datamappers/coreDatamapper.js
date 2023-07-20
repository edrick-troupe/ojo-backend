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
      values: [id],};
    const result = await this.client.query(preparedQuery);
    if (!result.rows[0]) {
      return null;
    }
    return result.rows[0];
    */
  }

  async findAll(params) {
    const query = this.db.query
      .from(this.tableName);
      /* Equivalent to:
    const preparedQuery = {
      text: `SELECT * FROM "${this.tableName}"};
    const result = await this.client.query(preparedQuery);
    if (!result.rows) {
      return null;
    }
    return result.rows;
    */
   
    if (params?.where) {
      query.where(params.where);
    }
    const rows = await query.cache(process.env.SQL_CACHE_TTL);
    return rows;
  }

  async create(inputData) {
    const rows = await this.db.query
      .into(this.tableName)
      .insert(inputData)
      .returning('*');
    return rows[0];
  }

  async update(id, inputData) {
    const rows = await this.db.query
      .from(this.tableName)
      .update(inputData)
      .where({ id })
      .returning('*');
    return rows[0];
  }

  async delete(id) {
    const rowCount = await this.db.query.from(this.tableName).where({ id });
    return !!rowCount;
  }
}

export default CoreDatamapper;
