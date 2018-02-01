module.exports.routes = [
  {
    method: "GET", path: "/press", target:
    {
      controller: 'PressController',
      action: 'index',
      skipAssets: 'true',
      swagger: {
        methods: ['GET'],
        summary: ' Get Press list',
        description: 'List of Press',
        produces: [
          'application/json'
        ],
        tags: [
          'Press'
        ],
        responses: {
          '200': {
            description: 'List of Press'
          }
        },
        parameters: [
          {in: "query", name: "page"},
          {in: "query", name: "per_page"}
        ]


      }
    }
  },
];
