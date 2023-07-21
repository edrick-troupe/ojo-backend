import jwt from 'jsonwebtoken';

export default {

  async getUser(req) {
    try {
      const bearer = req.headers.authorization || '';
      if (!bearer) {
        throw new Error('no authorization');
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
      const user = await jwt.verify(token, process.env.JSON_WEB_TOKEN_PRIVATE_KEY);
      if (!user) {
        return null;
      }
      // Then we check that the user ip is the same as the one used to create the token
      if (user.ip !== req.ip) {
        return null;
      }
      /*
      {
        id: 1,
        email: 'jean.dupont@oclock.io,
        firstname: 'Jean',
        lastname: 'Dupont,
        ip: '192.168.1.1',
      },
      */
      return user;
    } catch (err) {
      // In case of JWT error (expires) we just through nothing
      return null;
    }
  },

};
