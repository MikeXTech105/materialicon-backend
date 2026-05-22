const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const env = require('./env.config');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'IconAPI Admin Panel API',
    version: '1.0.0',
    description: 'Production-ready backend admin panel API built with Node.js, Express.js, Sequelize, and MySQL.'
  },
  servers: [
    {
      url: `http://localhost:${env.port}/api/v1`,
      description: 'Local API v1'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

const swaggerSpec = swaggerJSDoc({
  definition: swaggerDefinition,
  apis: [path.join(__dirname, '..', 'docs', '*.js')]
});

module.exports = swaggerSpec;
