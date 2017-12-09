/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = async (req, res, next) => {
  let token;
  if (req.headers && req.headers.authorization) {
    let [scheme, credentials] = req.headers.authorization.split(' ');
    if (/^Token$/i.test(scheme)) {
      token = credentials;
    } else {
      return res.json(401, {err: 'Format is Authorization: Token [token]'});
    }
  } else if (req.param('token')) {
    token = req.param('token');
    delete req.query.token;
  } else {
    return res.json(401, {err: 'No Authorization header was found'});
  }

  let [encodedToken, user] = await Token.verify(token);
  if (!encodedToken) return res.json(401, {err: 'Invalid Token!'});

  req.token = encodedToken;
  req.user = user.toJSON();
  next();
};
