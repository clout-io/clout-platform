module.exports.routes = [
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
          'user'
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
        'user'
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
            "username": {
              "type": "string",
              "description": ""
            },
            "name": {
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
        'user'
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
        'user'
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
        'user'
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
        'user'
      ],
      parameters: [
        {in: "query", name: "accessToken"}
      ]
    }
  }
  },
  {
    method: "GET", path: "/user/password/reset", target: {
    controller: "UserController", action: "resetPasswordRequest", swagger: {
      methods: ['GET'],
      summary: 'Reset password ',
      description: 'Reset password',
      tags: [
        'User'
      ],
      parameters: [
        {
          in: "query", name: "email"
        }
      ],
      responses: {
        '200': {
          description: 'Reset password'
        }
      }
    }
  }
  },
  {
    method: "POST", path: "/user/profile", target: {
    controller: "UserController", action: "editProfile", swagger: {
      methods: ['POST'],
      summary: 'Edit self profile',
      description: 'Edit self profile',
      tags: [
        'User'
      ],
      parameters: [
        {
          in: "body", name: "data", schema: {
          "required": [
            "content"
          ],
          "type": "object",
          "properties": {
            "username": {
              "type": "string",
              "description": ""
            },
            "firstName": {
              "type": "string",
              "description": ""
            },
            "phone": {
              "type": "string",
              "description": ""
            },
            "site": {
              "type": "string",
              "description": ""
            },
            "skype": {
              "type": "string",
              "description": ""
            },
            "linkedin": {
              "type": "string",
              "description": ""
            },
            "tweeter": {
              "type": "string",
              "description": ""
            },
            "facebook": {
              "type": "string",
              "description": ""
            },
            "country": {
              "type": "string",
              "description": ""
            },
            "city": {
              "type": "string",
              "description": ""
            },
            "state": {
              "type": "string",
              "description": ""
            },
            "street": {
              "type": "string",
              "description": ""
            },
            "suite": {
              "type": "string",
              "description": ""
            },
            "slug": {
              "type": "string",
              "description": ""
            }
          }
        }
        }
      ],
      responses: {
        '200': {
          description: 'Reset password'
        }
      }
    }
  }
  },
  {
    method: "GET", path: "/user/activity", target: {
    controller: "UserController", action: "activities",
    swagger: {
      methods: ['GET'],
      summary: 'User activity ',
      description: 'User activity',
      tags: [
        'User'
      ],
      responses: {
        '200': {
          description: 'User activities'
        }
      }
    }
  }
  },
  {
    method: "GET", path: "/user/profile/:username", target: {
    controller: "UserController", action: "profile", swagger: {
      methods: ['GET'],
      summary: 'Return public profile ',
      description: 'Return public profile',
      tags: [
        'User'
      ],
      responses: {
        '200': {
          description: 'Return public profile'
        }
      }
    }
  }
  },
  {
    method: "GET", path: "/user", target: {
    controller: "UserController", action: "info", swagger: {
      methods: ['GET'],
      summary: 'Return public profile ',
      description: 'Return public profile',
      tags: [
        'User'
      ],
      responses: {
        '200': {
          description: 'Return public profile'
        }
      }
    }
  }
  },
  {
    method: "POST", path: "/user/password/reset/:code", target: {
    controller: "UserController", action: "resetPassword", swagger: {
      methods: ['POST'],
      summary: 'Reset password ',
      description: 'Reset password',
      tags: [
        'User'
      ],
      parameters: [
        {
          in: "path", name: "code"
        },
        {
          in: "body", name: "data", schema: {
          "required": [
            "content"
          ],
          "type": "object",
          "properties": {
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
        }
      ],
      responses: {
        '200': {
          description: 'Reset password'
        }
      }
    }
  }
  },
  {
    method: "POST", path: "/user/password/change", target: {
    controller: "UserController", action: "changePassword", swagger: {
      methods: ['POST'],
      summary: 'Change password ',
      description: 'Change password',
      tags: [
        'User'
      ],
      parameters: [
        {
          in: "body", name: "data", schema: {
          "required": [
            "content"
          ],
          "type": "object",
          "properties": {
            "oldPassword": {
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
        }
      ],
      responses: {
        '200': {
          description: 'Reset password'
        }
      }
    }
  }
  },
  {
    method: "POST", path: "/user/avatar", target: {
    controller: "UserController", action: "avatar", swagger: {
      methods: ['POST'],
      summary: 'Upload avatar ',
      description: 'Upload avatar',
      tags: [
        'User'
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
          description: 'Reset password'
        }
      }
    }
  }
  },
];
