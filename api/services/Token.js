const
  jwt = require('jsonwebtoken'),
  tokenSecret = "X$fkcV$zBvTd`4+}(tT*![B/(S^mL{{A",
  moment = require('moment');

module.exports.issue = function (payload, expiresIn) {
  expiresIn = expiresIn || 180 * 60;
  return jwt.sign(
    payload,
    tokenSecret,
    {
      expiresIn: expiresIn
    }
  );
};

// Verifies token on a request
module.exports.verify = async (token) => {
  let verifiedToken = await new Promise((resolve, reject) => {
    jwt.verify(token, tokenSecret, {}, (err, response) => {
      if (response) resolve(response);
      reject(false);
    })
  });

  if (!verifiedToken)
    return [false, null];

  if (!token)
    return [false, null];

  let activity = await UserActivity.findOne({token: token}).populate("user");

  if (!activity) {
    return [false, null];
  }

  if (!activity.isActive) {
    return [false, null];
  }
  if (activity.expiredAt < new Date()) {
    return [false, null];
  }

  return [verifiedToken, activity.user];
};

module.exports.generate = async (user, req) => {
  let agentData = req.header('user-agent');
  let referer = req.header('referer');
  let ip = req.header('x-real-ip');
  let now = moment().utc();

  let tokenExpiration = 60 * 60 * 24 * 7;

  user.lastLogin = now.toDate();
  let token = Token.issue({id: user.id}, tokenExpiration);

  let geo = await IpApi.lookup(ip);

  user.activities.add({
    ip: ip,
    ips: req.ips,
    rawInfo: geo,
    agent: agentData,
    referer: referer,
    token: token,
    expiredAt: now.add(tokenExpiration, 's').toDate()
  });
  await user.save();

  return [user, token];
};
