# Tâche 06 : Composables & State Management

**Phase:** 3
**Durée estimée:** 1 jour
**Dépendances:** Tâches 02-05 (Backend API complet)
**Issue:** #1 - Home Page

---

## 📋 Objectifs

Créer le composable `useMeals` et le store Pinia pour gérer l'état des repas côté frontend.

---

## ✅ Actions à réaliser

### 1. Composable useMeals

**Fichier:** `client/composables/useMeals.ts`

- [ ] Créer le fichier `useMeals.ts`
- [ ] Définir les refs reactives :
  - `dailyMeals: ref<DailyMeals | null>(null)`
  - `weeklyPlan: ref<WeeklyMealPlan | null>(null)`
  - `upcomingMeals: ref<Meal[]>([])`
  - `loading: ref(false)`
  - `error: ref<string | null>(null)`

- [ ] Implémenter `fetchDailyMeals(date?: string)` :
  - Gérer le loading
  - Appeler `/api/v1/meals/daily`
  - Gérer les erreurs
  - Mettre à jour `dailyMeals`

- [ ] Implémenter `fetchWeeklyMeals(startDate?: string)` :
  - Appeler `/api/v1/meals/weekly`
  - Mettre à jour `weeklyPlan`

- [ ] Implémenter `fetchUpcomingMeals(limit = 5)` :
  - Appeler `/api/v1/meals/upcoming`
  - Mettre à jour `upcomingMeals`

- [ ] Implémenter `swapMeal(mealId: string)` :
  - Appeler `POST /api/v1/meals/swap`
  - Rafraîchir les données avec `fetchDailyMeals()`
  - Retourner le nouveau repas

- [ ] Implémenter `markAsCooked(mealId: string)` :
  - Appeler `PUT /api/v1/meals/${mealId}/cook`
  - Rafraîchir les données

- [ ] Retourner toutes les propriétés et fonctions

**Code de référence:**

```typescript
export const useMeals = () => {
  const dailyMeals = ref<DailyMeals | null>(null)
  const weeklyPlan = ref<WeeklyMealPlan | null>(null)
  const upcomingMeals = ref<Meal[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchDailyMeals = async (date?: string) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await $fetch('/api/v1/meals/daily', {
        params: { date }
      })
      dailyMeals.value = data
    } catch (e) {
      error.value = 'Erreur lors du chargement des repas'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  const fetchWeeklyMeals = async (startDate?: string) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await $fetch('/api/v1/meals/weekly', {
        params: { startDate }
      })
      weeklyPlan.value = data
    } catch (e) {
      error.value = 'Erreur lors du chargement du plan hebdomadaire'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  const fetchUpcomingMeals = async (limit = 5) => {
    try {
      const { data } = await $fetch('/api/v1/meals/upcoming', {
        params: { limit }
      })
      upcomingMeals.value = data
    } catch (e) {
      console.error(e)
    }
  }

  const swapMeal = async (mealId: string) => {
    try {
      const { data } = await $fetch('/api/v1/meals/swap', {
        method: 'POST',
        body: { mealId }
      })

      // Rafraîchir les données
      await fetchDailyMeals()

      return data
    } catch (e) {
      error.value = 'Erreur lors du changement de repas'
      throw e
    }
  }

  const markAsCooked = async (mealId: string) => {
    try {
      await $fetch(`/api/v1/meals/${mealId}/cook`, {
        method: 'PUT'
      })

      // Rafraîchir les données
      await fetchDailyMeals()
    } catch (e) {
      error.value = 'Erreur lors du marquage du repas'
      throw e
    }
  }

  return {
    dailyMeals,
    weeklyPlan,
    upcomingMeals,
    loading,
    error,
    fetchDailyMeals,
    fetchWeeklyMeals,
    fetchUpcomingMeals,
    swapMeal,
    markAsCooked
  }
}
```

---

### 2. Pinia Store

**Fichier:** `client/stores/meal.ts`

- [ ] Créer le fichier `meal.ts`
- [ ] Définir le store avec `defineStore('meal', { ... })`
- [ ] Ajouter le state :
  - `currentDate: string` (date du jour par défaut)
  - `currentWeekStart: string | null`
  - `dailyMeals: DailyMeals | null`
  - `weeklyPlan: WeeklyMealPlan | null`

- [ ] Ajouter un getter `hasMealsForToday` qui vérifie si au moins un repas existe

- [ ] Ajouter une action `setCurrentDate(date: string)` pour changer la date

**Code de référence:**

```typescript
export const useMealStore = defineStore('meal', {
  state: () => ({
    currentDate: new Date().toISOString().split('T')[0],
    currentWeekStart: null as string | null,
    dailyMeals: null as DailyMeals | null,
    weeklyPlan: null as WeeklyMealPlan | null,
  }),

  getters: {
    hasMealsForToday: (state) => {
      return !!(state.dailyMeals?.breakfast ||
                state.dailyMeals?.lunch ||
                state.dailyMeals?.dinner)
    }
  },

  actions: {
    setCurrentDate(date: string) {
      this.currentDate = date
    }
  }
})
```

---

## ✓ Critères de validation

- [ ] Le composable `useMeals` est créé et fonctionne
- [ ] Toutes les fonctions retournent des promises
- [ ] Les erreurs sont gérées et affichées dans `error`
- [ ] Le loading state fonctionne correctement
- [ ] Le store Pinia est créé et accessible
- [ ] Le getter `hasMealsForToday` fonctionne
- [ ] Les types TypeScript sont corrects (pas d'erreur de compilation)

---

## 📚 Ressources

- [Vue 3 Composables](https://vuejs.org/guide/reusability/composables.html)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Nuxt $fetch](https://nuxt.com/docs/api/utils/dollarfetch)
