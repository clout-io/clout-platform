module.exports.routes = [
  {
    method: "POST", path: "/news/create", target: {
    controller: "PostController", action: "create", swagger: {
      methods: ['POST'],
      summary: 'Create Post for newsfeed ',
      description: 'Create Post for newsfeed',
      tags: [
        'Post'
      ],
      parameters: [
        {
          in: "body", name: "data", schema: {
          "required": [
            "content",
          ],
          "type": "object",
          "properties": {
            "text": {
              "type": "string",
              "description": "text of post"
            },
            "video": {
              "type": "string",
              "description": "youtube link"
            },
            "category": {
              "type": "string",
              "description": "category id required"
            },
            "type": {
              "type": "string",
              "description": "article or post"
            },
            "link": {
              "type": "string",
              "description": "link for preview"
            },
            "attachment": {
              "type": "array",
              "description": "attachment ids",
              "items": {type: "string"}
            }

          }
        }
        }
      ],
      responses: {
        '201': {
          description: 'Created post'
        }
      }
    }
  }
  },
  {
    method: "GET", path: "/news/:itemId", target: {
    controller: "PostController", action: "single", swagger: {
      methods: ['GET'],
      summary: 'Retrieve Post',
      description: 'Retrieve Post',
      tags: [
        'Post'
      ],
      parameters: [
        {in: "path", name: "itemId"}]
    }
  }
  },
  {
    method: "POST", path: "/news/:itemId", target: {
    controller: "PostController", action: "edit", swagger: {
      methods: ['POST'],
      summary: 'Edit Post',
      description: 'Edit Post',
      tags: [
        'Post'
      ],
      parameters: [
        {in: "path", name: "itemId"},
        {
          in: "body", name: "data", schema: {
          "required": [
            "content",
          ],
          "type": "object",
          "properties": {
            "text": {
              "type": "string",
              "description": "text of post"
            },
            "video": {
              "type": "string",
              "description": "youtube link"
            },
            "type": {
              "type": "string",
              "description": "article or post"
            },
            "link": {
              "type": "string",
              "description": "link for preview"
            },
            "category": {
              "type": "string",
              "description": "category id required"
            },
            "attachment": {
              "type": "array",
              "description": "attachment ids",
              "items": {type: "string"}
            }

          }
        }
        }
      ],
      responses: {
        '200': {
          description: 'Edit post'
        }
      }
    }
  }
  },
  {
    method: "DELETE", path: "/news/:itemId", target: {
    controller: "PostController", action: "delete", swagger: {
      methods: ['DELETE'],
      summary: 'Delete Post',
      description: 'Delete Post',
      tags: [
        'Post'
      ],
      parameters: [
        {in: "path", name: "itemId"}
      ],
      responses: {
        '204': {
          description: 'Deleted'
        }
      }
    }
  }
  },
  {
    method: "GET", path: "/news", target: {
    controller: "PostController", action: "index", swagger: {
      methods: ['GET'],
      summary: 'newsfeed ',
      description: 'newsfeed',
      tags: [
        'Post'
      ],
      parameters: [
        {in: "query", name: "page"},
        {in: "query", name: "per_page"},
        {in: "query", name: "category"},
        {in: "query", name: "tag"}
      ],
      responses: {
        '200': {
          description: 'newsfeed'
        }
      }
    }
  }
  },
  {
    method: "GET", path: "/categories", target: {
    controller: "CategoryController", action: "index",
    swagger: {
      methods: ['GET'],
      summary: 'post categories list ',
      description: 'post categories list',
      tags: [
        'Post'
      ],
      responses: {
        '200': {
          description: 'post categories list'
        }
      }
    }
  }
  },
];
