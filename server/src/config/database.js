const sqlite3 = require('sqlite3').verbose()
const path = require('path')

// Chemin vers la base de données
const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, '../../../data/mealplanner.db')

// Connexion à la base de données
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Erreur de connexion à la base de données:', err.message)
  } else {
    console.log('✅ Connecté à la base de données SQLite:', DB_PATH)
  }
})

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON')

// Promisify database methods
const dbAsync = {
  all: (query, params = []) => {
    return new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      })
    })
  },

  get: (query, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(query, params, (err, row) => {
        if (err) reject(err)
        else resolve(row)
      })
    })
  },

  run: (query, params = []) => {
    return new Promise((resolve, reject) => {
      db.run(query, params, function(err) {
        if (err) reject(err)
        else resolve({ id: this.lastID, changes: this.changes })
      })
    })
  }
}

module.exports = dbAsync
