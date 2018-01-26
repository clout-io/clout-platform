module.exports.routes = [
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
          {in: "query", name: "per_page"},
          {in: "query", name: "filter", "description": ' \{"status":"closed|upcoming|ongoing" \} '},
          {in: "query", name: "sort", "description": "any field from ICO object, excep object or arry fields"},
          {in: "query", name: "sortType", "description": "asc or desc"}
        ]


      }
    }
  },
  {
    method: "POST", path: "/ico", target:
    {
      controller: 'IcoController',
      action: 'create',
      skipAssets: 'true',
      swagger: {
        methods: ['POST'],
        summary: 'Create ICO',
        description: 'Create ICO',
        produces: [
          'application/json'
        ],
        tags: [
          'Ico'
        ],
        responses: {
          '200': {
            description: 'Create ICO'
          }
        },
        parameters: [
          {
            in: "body", name: "data",
            schema: {
              "required": [],
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": ""
                },
                "description": {
                  "type": "string",
                  "description": ""
                },
                "status": {
                  "type": "string",
                  "description": ""
                },
                "startDate": {
                  "type": "string",
                  "description": ""
                },
                "endDate": {
                  "type": "string",
                  "description": ""
                },
                "image": {
                  "type": "string",
                  "description": ""
                },
                "categories": {
                  "type": "array",
                  "description": ""
                },
                "primaryGeography": {
                  "type": "string",
                  "description": ""
                },
                "amount": {
                  "type": "integer",
                  "description": ""
                },
                "jurisdiction": {
                  "type": "string",
                  "description": ""
                },
                isPremium: {
                  "type": "boolean",
                  "description": ""
                },
                premiumRank: {
                  "type": "integer",
                  "description": ""
                },
                premiumDescription: {
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
    method: "GET", path: "/icos/top", target:
    {
      controller: 'IcoController',
      action: 'top',
      skipAssets: 'true',
      swagger: {
        methods: ['GET'],
        summary: '',
        description: '',
        produces: [
          'application/json'
        ],
        tags: ["Ico"],
        responses: {
          '200': {
            description: ''
          }
        },
        parameters: [
          {in: "query", name: "top"}
        ]


      }
    }
  },
  {
    method: "GET", path: "/icos/alpha", target:
    {
      controller: 'IcoController',
      action: 'alphabetList',
      skipAssets: 'true',
      swagger: {
        methods: ['GET'],
        summary: ' alphabetList',
        description: 'alphabetList',
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
        }


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
    method: "GET", path: "/ico/filters/stage", target: {
    controller: "IcoStageController", action: "list", swagger: {
      methods: ['GET'],
      summary: 'Stage list',
      description: 'Stage list',
      tags: [
        'Ico',
      ]
    }
  }
  },
  {
    method: "GET", path: "/ico/filters/tokentype", target: {
    controller: "IcoTokenTypeController", action: "list", swagger: {
      methods: ['GET'],
      summary: 'tokentype list',
      description: 'tokentype list',
      tags: [
        'Ico',
      ]
    }
  }
  },
  {
    method: "GET", path: "/ico/filters/tokentechnology", target: {
    controller: "IcoTokenTechnologyController", action: "list", swagger: {
      methods: ['GET'],
      summary: 'tokentype list',
      description: 'tokentype list',
      tags: [
        'Ico',
      ]
    }
  }
  },
  {
    method: "GET", path: "/ico/filters/industry", target: {
    controller: "IcoIndustryController", action: "list", swagger: {
      methods: ['GET'],
      summary: 'tokentype list',
      description: 'tokentype list',
      tags: [
        'Ico',
      ]
    }
  }
  },
  {
    method: "GET", path: "/ico/filters/category", target: {
    controller: "IcoCategoryController", action: "list", swagger: {
      methods: ['GET'],
      summary: 'tokentype list',
      description: 'tokentype list',
      tags: [
        'Ico',
      ]
    }
  }
  },
];
