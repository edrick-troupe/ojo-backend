import CoreDatamapper from './coreDatamapper.js';

class Event extends CoreDatamapper {
  tableName = 'event';

  constructor(config) {
    super(config);
  };

}

export default Event;