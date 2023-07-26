import CoreDatamapper from './coreDatamapper.js';
import bcrypt from 'bcrypt';

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

  async register(inputData) {
    /*const user = await dataSources.ojoDB.userDatamapper.findAll({ where: { email } });
    if (user.email == inputData.email) {
      throw new GraphQLError('Mail already registered', {
        extensions: {
          code: 'FORBIDDEN',
          },
          
        return null;
      }
    */
    inputData.password = await bcrypt.hash(inputData.password, 10)
    const rows = await this.db.query
      .into(this.tableName)
      .insert(inputData)
      .returning('*');
    return rows[0];
  }
}

export default User;


