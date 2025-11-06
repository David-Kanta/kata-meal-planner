# Tâche 04 : Backend - Service Layer

**Phase:** 2
**Durée estimée:** 1 jour
**Dépendances:** Tâche 03
**Issue:** #1 - Home Page

---

## 📋 Objectifs

Implémenter la couche service qui contient la logique métier et appelle les repositories.

---

## ✅ Actions à réaliser

### Service Layer

**Fichier:** `server/src/services/mealService.js`

- [ ] Créer le fichier `mealService.js`
- [ ] Importer les repositories nécessaires

#### Fonction `getDailyMeals(date)`

- [ ] Appeler `mealRepository.findByDate(date)`
- [ ] Formatter les données en objet avec `breakfast`, `lunch`, `dinner`
- [ ] Retourner l'objet formaté

#### Fonction `getWeeklyMeals(startDate)`

- [ ] Calculer `startDate` (début de semaine si non fourni)
- [ ] Appeler `mealRepository.findByWeek(startDate)`
- [ ] Construire le plan hebdomadaire avec `buildWeeklyPlan()`
- [ ] Retourner le plan hebdomadaire

#### Fonction `getUpcomingMeals(limit)`

- [ ] Appeler `mealRepository.findUpcoming(now, limit)`
- [ ] Retourner les résultats

#### Fonction `swapMeal(mealId)`

- [ ] Récupérer le repas actuel avec `mealRepository.findById(mealId)`
- [ ] Obtenir une recette alternative avec `recipeRepository.findRandomByMealType()`
- [ ] Mettre à jour le repas avec `mealRepository.update()`
- [ ] Retourner le repas mis à jour

#### Fonction `markAsCooked(mealId)`

- [ ] Appeler `mealRepository.update()` avec `cooked: true` et `cooked_at: new Date()`
- [ ] Retourner le résultat

#### Helper Functions

- [ ] Implémenter `getStartOfWeek(date)` : retourne le lundi de la semaine
- [ ] Implémenter `buildWeeklyPlan(startDate, meals)` : construit le plan avec 7 jours

**Code de référence:**

```javascript
const mealRepository = require('../repositories/mealRepository')
const recipeRepository = require('../repositories/recipeRepository')

exports.getDailyMeals = async (date) => {
  const meals = await mealRepository.findByDate(date)

  return {
    date,
    breakfast: meals.find(m => m.meal_type === 'breakfast') || null,
    lunch: meals.find(m => m.meal_type === 'lunch') || null,
    dinner: meals.find(m => m.meal_type === 'dinner') || null
  }
}

exports.getWeeklyMeals = async (startDate) => {
  const start = startDate || getStartOfWeek(new Date())
  const meals = await mealRepository.findByWeek(start)

  // Formater les données par jour
  const weeklyPlan = buildWeeklyPlan(start, meals)

  return weeklyPlan
}

exports.getUpcomingMeals = async (limit) => {
  const now = new Date()
  return await mealRepository.findUpcoming(now, limit)
}

exports.swapMeal = async (mealId) => {
  // 1. Récupérer le repas actuel
  const currentMeal = await mealRepository.findById(mealId)

  // 2. Obtenir une recette alternative du même type
  const alternativeRecipe = await recipeRepository.findRandomByMealType(
    currentMeal.meal_type
  )

  // 3. Mettre à jour le repas
  const updatedMeal = await mealRepository.update(mealId, {
    recipe_id: alternativeRecipe.id
  })

  return updatedMeal
}

exports.markAsCooked = async (mealId) => {
  return await mealRepository.update(mealId, {
    cooked: true,
    cooked_at: new Date()
  })
}

// Helper functions
function getStartOfWeek(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Lundi
  return new Date(d.setDate(diff))
}

function buildWeeklyPlan(startDate, meals) {
  // Logique de construction du plan hebdomadaire
  const days = []
  const start = new Date(startDate)

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(start)
    currentDate.setDate(start.getDate() + i)
    const dateStr = currentDate.toISOString().split('T')[0]

    const dayMeals = meals.filter(m => m.date === dateStr)

    days.push({
      day: currentDate.toLocaleDateString('en-US', { weekday: 'long' }),
      date: dateStr,
      meals: {
        date: dateStr,
        breakfast: dayMeals.find(m => m.meal_type === 'breakfast') || null,
        lunch: dayMeals.find(m => m.meal_type === 'lunch') || null,
        dinner: dayMeals.find(m => m.meal_type === 'dinner') || null
      }
    })
  }

  const endDate = new Date(start)
  endDate.setDate(start.getDate() + 6)

  return {
    startDate: start.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    days
  }
}
```

---

## ✓ Critères de validation

- [ ] Le service `mealService.js` existe et exporte toutes les fonctions
- [ ] La logique métier est bien séparée de la logique de persistance
- [ ] Les fonctions helpers sont implémentées correctement
- [ ] Le plan hebdomadaire contient bien 7 jours (lundi à dimanche)
- [ ] Les dates sont formatées en ISO (YYYY-MM-DD)
- [ ] Le code gère les cas où il n'y a pas de repas planifiés (retourne `null`)

---

## 📚 Ressources

- [JavaScript Date Handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Service Layer Pattern](https://www.oreilly.com/library/view/node-js-design/9781785885587/ch08s02.html)
