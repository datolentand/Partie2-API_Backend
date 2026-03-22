const db = require('../config/database');

class ArticleModel {
    
    // Créer un article
    static create(articleData) {
        const { titre, contenu, auteur, categorie, tags } = articleData;
        
        const stmt = db.prepare(`
            INSERT INTO articles (titre, contenu, auteur, categorie, tags)
            VALUES (?, ?, ?, ?, ?)
        `);
        
        const result = stmt.run(
            titre,
            contenu,
            auteur,
            categorie || null,
            JSON.stringify(tags || [])
        );
        
        return result.lastInsertRowid;
    }
    
    // Récupérer tous les articles avec filtres optionnels
    static findAll(filters = {}) {
        let query = "SELECT * FROM articles WHERE 1=1";
        const params = [];
        
        if (filters.categorie) {
            query += " AND categorie = ?";
            params.push(filters.categorie);
        }
        
        if (filters.auteur) {
            query += " AND auteur = ?";
            params.push(filters.auteur);
        }
        
        if (filters.date) {
            query += " AND DATE(date) = ?";
            params.push(filters.date);
        }
        
        const articles = db.prepare(query).all(...params);
        
        return articles.map(article => ({
            ...article,
            tags: JSON.parse(article.tags || "[]")
        }));
    }
    
    // Récupérer un article par ID
    static findById(id) {
        const article = db.prepare("SELECT * FROM articles WHERE id = ?").get(id);
        
        if (!article) return null;
        
        article.tags = JSON.parse(article.tags || "[]");
        return article;
    }
    
    // Mettre à jour un article
    static update(id, articleData) {
        const { titre, contenu, categorie, tags } = articleData;
        
        const stmt = db.prepare(`
            UPDATE articles
            SET titre = COALESCE(?, titre),
                contenu = COALESCE(?, contenu),
                categorie = COALESCE(?, categorie),
                tags = COALESCE(?, tags)
            WHERE id = ?
        `);
        
        const result = stmt.run(
            titre || null,
            contenu || null,
            categorie || null,
            tags ? JSON.stringify(tags) : null,
            id
        );
        
        return result.changes;
    }
    
    // Supprimer un article
    static delete(id) {
        const stmt = db.prepare("DELETE FROM articles WHERE id = ?");
        const result = stmt.run(id);
        return result.changes;
    }
    
    // Rechercher des articles
    static search(query) {
        const articles = db.prepare(`
            SELECT * FROM articles
            WHERE titre LIKE ? OR contenu LIKE ?
        `).all(`%${query}%`, `%${query}%`);
        
        return articles.map(article => ({
            ...article,
            tags: JSON.parse(article.tags || "[]")
        }));
    }
}

module.exports = ArticleModel;
