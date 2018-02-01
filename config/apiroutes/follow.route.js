module.exports.routes = [
  {
    method: "POST", path: "/follow/:id", target: {
    controller: "FollowController", action: "index", swagger: {
      methods: ['POST'],
      summary: 'History info about altcoin',
      description: 'History info about altcoin',
      tags: [
        'Follow'
      ]
    }
  }
  },
];
