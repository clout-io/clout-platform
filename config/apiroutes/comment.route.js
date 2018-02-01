module.exports.routes = [
  {
    method: "POST", path: "/comment/:objectId", target: {
    controller: "CommentController", action: "create", swagger: {
      methods: ['POST'],
      summary: 'Create comment',
      description: 'Create comment',
      tags: [
        'Comment',
      ],
      parameters: [
        {
          in: "path", name: "objectId",
        },
        {
          in: "body", name: "data", schema: {
          "required": [
            "content",
          ],
          "type": "object",
          "properties": {
            "text": {
              "type": "string",
              "description": "text of comment"
            }
          }
        }
        }
      ],
      responses: {
        '200': {
          description: 'Comment is created'
        }
      }
    }
  }
  },
  {
    method: "GET", path: "/comments/:objectId", target: {
    controller: "CommentController", action: "list", swagger: {
      methods: ['GET'],
      summary: 'Return list of comments by objectId',
      description: 'Return list of comments by objectId',
      tags: [
        'Comment',
      ],
      parameters: [
        {
          in: "path", name: "objectId",
        }
      ],
      responses: {
        '200': {
          description: 'list of comments'
        }
      }
    }
  }
  },
];
