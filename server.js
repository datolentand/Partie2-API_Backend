const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./src/swagger/swaggerConfig');
const articleRoutes = require('./src/routes/articleRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get('/', (req, res) => {
    res.json({ 
        message: "Bienvenue sur l'API Blog",
        documentation: "http://localhost:3000/api-docs"
    });
});

app.use('/api/articles', articleRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: "Route non trouvée" });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    console.log(`Documentation disponible sur http://localhost:${PORT}/api-docs`);
});

module.exports = app;
