module.exports = {
  autoCreatedBy: false,

  description: 'Specifies more granular limits on a permission',

  attributes: {
    where: 'json',
    blacklist: 'array',
    permission: {
      model: 'Permission'
    }
  }
};
