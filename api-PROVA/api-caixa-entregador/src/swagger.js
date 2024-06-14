const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const doc = {
    info: {
        title: 'API-Caixa-Entregador',
        description: 'Api de fechamento de caixa para entregadores de Pizzaria e Lanchonetes.',
        version: '1.0.1'
    },
    host: 'localhost:3000',
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
    },
    security: [
        {
            bearerAuth: []
        }
    ]

};

const outputFile = './swagger.json';

const routes = ['./routes/autenticacao.routes.js', './routes/routes.js'];

swaggerAutogen(outputFile, routes, doc);