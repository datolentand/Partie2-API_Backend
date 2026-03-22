const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../../database.db'));

// Configuration
db.pragma('journal_mode = WAL');

// Création de la table
db.prepare(`
    CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titre TEXT NOT NULL,
        contenu TEXT NOT NULL,
        auteur TEXT NOT NULL,
        date TEXT DEFAULT CURRENT_TIMESTAMP,
        categorie TEXT,
        tags TEXT
    )
`).run();

console.log("✅ Base de données SQLite connectée");

module.exports = db;
