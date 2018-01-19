module.exports.routes = [
  {
    method: "GET", path: "/tag/search", target:
    {
      controller: 'TagController',
      action: 'search',
      skipAssets: 'true',
      swagger: {
        methods: ['GET'],
        summary: '',
        description: '',
        produces: [
          'application/json'
        ],
        tags: ["Tag"],
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
