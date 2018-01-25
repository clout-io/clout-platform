const slug = require('slug');


module.exports = {
  attributes: {
    name: {
      type: "string",
      required: true
    }
  },

  beforeValidate: function (values, next) {
    values.id = slug(values.name);
    next()
  },
};
