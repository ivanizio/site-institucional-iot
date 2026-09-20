const Database = require("better-sqlite3");

const path = require("path");

const caminhoBanco = path.join(__dirname, "contatos.db");

const db = new Database(caminhoBanco);

db.exec(`
    CREATE TABLE IF NOT EXISTS contatos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        mensagem TEXT NOT NULL,
        criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

module.exports = db;
