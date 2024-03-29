import jwt from 'jsonwebtoken';

export default {

  async getUser(req) {
    try {
      const bearer = req.headers.authorization || '';
      if (!bearer) {
        throw new Error('No Bearer into Authorization');
      }
      // Bearer eyJhbGciOiJIUzI1N
      // split(' ')
      /*
      [
        'Bearer',
        'eyJhbGciOiJIUzI1N'
      ]
      */
      const [, token] = bearer.split(' ');
      const newUser = await jwt.verify(token, process.env.JSON_WEB_TOKEN_PRIVATE_KEY);
      if (!newUser) {
        return null;
      }
      /*
      {
        id: 1,
        email: 'jean.dupont@oclock.io,
        firstname: 'Jean',
        lastname: 'Dupont,
      },
      */
      return newUser;
      
    } catch (err) {
      // In case of JWT error (expires) we just through nothing
      return null;
    }
  },

};
