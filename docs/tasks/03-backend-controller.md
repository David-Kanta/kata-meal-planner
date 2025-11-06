# Tâche 03 : Backend - Controller

**Phase:** 2
**Durée estimée:** 0.5 jour
**Dépendances:** Tâche 02
**Issue:** #1 - Home Page

---

## 📋 Objectifs

Implémenter les contrôleurs qui gèrent la logique HTTP et appellent les services.

---

## ✅ Actions à réaliser

### Controller

**Fichier:** `server/src/controllers/mealController.js`

- [ ] Créer le fichier `mealController.js`
- [ ] Importer le service : `const mealService = require('../services/mealService')`

- [ ] Implémenter `getDailyMeals(req, res, next)` :
  - Extraire `date` de `req.query` (par défaut: date du jour)
  - Appeler `mealService.getDailyMeals(targetDate)`
  - Retourner la réponse JSON avec `{ success: true, data: meals }`
  - Gérer les erreurs avec `next(error)`

- [ ] Implémenter `getWeeklyMeals(req, res, next)` :
  - Extraire `startDate` de `req.query`
  - Appeler `mealService.getWeeklyMeals(startDate)`
  - Retourner la réponse JSON

- [ ] Implémenter `getUpcomingMeals(req, res, next)` :
  - Extraire `limit` de `req.query` (par défaut: 5)
  - Appeler `mealService.getUpcomingMeals(limit)`
  - Retourner la réponse JSON

- [ ] Implémenter `swapMeal(req, res, next)` :
  - Extraire `mealId` de `req.body`
  - Appeler `mealService.swapMeal(mealId)`
  - Retourner la réponse JSON

- [ ] Implémenter `markAsCooked(req, res, next)` :
  - Extraire `id` de `req.params`
  - Appeler `mealService.markAsCooked(id)`
  - Retourner un message de succès

**Code de référence:**

```javascript
const mealService = require('../services/mealService')

exports.getDailyMeals = async (req, res, next) => {
  try {
    const { date } = req.query
    const targetDate = date || new Date().toISOString().split('T')[0]

    const meals = await mealService.getDailyMeals(targetDate)

    res.json({
      success: true,
      data: meals
    })
  } catch (error) {
    next(error)
  }
}

exports.getWeeklyMeals = async (req, res, next) => {
  try {
    const { startDate } = req.query
    const weeklyPlan = await mealService.getWeeklyMeals(startDate)

    res.json({
      success: true,
      data: weeklyPlan
    })
  } catch (error) {
    next(error)
  }
}

exports.getUpcomingMeals = async (req, res, next) => {
  try {
    const { limit = 5 } = req.query
    const upcomingMeals = await mealService.getUpcomingMeals(parseInt(limit))

    res.json({
      success: true,
      data: upcomingMeals
    })
  } catch (error) {
    next(error)
  }
}

exports.swapMeal = async (req, res, next) => {
  try {
    const { mealId } = req.body
    const newMeal = await mealService.swapMeal(mealId)

    res.json({
      success: true,
      data: newMeal
    })
  } catch (error) {
    next(error)
  }
}

exports.markAsCooked = async (req, res, next) => {
  try {
    const { id } = req.params
    await mealService.markAsCooked(id)

    res.json({
      success: true,
      message: 'Meal marked as cooked'
    })
  } catch (error) {
    next(error)
  }
}
```

---

## ✓ Critères de validation

- [ ] Le fichier `mealController.js` existe et exporte 5 fonctions
- [ ] Chaque fonction gère correctement les erreurs avec `try/catch` et `next(error)`
- [ ] Les réponses suivent le format JSON standardisé `{ success, data }`
- [ ] Les paramètres sont extraits correctement (query, body, params)
- [ ] Le code est propre et suit les conventions Node.js

---

## 📚 Ressources

- [Express Error Handling](https://expressjs.com/en/guide/error-handling.html)
- [Async/Await Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
