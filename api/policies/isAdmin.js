module.exports = function (req, res, next) {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.redirect('/admin/login')
  }
  return next();
};
