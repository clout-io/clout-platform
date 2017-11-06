const util = require('util');


var routes = [
  {
    method: "GET", path: "/activate", target:
    {
      controller: "SignUpController",
      action: "activate",
      swagger: {
        methods: ['GET'],
        summary: 'Activate user by code',
        description: 'Activate user by code',
        produces: [
          'application/json'
        ],
        tags: [
          'SignUp'
        ],
        parameters: [{in: "query", name: "code"}]
      }
    }
  },
  {
    method: "POST", path: "/signup", target: {
    controller: "SignUpController",
    action: "index",
    swagger: {
      methods: ['POST'],
      summary: 'Singup user',
      description: 'Singup user',
      produces: [
        'application/json'
      ],
      tags: [
        'SignUp'
      ],
      parameters: [{
        in: "body", name: "data", schema: {
          "required": [
            "email",
            "password",
            "confirmPassword"
          ],
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": ""
            },
            "password": {
              "type": "string",
              "description": ""
            },
            "confirmPassword": {
              "type": "string",
              "description": ""
            }
          }
        }
      }]
    }
  }
  },
  {
    method: "POST", path: "/signin", target: {
    controller: "SignInController",
    action: "index",
    swagger: {
      methods: ['POST'],
      summary: 'SingIn user',
      description: 'SingIn user',
      produces: [
        'application/json'
      ],
      tags: [
        'SignIn'
      ],
      parameters: [
        {
          in: "body", name: "data",
          schema: {
            "required": [
              "email",
              "password",
            ],
            "type": "object",
            "properties": {
              "email": {
                "type": "string",
                "description": ""
              },
              "password": {
                "type": "string",
                "description": ""
              }
            }
          }
        }
      ]
    }
  }
  },
  {
    method: "GET", path: "/facebook/url", target: {
    controller: "SocialController",
    action: "facebookUrl",
    swagger: {
      methods: ['GET'],
      summary: 'Retrieve url for SingIn/SingUp',
      description: 'SingIn user',
      tags: [
        'SignIn', "SignUp"
      ]
    }
  }
  },
  {
    method: "GET", path: "/auth/facebook", target: {
    controller: "SocialController",
    action: "facebookAuth",
    swagger: {
      methods: ['GET'],
      summary: 'SingIn/SingUp user',
      description: 'SingIn user',
      tags: [
        'SignIn', "SignUp"
      ],
      parameters: [
        {in: "query", name: "code"},
        {in: "query", name: "redirectUri"}
      ]
    }
  }
  },
  {
    method: "GET", path: "/auth/mobile/facebook", target: {
    controller: "SocialController",
    action: "facebookMobileAuth",
    swagger: {
      methods: ['GET'],
      summary: 'SingIn/SingUp user',
      description: 'SingIn user with access token',
      tags: [
        'SignIn', "SignUp"
      ],
      parameters: [
        {in: "query", name: "accessToken"}
      ]
    }
  }
  },
  {
    method: "GET", path: "/altcoins", target:
    {
      controller: 'AltcoinController',
      action: 'index',
      skipAssets: 'true',
      swagger: {
        methods: ['GET'],
        summary: ' Get Altcoins',
        description: 'List of Altcoins',
        produces: [
          'application/json'
        ],
        tags: [
          'Altcoins'
        ],
        responses: {
          '200': {
            description: 'List of Altcoins'
          }
        },
        parameters: [
          {in: "query", name: "page"},
          {in: "query", name: "per_page"}
        ]


      }
    }
  },
  {
    method: "GET", path: "/altcoin/:name", target: {
    controller: "AltcoinController", action: "info", swagger: {
      methods: ['GET'],
      summary: 'History info about altcoin',
      description: 'History info about altcoin',
      tags: [
        'Altcoins',
      ]
    }
  }
  },
  {
    method: "POST", path: "/follow/:id", target: {
    controller: "FollowController", action: "index", swagger: {
      methods: ['POST'],
      summary: 'History info about altcoin',
      description: 'History info about altcoin',
      tags: [
        'Follow'
      ]
    }
  }
  },
  {
    method: "GET", path: "/icos", target:
    {
      controller: 'IcoController',
      action: 'index',
      skipAssets: 'true',
      swagger: {
        methods: ['GET'],
        summary: ' Get Ico list',
        description: 'List of ICO',
        produces: [
          'application/json'
        ],
        tags: [
          'Ico'
        ],
        responses: {
          '200': {
            description: 'List of Ico'
          }
        },
        parameters: [
          {in: "query", name: "page"},
          {in: "query", name: "per_page"}
        ]


      }
    }
  },
  {
    method: "GET", path: "/ico/:id", target:
    {
      controller: 'IcoController',
      action: 'info',
      skipAssets: 'true',
      swagger: {
        methods: ['GET'],
        summary: ' Get Ico detail',
        description: 'Details of ICO',
        produces: [
          'application/json'
        ],
        tags: [
          'Ico'
        ],
        responses: {
          '200': {
            description: 'Details of Ico'
          }
        }


      }
    }
  },
  {
    method: "POST", path: "/like/:objectId", target: {
    controller: "LikeController", action: "index", swagger: {
      methods: ['POST'],
      summary: 'History info about altcoin',
      description: 'History info about altcoin',
      tags: [
        'Like',
      ],
      parameters: [
        {
          in: "path", name: "objectId",
        }
      ],
      responses: {
        '200': {
          description: 'Like is created'
        }
      }
    }
  }
  },
  {
    method: "POST", path: "/comment/:objectId", target: {
    controller: "CommentController", action: "create", swagger: {
      methods: ['POST'],
      summary: 'Create comment',
      description: 'Create comment',
      tags: [
        'Comment',
      ],
      parameters: [
        {
          in: "path", name: "objectId",
        },
        {
          in: "body", name: "data", schema: {
          "required": [
            "content",
          ],
          "type": "object",
          "properties": {
            "text": {
              "type": "string",
              "description": "text of comment"
            }
          }
        }
        }
      ],
      responses: {
        '200': {
          description: 'Comment is created'
        }
      }
    }
  }
  },
  {
    method: "GET", path: "/comments/:objectId", target: {
    controller: "CommentController", action: "list", swagger: {
      methods: ['GET'],
      summary: 'Return list of comments by objectId',
      description: 'Return list of comments by objectId',
      tags: [
        'Comment',
      ],
      parameters: [
        {
          in: "path", name: "objectId",
        }
      ],
      responses: {
        '200': {
          description: 'list of comments'
        }
      }
    }
  }
  },
  {
    method: "POST", path: "/vote/:objectId", target: {
    controller: "VoteController", action: "create", swagger: {
      methods: ['POST'],
      summary: 'Create vote ',
      description: 'Create vote',
      tags: [
        'Vote'
      ],
      parameters: [
        {
          in: "path", name: "objectId"
        },
        {
          in: "body", name: "data", schema: {
          "required": [
            "content"
          ],
          "type": "object",
          "properties": {
            "vote": {
              "type": "string",
              "description": " \'+\' or \'-\'"
            }
          }
        }
        }
      ],
      responses: {
        '200': {
          description: 'Vote is created'
        }
      }
    }
  }
  },
  {
    method: "POST", path: "/img/upload", target: {
    controller: "ImgController", action: "upload", swagger: {
      methods: ['POST'],
      summary: 'Upload img ',
      description: 'Upload img ',
      tags: [
        'Img'
      ],
      parameters: [
        {
          in: "formData",
          name: "img",
          description: "The uploaded file data",
          required: true,
          type: "file",
          allowMultiple: true
        }
      ],
      responses: {
        '200': {
          description: 'Upload img'
        }
      }
    }
  }
  },
  {
    method: "POST", path: "/news/create", target: {
    controller: "PostController", action: "create", swagger: {
      methods: ['POST'],
      summary: 'Create Post for newsfeed ',
      description: 'Create Post for newsfeed',
      tags: [
        'Post'
      ],
      parameters: [
        {
          in: "body", name: "data", schema: {
          "required": [
            "content",
          ],
          "type": "object",
          "properties": {
            "text": {
              "type": "string",
              "description": "text of post"
            },
            "video": {
              "type": "string",
              "description": "youtube link"
            },
            "link": {
              "type": "string",
              "description": "link for preview"
            },
            "attachment": {
              "type": "array",
              "description": "attachment ids",
              "items": {type: "string"}
            }

          }
        }
        }
      ],
      responses: {
        '201': {
          description: 'Created post'
        }
      }
    }
  }
  },
  {
    method: "GET", path: "/news", target: {
    controller: "PostController", action: "index", swagger: {
      methods: ['GET'],
      summary: 'newsfeed ',
      description: 'newsfeed',
      tags: [
        'Post'
      ],
      responses: {
        '200': {
          description: 'newsfeed'
        }
      }
    }
  }
  },

  {method: "GET", path: "/altcoins/sync", target: "AltcoinController.sync"},
  {method: "GET", path: "/icos/sync/:type", target: "IcoController.sync"},
  {method: "GET", path: "/icos/syncphoto/", target: "IcoController.syncPhoto"},
  {method: "GET", path: "/altcoins/syncphoto/", target: "AltcoinController.syncPhoto"}
];

var prefix = "/api/v1";

var routeObject = {};
for (var key in routes) {
  routeObject[util.format('%s %s%s', routes[key].method, prefix, routes[key].path)] = routes[key].target
}

routeObject["GET /admin/login"] = "AdminController.login";
routeObject["POST /admin/login"] = "AdminController.login";
routeObject["GET /activate"] = "SignUpController.activate";
routeObject["GET /image/ico/:imgName"] = "ImgController.getIcoPhoto";
routeObject["GET /image/:imgName"] = "ImgController.getPhoto";

module.exports.routes = routeObject;
