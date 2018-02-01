module.exports.routes = [
  {
    method: "POST", path: "/vote/:objectId", target: {
    controller: "VoteController", action: "create", swagger: {
      methods: ['POST'],
      summary: 'Create vote ',
      description: 'Create vote',
      tags: [
        'Vote'
      ],
      parameters: [
        {
          in: "path", name: "objectId"
        },
        {
          in: "body", name: "data", schema: {
          "required": [
            "content"
          ],
          "type": "object",
          "properties": {
            "vote": {
              "type": "string",
              "description": " \'+\' or \'-\'"
            }
          }
        }
        }
      ],
      responses: {
        '200': {
          description: 'Vote is created'
        }
      }
    }
  }
  },
];
