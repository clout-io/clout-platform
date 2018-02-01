module.exports.routes = [
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
];
