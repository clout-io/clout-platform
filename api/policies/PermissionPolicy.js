module.exports = async function (req, res, next) {
  let model = await Model.findOne({"identity": req.options.model});

  let options = {
    model: model,
    method: req.method,
    user: req.user
  };
  console.log(req.options)


  if (req.options.unknownModel) {
    return next();
  }

  PermissionService
    .findModelPermissions(options)
    .then(function (permissions) {
      sails.log.silly('PermissionPolicy:', permissions.length, 'permissions grant',
        req.method, 'on', options.model, 'for', req.user.username);

      if (!permissions || permissions.length === 0) {
        return res.send(403, {error: PermissionService.getErrorMessage(options)});
      }

      req.permissions = permissions;

      next();
    });
};
