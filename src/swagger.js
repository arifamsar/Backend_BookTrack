const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
  info: {
    version: '1.0.0',
    title: 'Book Tracking API Documentation',
    description: 'API Documentation for Book Tracking Application',
  },
  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
  baseDir: __dirname,
  filesPattern: './routes/*.js',
  swaggerUIPath: '/docs',
  exposeSwaggerUI: true,
  exposeApiDocs: false,
  apiDocsPath: '/v3/api-docs',
  notRequiredAsNullable: false,
  swaggerUiOptions: {},
  multiple: true,
};

const setupSwagger = (app) => {
  expressJSDocSwagger(app)(options);
};

module.exports = setupSwagger;