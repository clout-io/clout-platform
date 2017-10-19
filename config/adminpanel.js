'use strict';

module.exports.adminpanel = {
  policies: ['sessionAuth', 'isAdmin'],
  instances: {
    users: {

      title: 'Users',
      model: 'User',

      list: {
        fields: {
          id: 'ID',
          email: 'Email',
          isActive: 'Active',
          isAdmin: 'isAdmin',
          createdAt: 'Created',
          password: false,
          activationCode: false,
          socialNetworks: false
        }
      },

      edit: {
        fields: {
          password: false,
          activationCode: false,
          id: false,
          createdAt: false,
          updatedAt: false
        }
      }
    },
    SocialNetworks: {
      title: 'SocialNetworks',
      model: 'SocialNetwork',
    },
    altcoins: {
      title: 'Altcoins',
      model: 'Altcoin',
      list: {
        fields: {
          priceHistory: false
        }
      }
    },
    AltcoinPrices: {
      title: 'AltcoinPrices',
      model: 'AltcoinPrice',
    }
  }
};
