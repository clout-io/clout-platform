module.exports = {
  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    name: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    confirmPassword: {
      type: 'string',
      required: true
    }
  }
};
