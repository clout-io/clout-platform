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
          socialNetworks: false,
          uploadedPhoto: false,
          followedAltcoins: false,
          followedIcos: false,
          likes: false,
          phone: false,
          site: false,
          skype: false,
          linkedin: false,
          tweeter: false,
          facebook: false,
          country: false,
          city: false,
          state: false,
          street: false,
          suite: false,
          activities: false,
          roles: {
            displayField: 'name'
          },
          permissions: false,
          avatar: false
        }
      },

      edit: {
        fields: {
          password: false,
          activationCode: false,
          id: false,
          createdAt: false,
          updatedAt: false,
          roles: {
            displayField: 'name'
          },
        }
      },
      add: {
        fields: {
          password: false,
          activationCode: false,
          id: false,
          createdAt: false,
          updatedAt: false,
          roles: {
            displayField: 'name'
          },
        }
      }
    },
    SocialNetworks: {
      title: 'User Social Networks',
      model: 'SocialNetwork',
      list: {
        fields: {
          id: false,
          type: true,
          socialId: true,
          socialData: false,
          token: false,
          user: true
        }
      }
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
    },
    Posts: {
      title: 'Posts',
      model: 'Post'
    },
    Tags: {
      title: 'Tags',
      model: 'Tag'
    },
    Rss: {
      title: 'Rss',
      model: 'RSS'
    },
    Press: {
      title: 'News',
      model: 'Press'
    },
    Category: {
      title: 'Categories',
      model: 'Category'
    },
    IcoTokenTechnology: {
      title: 'IcoTokenTechnology',
      model: 'IcoTokenTechnology'
    },
    IcoTokenType: {
      title: 'IcoTokenType',
      model: 'IcoTokenType'
    },
    IcoStage: {
      title: 'IcoStage',
      model: 'IcoStage'
    },
    IcoIndustry: {
      title: 'IcoIndustry',
      model: 'IcoIndustry'
    },
    Role: {
      title: 'Role',
      model: 'Role',
      list: {
        fields: {
          permissions: false,
          users: false,
        }
      },
      add: {
        fields: {
          permissions: false,
          users: false,
        }
      },
      edit: {
        fields: {
          permissions: false,
          users: {
            displayField: 'email'
          },
        }
      }
    },
    Permission: {
      title: 'Permission',
      model: 'Permission',
      list: {
        fields: {
          model: {
            displayField: 'name'
          },
          role: {
            displayField: 'name'
          },
          user: {
            displayField: 'email'
          },
        },
      },
      add: {
        fields: {
          model: {
            displayField: 'name'
          },
          role: {
            displayField: 'name'
          },
          users: {
            displayField: 'email'
          },
        },
      },
      edit: {
        fields: {
          model: {
            displayField: 'name'
          },
          role: {
            displayField: 'name'
          },
          users: {
            displayField: 'email'
          },
        },
      }
    },
    Criteria: {
      title: 'Criteria',
      model: 'Criteria'
    },
    Model: {
      title: 'Model',
      model: 'Model'
    },
  }
};
