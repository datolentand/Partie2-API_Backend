const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articleController');
const { validateArticle, validateUpdateArticle } = require('../middleware/validation');

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - titre
 *         - contenu
 *         - auteur
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré de l'article
 *         titre:
 *           type: string
 *           description: Titre de l'article
 *         contenu:
 *           type: string
 *           description: Contenu de l'article
 *         auteur:
 *           type: string
 *           description: Auteur de l'article
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *         categorie:
 *           type: string
 *           description: Catégorie de l'article
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associés à l'article
 */

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un nouvel article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *           example:
 *             titre: "Mon premier article"
 *             contenu: "Ceci est le contenu de mon article"
 *             auteur: "Jean Dupont"
 *             categorie: "Tech"
 *             tags: ["javascript", "nodejs"]
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post('/', validateArticle, ArticleController.createArticle);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupérer tous les articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: categorie
 *         schema:
 *           type: string
 *         description: Filtrer par catégorie
 *       - in: query
 *         name: auteur
 *         schema:
 *           type: string
 *         description: Filtrer par auteur
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrer par date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Liste des articles
 *       500:
 *         description: Erreur serveur
 */
router.get('/', ArticleController.getAllArticles);

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher des articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Texte à rechercher dans titre ou contenu
 *     responses:
 *       200:
 *         description: Résultats de la recherche
 *       400:
 *         description: Paramètre manquant
 *       500:
 *         description: Erreur serveur
 */
router.get('/search', ArticleController.searchArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupérer un article par ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Détails de l'article
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', ArticleController.getArticleById);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Mettre à jour un article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               contenu:
 *                 type: string
 *               categorie:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Article mis à jour
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', validateUpdateArticle, ArticleController.updateArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article supprimé
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', ArticleController.deleteArticle);

module.exports = router;
