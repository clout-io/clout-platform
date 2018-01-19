module.exports.routes = [
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
    method: "GET", path: "/altcoins/alpha", target:
    {
      controller: 'AltcoinController',
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
          'Altcoins'
        ],
        responses: {
          '200': {
            description: 'List of Altcoins'
          }
        }
      }
    }
  },
  {
    method: "GET", path: "/altcoins/favorites/", target:
    {
      controller: 'AltcoinController',
      action: 'favorites',
      skipAssets: 'true',
      swagger: {
        methods: ['GET'],
        summary: '',
        description: '',
        produces: [
          'application/json'
        ],
        tags: ['Altcoins'],
        responses: {
          '200': {
            description: ''
          }
        }, parameters: [
          {in: "query", name: "page"},
          {in: "query", name: "per_page"}
        ]
      }
    }

  },
  {
    method: "GET", path: "/altcoins/top", target:
    {
      controller: 'AltcoinController',
      action: 'top',
      skipAssets: 'true',
      swagger: {
        methods: ['GET'],
        summary: '',
        description: '',
        produces: [
          'application/json'
        ],
        tags: ["Altcoins"],
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
    method: "GET", path: "/altcoins/search", target:
    {
      controller: 'AltcoinController',
      action: 'search',
      skipAssets: 'true',
      swagger: {
        methods: ['GET'],
        summary: '',
        description: '',
        produces: [
          'application/json'
        ],
        tags: ["Altcoins"],
        responses: {
          '200': {
            description: ''
          }
        },
        parameters: [
          {in: "query", name: "term"}
        ]


      }
    }
  },
];
