module.exports.routes = [
  {
    method: "GET", path: "/treadings", target:
    {
      controller: 'TrendingController',
      action: 'index',
      skipAssets: 'true',
      swagger: {
        methods: ['GET'],
        summary: '',
        description: '',
        produces: [
          'application/json'
        ],
        tags: ["Trendings"],
        responses: {
          '200': {
            description: ''
          }
        },
        parameters: [
          {in: "query", name: "page"},
          {in: "query", name: "per_page"}
        ]


      }
    }
  }
];
