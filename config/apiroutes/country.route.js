module.exports.routes = [
  {
    method: "GET", path: "/countries", target: {
    controller: "CountryController", action: "list", swagger: {
      methods: ['GET'],
      summary: 'Countries list',
      description: 'Countries list',
      tags: [
        'Country',
      ]
    }
  }
  },
];
