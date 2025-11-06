# Tâche 02 : Backend - Routes API

**Phase:** 2
**Durée estimée:** 0.5 jour
**Dépendances:** Aucune
**Issue:** #1 - Home Page

---

## 📋 Objectifs

Créer les routes API pour gérer les repas (daily, weekly, upcoming, swap, cook).

---

## ✅ Actions à réaliser

### Routes API

**Fichier:** `server/src/routes/mealRoutes.js`

- [ ] Créer le fichier de routes `mealRoutes.js`
- [ ] Importer Express et créer un router
- [ ] Définir la route `GET /daily` → `mealController.getDailyMeals`
- [ ] Définir la route `GET /weekly` → `mealController.getWeeklyMeals`
- [ ] Définir la route `GET /upcoming` → `mealController.getUpcomingMeals`
- [ ] Définir la route `POST /swap` → `mealController.swapMeal`
- [ ] Définir la route `PUT /:id/cook` → `mealController.markAsCooked`
- [ ] Exporter le router

**Code de référence:**

```javascript
const express = require('express')
const router = express.Router()
const mealController = require('../controllers/mealController')

// Daily Digest - Mobile
router.get('/daily', mealController.getDailyMeals)

// Weekly Plan - Desktop
router.get('/weekly', mealController.getWeeklyMeals)

// Upcoming Meals
router.get('/upcoming', mealController.getUpcomingMeals)

// Swap Meal
router.post('/swap', mealController.swapMeal)

// Cook Now
router.put('/:id/cook', mealController.markAsCooked)

module.exports = router
```

---

### Intégration dans le serveur

**Fichier:** `server/src/server.js` (ou `app.js`)

- [ ] Importer les routes meal : `const mealRoutes = require('./routes/mealRoutes')`
- [ ] Monter les routes sur `/api/v1/meals` : `app.use('/api/v1/meals', mealRoutes)`

---

## ✓ Critères de validation

- [ ] Le fichier `mealRoutes.js` existe et exporte un router Express
- [ ] Toutes les routes sont définies (5 routes au total)
- [ ] Les routes sont montées sur `/api/v1/meals` dans le serveur principal
- [ ] Les routes sont accessibles (même si les controllers ne sont pas encore implémentés)
- [ ] Aucune erreur au démarrage du serveur

---

## 📚 Ressources

- [Express.js Routing](https://expressjs.com/en/guide/routing.html)
- [REST API Best Practices](https://restfulapi.net/)
