const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Blog - Documentation",
            version: "1.0.0",
            description: "API REST pour la gestion d'un blog avec articles, catégories et tags",
            contact: {
                name: "Support API",
                email: "support@apiblog.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Serveur de développement"
            }
        ],
        tags: [
            {
                name: "Articles",
                description: "Gestion des articles du blog"
            }
        ]
    },
    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec };
