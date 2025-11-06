# Tâche 12 : Tests Backend

**Phase:** 6
**Durée estimée:** 1 jour
**Dépendances:** Tâches 02-05 (Backend complet)
**Issue:** #1 - Home Page

---

## 📋 Objectifs

Créer les tests d'intégration pour les endpoints API et les tests unitaires pour la logique métier.

---

## ✅ Actions à réaliser

### 1. Tests d'Intégration - API Endpoints

**Fichier:** `server/tests/integration/mealController.test.js`

- [ ] Installer les dépendances de test si nécessaire :
  - `jest` ou `vitest`
  - `supertest` pour tester les endpoints HTTP

- [ ] Créer le fichier de test

#### Tests pour `GET /api/v1/meals/daily`

- [ ] Test : retourne les repas pour une date spécifique
  - Envoyer une requête GET avec `?date=2025-11-06`
  - Vérifier le status 200
  - Vérifier que `response.body.success === true`
  - Vérifier la structure : `breakfast`, `lunch`, `dinner`

- [ ] Test : retourne les repas du jour par défaut (sans query param)
  - Envoyer GET sans paramètre
  - Vérifier que la date retournée est aujourd'hui

#### Tests pour `GET /api/v1/meals/weekly`

- [ ] Test : retourne le plan hebdomadaire
  - Vérifier la structure : `startDate`, `endDate`, `days[]`
  - Vérifier qu'il y a 7 jours

#### Tests pour `POST /api/v1/meals/swap`

- [ ] Test : échange un repas avec succès
  - Envoyer `{ mealId: 'meal-123' }`
  - Vérifier que la recette a changé
  - Vérifier que le type de repas reste le même

- [ ] Test : retourne une erreur si l'ID est invalide
  - Vérifier le status 404 ou 400

#### Tests pour `PUT /api/v1/meals/:id/cook`

- [ ] Test : marque un repas comme cuisiné
  - Vérifier le status 200
  - Vérifier le message de succès

**Code de référence:**

```javascript
const request = require('supertest')
const app = require('../../src/server')

describe('Meal API Endpoints', () => {
  describe('GET /api/v1/meals/daily', () => {
    it('should return daily meals for a specific date', async () => {
      const response = await request(app)
        .get('/api/v1/meals/daily?date=2025-11-06')
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty('breakfast')
      expect(response.body.data).toHaveProperty('lunch')
      expect(response.body.data).toHaveProperty('dinner')
    })

    it('should return today\'s meals when no date provided', async () => {
      const response = await request(app)
        .get('/api/v1/meals/daily')
        .expect(200)

      expect(response.body.success).toBe(true)
      const today = new Date().toISOString().split('T')[0]
      expect(response.body.data.date).toBe(today)
    })
  })

  describe('GET /api/v1/meals/weekly', () => {
    it('should return weekly meal plan', async () => {
      const response = await request(app)
        .get('/api/v1/meals/weekly')
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty('startDate')
      expect(response.body.data).toHaveProperty('endDate')
      expect(response.body.data.days).toHaveLength(7)
    })
  })

  describe('POST /api/v1/meals/swap', () => {
    it('should swap a meal successfully', async () => {
      const response = await request(app)
        .post('/api/v1/meals/swap')
        .send({ mealId: 'meal-123' })
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty('recipe')
    })

    it('should return error for invalid meal ID', async () => {
      const response = await request(app)
        .post('/api/v1/meals/swap')
        .send({ mealId: 'invalid-id' })
        .expect(404)
    })
  })

  describe('PUT /api/v1/meals/:id/cook', () => {
    it('should mark meal as cooked', async () => {
      const response = await request(app)
        .put('/api/v1/meals/meal-123/cook')
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.message).toContain('cooked')
    })
  })
})
```

---

### 2. Tests Unitaires - Service Layer

**Fichier:** `server/tests/unit/mealService.test.js`

- [ ] Tester la fonction `getStartOfWeek()`
  - Vérifier qu'elle retourne bien un lundi
  - Tester avec différentes dates

- [ ] Tester la fonction `buildWeeklyPlan()`
  - Vérifier qu'elle retourne 7 jours
  - Vérifier que les dates sont consécutives

---

### 3. Configuration des Tests

**Fichier:** `server/package.json`

- [ ] Ajouter le script de test : `"test": "jest"` ou `"test": "vitest"`
- [ ] Configurer la base de données de test (SQLite en mémoire ou fichier test)

**Fichier:** `server/jest.config.js` (si Jest)

- [ ] Configurer l'environnement Node
- [ ] Configurer les paths et coverage

---

## ✓ Critères de validation

- [ ] Tous les tests passent (green)
- [ ] Les endpoints API sont tous testés
- [ ] Les cas d'erreur sont testés
- [ ] La couverture de code est > 70%
- [ ] Les tests sont rapides (< 5 secondes au total)
- [ ] Les tests peuvent être exécutés avec `npm test`
- [ ] Aucune dépendance sur des données externes (utiliser fixtures)

---

## 📚 Ressources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest GitHub](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
