const ArticleModel = require('../models/articleModel');

class ArticleController {
    
    // Créer un article
    static createArticle(req, res) {
        try {
            const { titre, contenu, auteur, categorie, tags } = req.body;
            
            const articleId = ArticleModel.create({ titre, contenu, auteur, categorie, tags });
            
            res.status(201).json({
                message: "Article créé avec succès",
                id: articleId
            });
        } catch (error) {
            res.status(500).json({ 
                message: "Erreur lors de la création de l'article",
                error: error.message 
            });
        }
    }
    
    // Récupérer tous les articles (avec filtres optionnels)
    static getAllArticles(req, res) {
        try {
            const { categorie, auteur, date } = req.query;
            
            const articles = ArticleModel.findAll({ categorie, auteur, date });
            
            res.status(200).json({
                count: articles.length,
                articles
            });
        } catch (error) {
            res.status(500).json({ 
                message: "Erreur lors de la récupération des articles",
                error: error.message 
            });
        }
    }
    
    // Récupérer un article par ID
    static getArticleById(req, res) {
        try {
            const { id } = req.params;
            
            const article = ArticleModel.findById(id);
            
            if (!article) {
                return res.status(404).json({ message: "Article non trouvé" });
            }
            
            res.status(200).json(article);
        } catch (error) {
            res.status(500).json({ 
                message: "Erreur lors de la récupération de l'article",
                error: error.message 
            });
        }
    }
    
    // Mettre à jour un article
    static updateArticle(req, res) {
        try {
            const { id } = req.params;
            const { titre, contenu, categorie, tags } = req.body;
            
            const changes = ArticleModel.update(id, { titre, contenu, categorie, tags });
            
            if (changes === 0) {
                return res.status(404).json({ message: "Article non trouvé" });
            }
            
            res.status(200).json({ 
                message: "Article mis à jour avec succès",
                id 
            });
        } catch (error) {
            res.status(500).json({ 
                message: "Erreur lors de la mise à jour de l'article",
                error: error.message 
            });
        }
    }
    
    // Supprimer un article
    static deleteArticle(req, res) {
        try {
            const { id } = req.params;
            
            const changes = ArticleModel.delete(id);
            
            if (changes === 0) {
                return res.status(404).json({ message: "Article non trouvé" });
            }
            
            res.status(200).json({ message: "Article supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ 
                message: "Erreur lors de la suppression de l'article",
                error: error.message 
            });
        }
    }
    
    // Rechercher des articles
    static searchArticles(req, res) {
        try {
            const { query } = req.query;
            
            if (!query) {
                return res.status(400).json({ message: "Paramètre 'query' requis" });
            }
            
            const articles = ArticleModel.search(query);
            
            res.status(200).json({
                count: articles.length,
                articles
            });
        } catch (error) {
            res.status(500).json({ 
                message: "Erreur lors de la recherche",
                error: error.message 
            });
        }
    }
}

module.exports = ArticleController;
