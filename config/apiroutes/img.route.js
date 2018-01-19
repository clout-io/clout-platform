module.exports.routes = [
  {
    method: "POST", path: "/img/upload", target: {
    controller: "ImgController", action: "upload", swagger: {
      methods: ['POST'],
      summary: 'Upload img ',
      description: 'Upload img ',
      tags: [
        'Img'
      ],
      parameters: [
        {
          in: "formData",
          name: "img",
          description: "The uploaded file data",
          required: true,
          type: "file",
          allowMultiple: true
        }
      ],
      responses: {
        '200': {
          description: 'Upload img'
        }
      }
    }
  }
  },
];
