module.exports.routes = [
  {
    method: "GET", path: "/url/og", target:
    {
      controller: 'UrlController',
      action: 'ogInfo',
      skipAssets: 'true',
      swagger: {
        methods: ['GET'],
        summary: 'Get og info',
        description: 'Get og info',
        produces: [
          'application/json'
        ],
        tags: [
          'Url'
        ],
        responses: {
          '200': {
            description: 'Og info about url'
          }
        },
        parameters: [
          {in: "query", name: "url"}
        ]


      }
    }
  },
];
