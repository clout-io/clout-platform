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
      parameters: [{in: "body", name: "data"}]
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
          in: "body", name: "data"
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
          {in: "query", name: "code"},
          {in: "query", name: "redirectUri"}
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
  {method: "GET", path: "/altcoins/sync", target: "AltcoinController.sync"},
  {method: "GET", path: "/altcoins/history", target: "AltcoinController.history"}
];

var prefix = "/api/v1";

var routeObject = {};
for (var key in routes) {
  routeObject[util.format('%s %s%s', routes[key].method, prefix, routes[key].path)] = routes[key].target
}

module.exports.routes = routeObject;
