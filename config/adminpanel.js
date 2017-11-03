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
      title: 'User Social Networks',
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
      title: 'Altcoin Prices',
      model: 'AltcoinPrice',
    },
    Ico: {
      title: 'Ico\'s',
      model: 'Ico',
      list: {
        fields: {
          image: false,
          projectStage: false,

          hypeScore: false,
          riskScore: false,
          investScore: false,
          categories: {
            displayField: 'name'
          },
          founded: false,
          site: false,
          blog: false,
          primaryGeography: false,
          features: false,
          tokenType: false,
          tokenTechnology: false,
          jurisdiction: false,
          tokensDistribution: false,
          tokenSales: false,
          technicalDetails: false,
          sourceCode: false,
          proofOfDeveloper: false,
          similarProjects: {
            displayField: 'name'
          },
          team: {
            displayField: 'name'
          },
          socials: {
            displayField: 'link'
          }
        }
      },
      add: {
        fields: {
          team: {
            displayField: 'name'
          },
          socials: {
            displayField: 'link'
          },
          categories: {
            displayField: 'name'
          },
          similarProjects: {
            displayField: 'name'
          },
        }
      },
      edit: {
        fields: {
          startDate: false,
          endDate: false,
          team: {
            displayField: 'name'
          },
          socials: {
            displayField: 'link'
          },
          similarProjects: {
            displayField: 'name'
          },
          categories: {
            displayField: 'name'
          },
        }
      }
    },
    IcoTeam: {
      title: 'Ico Team',
      model: 'IcoTeam',
    },
    IcoSocial: {
      title: 'Ico Social',
      model: 'IcoSocial',
    },
    IcoCategory: {
      title: 'Ico Category',
      model: 'IcoCategory',
    },
    Likes: {
      title: 'Likes',
      model: 'Like'
    },
    Comments: {
      title: 'Comments',
      model: 'Comment'
    },
    Img: {
      title: 'Images',
      model: 'Img'
    }
  }
};
