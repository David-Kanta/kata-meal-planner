const fs = require('fs')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()

// Chemin vers la base de données
const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, '../../../data/mealplanner.db')

console.log('🔄 Exécution des migrations...')
console.log('📁 Base de données:', DB_PATH)

// Créer le dossier data s'il n'existe pas
const dataDir = path.dirname(DB_PATH)
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
  console.log('✅ Dossier data créé')
}

// Connexion à la base de données
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Erreur de connexion:', err.message)
    process.exit(1)
  }
})

// Lire et exécuter le fichier SQL
const migrationPath = path.join(__dirname, '001_init_schema.sql')
const sql = fs.readFileSync(migrationPath, 'utf8')

db.exec(sql, (err) => {
  if (err) {
    console.error('❌ Erreur lors de la migration:', err.message)
    process.exit(1)
  }

  console.log('✅ Migration 001_init_schema.sql exécutée avec succès')

  // Vérifier les tables créées
  db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, tables) => {
    if (err) {
      console.error('❌ Erreur:', err.message)
    } else {
      console.log('📋 Tables créées:', tables.map(t => t.name).join(', '))
    }

    db.close((err) => {
      if (err) {
        console.error('❌ Erreur de fermeture:', err.message)
      } else {
        console.log('✅ Base de données prête!')
      }
    })
  })
})
