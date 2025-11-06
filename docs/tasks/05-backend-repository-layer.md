# Tâche 05 : Backend - Repository Layer

**Phase:** 2
**Durée estimée:** 1 jour
**Dépendances:** Tâche 04
**Issue:** #1 - Home Page

---

## 📋 Objectifs

Implémenter la couche repository qui gère l'accès à la base de données SQLite.

---

## ✅ Actions à réaliser

### Repository Layer

**Fichier:** `server/src/repositories/mealRepository.js`

- [ ] Créer le fichier `mealRepository.js`
- [ ] Importer la connexion DB : `const db = require('../config/database')`

#### Fonction `findByDate(date)`

- [ ] Écrire une requête SQL avec `JOIN` entre `meal_plans` et `recipes`
- [ ] Sélectionner tous les champs nécessaires (meal + recipe)
- [ ] Filtrer par date : `WHERE m.date = ?`
- [ ] Ordonner par type de repas (breakfast, lunch, dinner)
- [ ] Exécuter avec `db.all(query, [date])`

#### Fonction `findByWeek(startDate)`

- [ ] Calculer `endDate` (startDate + 6 jours)
- [ ] Écrire une requête SQL avec `JOIN`
- [ ] Filtrer par plage de dates : `WHERE m.date BETWEEN ? AND ?`
- [ ] Ordonner par date et type de repas
- [ ] Exécuter avec `db.all(query, [startDate, endDate])`

#### Fonction `findUpcoming(fromDate, limit)`

- [ ] Écrire une requête SQL avec `JOIN`
- [ ] Filtrer par date future : `WHERE m.date >= date('now')`
- [ ] Filtrer par non cuisiné : `AND m.cooked = 0`
- [ ] Ordonner par date et type
- [ ] Limiter les résultats : `LIMIT ?`
- [ ] Exécuter avec `db.all(query, [limit])`

#### Fonction `findById(id)`

- [ ] Requête simple : `SELECT * FROM meal_plans WHERE id = ?`
- [ ] Exécuter avec `db.get(query, [id])`

#### Fonction `update(id, data)`

- [ ] Construire dynamiquement la clause `SET` à partir des clés de `data`
- [ ] Exécuter la requête `UPDATE`
- [ ] Récupérer et retourner le meal mis à jour avec `findById(id)`

**Code de référence:**

```javascript
const db = require('../config/database')

exports.findByDate = async (date) => {
  const query = `
    SELECT
      m.id,
      m.date,
      m.meal_type,
      m.cooked,
      r.id as recipe_id,
      r.name as recipe_name,
      r.description as recipe_description,
      r.image_url as recipe_image_url,
      r.prep_time_minutes,
      r.cook_time_minutes
    FROM meal_plans m
    INNER JOIN recipes r ON m.recipe_id = r.id
    WHERE m.date = ?
    ORDER BY
      CASE m.meal_type
        WHEN 'breakfast' THEN 1
        WHEN 'lunch' THEN 2
        WHEN 'dinner' THEN 3
      END
  `

  return await db.all(query, [date])
}

exports.findByWeek = async (startDate) => {
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 6)

  const query = `
    SELECT
      m.*,
      r.*
    FROM meal_plans m
    INNER JOIN recipes r ON m.recipe_id = r.id
    WHERE m.date BETWEEN ? AND ?
    ORDER BY m.date, m.meal_type
  `

  return await db.all(query, [
    startDate.toISOString().split('T')[0],
    endDate.toISOString().split('T')[0]
  ])
}

exports.findUpcoming = async (fromDate, limit) => {
  const query = `
    SELECT
      m.*,
      r.*
    FROM meal_plans m
    INNER JOIN recipes r ON m.recipe_id = r.id
    WHERE m.date >= date('now')
    AND m.cooked = 0
    ORDER BY m.date, m.meal_type
    LIMIT ?
  `

  return await db.all(query, [limit])
}

exports.findById = async (id) => {
  return await db.get('SELECT * FROM meal_plans WHERE id = ?', [id])
}

exports.update = async (id, data) => {
  const fields = Object.keys(data).map(key => `${key} = ?`).join(', ')
  const values = Object.values(data)

  await db.run(
    `UPDATE meal_plans SET ${fields} WHERE id = ?`,
    [...values, id]
  )

  return await exports.findById(id)
}
```

---

## ✓ Critères de validation

- [ ] Le repository `mealRepository.js` existe et exporte toutes les fonctions
- [ ] Les requêtes SQL utilisent des paramètres préparés (protection injection SQL)
- [ ] Les `JOIN` retournent les données complètes (meal + recipe)
- [ ] La fonction `update` est dynamique et accepte n'importe quel champ
- [ ] Les résultats sont correctement ordonnés
- [ ] Le code fonctionne avec la structure de base de données existante

---

## 📚 Ressources

- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [SQL JOIN Tutorial](https://www.w3schools.com/sql/sql_join.asp)
- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)
