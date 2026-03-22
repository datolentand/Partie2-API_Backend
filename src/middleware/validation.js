const validateArticle = (req, res, next) => {
    const { titre, contenu, auteur } = req.body;
    
    const errors = [];
    
    if (!titre || titre.trim() === '') {
        errors.push("Le titre est obligatoire");
    }
    
    if (!contenu || contenu.trim() === '') {
        errors.push("Le contenu est obligatoire");
    }
    
    if (!auteur || auteur.trim() === '') {
        errors.push("L'auteur est obligatoire");
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ 
            message: "Validation échouée", 
            errors 
        });
    }
    
    next();
};

const validateUpdateArticle = (req, res, next) => {
    const { titre, contenu, categorie, tags } = req.body;
    
    if (!titre && !contenu && !categorie && !tags) {
        return res.status(400).json({ 
            message: "Au moins un champ doit être fourni pour la mise à jour" 
        });
    }
    
    next();
};

module.exports = { validateArticle, validateUpdateArticle };
