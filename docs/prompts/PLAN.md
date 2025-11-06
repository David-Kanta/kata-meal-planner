# Plan Technique - Issue #1: Home Page

## 📋 Vue d'ensemble

**Issue:** #1 - Home Page
**Type:** Enhancement
**Complexité:** Moyenne-Élevée
**Estimation:** 5-8 jours

### Objectif
Implémenter la page d'accueil de MealPlanner avec deux vues distinctes :
- **Version Mobile** : "Daily Digest" - Vue journalière des repas
- **Version Desktop** : "This Week's Meal Plan" - Vue hebdomadaire avec calendrier

---

## 🎯 Décomposition Technique

### 1. Architecture des Composants

```
pages/index.vue (Page principale)
├── Mobile View
│   ├── AppHeader.vue
│   ├── DailyDigest.vue
│   │   ├── DateDisplay.vue
│   │   └── MealCard.vue (x3: Breakfast, Lunch, Dinner)
│   └── BottomNavigation.vue
│
└── Desktop View
    ├── AppHeader.vue (avec navigation tabs)
    ├── MonthCalendar.vue
    ├── WeeklyMealPlan.vue
    │   ├── MealPlanTable.vue
    │   └── QuickActions.vue
    └── UpcomingMeals.vue
        └── UpcomingMealCard.vue
```

### 2. Stack Technique Utilisée

**Frontend:**
- Nuxt.js 3 (Vue 3 avec `<script setup>`)
- TypeScript
- Tailwind CSS (Design System)
- Pinia (State management)

**Backend:**
- Node.js + Express
- SQLite (via repositories)
- RESTful API

---

## 📐 Plan d'Implémentation

### Phase 1: Setup Initial & Design System (Jour 1)

#### 1.1. Configuration Tailwind & Design Tokens

**Fichier:** `client/tailwind.config.ts`

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF8C00',
          light: '#FFD700',
        },
        neutral: {
          50: '#FAFAFA',
          900: '#000000',
        }
      },
      borderRadius: {
        card: '12px',
        button: '20px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.08)',
      }
    }
  }
}
```

#### 1.2. Types TypeScript

**Fichier:** `client/types/meal.ts`

```typescript
export interface Recipe {
  id: string
  name: string
  description: string
  imageUrl: string
  prepTimeMinutes: number
  cookTimeMinutes: number
}

export interface Meal {
  id: string
  date: string
  mealType: 'breakfast' | 'lunch' | 'dinner'
  recipe: Recipe
}

export interface DailyMeals {
  date: string
  breakfast: Meal | null
  lunch: Meal | null
  dinner: Meal | null
}

export interface WeeklyMealPlan {
  startDate: string
  endDate: string
  days: Array<{
    day: string
    date: string
    meals: DailyMeals
  }>
}
```

---

### Phase 2: Backend API (Jours 1-2)

#### 2.1. Routes API

**Fichier:** `server/src/routes/mealRoutes.js`

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

#### 2.2. Controller

**Fichier:** `server/src/controllers/mealController.js`

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

#### 2.3. Service Layer

**Fichier:** `server/src/services/mealService.js`

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
  // ...
}
```

#### 2.4. Repository Layer

**Fichier:** `server/src/repositories/mealRepository.js`

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

### Phase 3: Composables & State Management (Jour 2)

#### 3.1. Composable useMeals

**Fichier:** `client/composables/useMeals.ts`

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

#### 3.2. Pinia Store

**Fichier:** `client/stores/meal.ts`

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

### Phase 4: Composants Communs (Jours 3-4)

#### 4.1. AppHeader

**Fichier:** `client/components/common/AppHeader.vue`

```vue
<script setup lang="ts">
const props = defineProps<{
  showNavigation?: boolean
}>()

const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'Recipes', path: '/recipes' },
  { label: 'Grocery List', path: '/shopping-list' },
  { label: 'Settings', path: '/settings' }
]
</script>

<template>
  <header class="fixed top-0 w-full bg-white border-b border-neutral-200 z-50">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <img src="/icons/logo.svg" alt="MealPrep Logo" class="w-8 h-8" />
        <span class="text-xl font-bold">MealPrep</span>
      </div>

      <!-- Navigation Desktop -->
      <nav v-if="showNavigation" class="hidden md:flex gap-6">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          class="text-neutral-900 hover:text-primary transition"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Right Actions -->
      <div class="flex items-center gap-3">
        <button class="p-2 hover:bg-neutral-50 rounded-full">
          <span class="sr-only">Notifications</span>
          🔔
        </button>
        <button class="p-2 hover:bg-neutral-50 rounded-full">
          <span class="sr-only">Profile</span>
          👤
        </button>
      </div>
    </div>
  </header>
</template>
```

#### 4.2. MealCard (Mobile)

**Fichier:** `client/components/meal/MealCard.vue`

```vue
<script setup lang="ts">
import type { Meal } from '~/types/meal'

const props = defineProps<{
  meal: Meal | null
  mealType: 'breakfast' | 'lunch' | 'dinner'
}>()

const emit = defineEmits<{
  swap: [mealId: string]
  cook: [mealId: string]
}>()

const mealTypeLabels = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner'
}

const handleSwap = () => {
  if (props.meal) {
    emit('swap', props.meal.id)
  }
}

const handleCook = () => {
  if (props.meal) {
    emit('cook', props.meal.id)
  }
}
</script>

<template>
  <div class="bg-white rounded-card shadow-card overflow-hidden">
    <h3 class="text-lg font-semibold px-4 pt-4 pb-2">
      {{ mealTypeLabels[mealType] }}
    </h3>

    <div v-if="meal">
      <!-- Image -->
      <img
        :src="meal.recipe.imageUrl"
        :alt="meal.recipe.name"
        class="w-full h-48 object-cover"
      />

      <!-- Content -->
      <div class="p-4">
        <h4 class="text-base font-medium text-neutral-900 mb-4">
          {{ meal.recipe.name }}
        </h4>

        <!-- Actions -->
        <div class="flex gap-3">
          <button
            @click="handleSwap"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-primary-light text-primary rounded-button hover:bg-primary-light/10 transition"
          >
            <span>🔄</span>
            <span>Swap Meal</span>
          </button>

          <button
            @click="handleCook"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-button hover:bg-primary/90 transition"
          >
            <span>👨‍🍳</span>
            <span>Cook Now</span>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="p-8 text-center text-neutral-500">
      <p>Aucun repas planifié</p>
      <button class="mt-4 text-primary hover:underline">
        Ajouter un repas
      </button>
    </div>
  </div>
</template>
```

#### 4.3. MonthCalendar (Desktop)

**Fichier:** `client/components/meal/MonthCalendar.vue`

```vue
<script setup lang="ts">
const currentMonth = ref(new Date())
const selectedDate = ref(new Date())

const emit = defineEmits<{
  selectDate: [date: Date]
}>()

const monthName = computed(() => {
  return currentMonth.value.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
})

const daysInMonth = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const days = []

  // Jours du mois précédent
  const firstDayOfWeek = firstDay.getDay()
  const prevMonthDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

  for (let i = prevMonthDays; i > 0; i--) {
    const d = new Date(year, month, -i + 1)
    days.push({ date: d, isCurrentMonth: false })
  }

  // Jours du mois actuel
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const d = new Date(year, month, i)
    days.push({ date: d, isCurrentMonth: true })
  }

  return days
})

const isToday = (date: Date) => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const isSelected = (date: Date) => {
  return date.toDateString() === selectedDate.value.toDateString()
}

const previousMonth = () => {
  currentMonth.value = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() - 1
  )
}

const nextMonth = () => {
  currentMonth.value = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() + 1
  )
}

const selectDate = (date: Date) => {
  selectedDate.value = date
  emit('selectDate', date)
}
</script>

<template>
  <div class="bg-white rounded-card shadow-card p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <button
        @click="previousMonth"
        class="p-2 hover:bg-neutral-50 rounded-full"
      >
        ‹
      </button>

      <h2 class="text-lg font-semibold">{{ monthName }}</h2>

      <button
        @click="nextMonth"
        class="p-2 hover:bg-neutral-50 rounded-full"
      >
        ›
      </button>
    </div>

    <!-- Days of week -->
    <div class="grid grid-cols-7 gap-2 mb-2">
      <div
        v-for="day in ['S', 'M', 'T', 'W', 'T', 'F', 'S']"
        :key="day"
        class="text-center text-sm font-medium text-neutral-500"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar grid -->
    <div class="grid grid-cols-7 gap-2">
      <button
        v-for="(day, index) in daysInMonth"
        :key="index"
        @click="selectDate(day.date)"
        :class="[
          'aspect-square flex items-center justify-center rounded-full text-sm',
          day.isCurrentMonth ? 'text-neutral-900' : 'text-neutral-300',
          isToday(day.date) && 'bg-primary text-white font-bold',
          isSelected(day.date) && !isToday(day.date) && 'ring-2 ring-primary',
          'hover:bg-neutral-50 transition'
        ]"
      >
        {{ day.date.getDate() }}
      </button>
    </div>
  </div>
</template>
```

---

### Phase 5: Pages Principales (Jours 4-5)

#### 5.1. Page Index (Responsive)

**Fichier:** `client/pages/index.vue`

```vue
<script setup lang="ts">
const { fetchDailyMeals, fetchWeeklyMeals, dailyMeals, weeklyPlan, loading, swapMeal, markAsCooked } = useMeals()
const mealStore = useMealStore()

const isMobile = ref(false)

onMounted(async () => {
  // Détection mobile/desktop
  isMobile.value = window.innerWidth < 768

  if (isMobile.value) {
    await fetchDailyMeals()
  } else {
    await fetchWeeklyMeals()
  }

  // Responsive listener
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768
  })
})

const handleSwap = async (mealId: string) => {
  await swapMeal(mealId)
}

const handleCook = async (mealId: string) => {
  await markAsCooked(mealId)
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50">
    <AppHeader :show-navigation="!isMobile" />

    <!-- Mobile View: Daily Digest -->
    <div v-if="isMobile" class="pt-20 pb-24 px-4">
      <DailyDigest
        v-if="dailyMeals"
        :meals="dailyMeals"
        :loading="loading"
        @swap="handleSwap"
        @cook="handleCook"
      />
    </div>

    <!-- Desktop View: Weekly Plan -->
    <div v-else class="pt-20 container mx-auto px-4 py-8">
      <div class="grid grid-cols-12 gap-6">
        <!-- Left Column: Calendar -->
        <div class="col-span-4">
          <MonthCalendar @select-date="handleDateSelect" />

          <div class="mt-6">
            <QuickActions />
          </div>
        </div>

        <!-- Center Column: Weekly Plan -->
        <div class="col-span-5">
          <WeeklyMealPlan
            v-if="weeklyPlan"
            :plan="weeklyPlan"
            :loading="loading"
          />
        </div>

        <!-- Right Column: Upcoming Meals -->
        <div class="col-span-3">
          <UpcomingMeals />
        </div>
      </div>
    </div>

    <!-- Bottom Navigation (Mobile) -->
    <BottomNavigation v-if="isMobile" />
  </div>
</template>
```

---

### Phase 6: Tests (Jour 6)

#### 6.1. Tests Backend

**Fichier:** `server/tests/integration/mealController.test.js`

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
  })
})
```

#### 6.2. Tests Frontend (Composant)

**Fichier:** `client/components/meal/MealCard.test.ts`

```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import MealCard from './MealCard.vue'

describe('MealCard', () => {
  it('renders meal information correctly', () => {
    const meal = {
      id: '1',
      mealType: 'breakfast',
      recipe: {
        name: 'Oatmeal with Berries',
        imageUrl: '/images/oatmeal.jpg'
      }
    }

    const wrapper = mount(MealCard, {
      props: { meal, mealType: 'breakfast' }
    })

    expect(wrapper.text()).toContain('Oatmeal with Berries')
    expect(wrapper.find('img').attributes('src')).toBe('/images/oatmeal.jpg')
  })

  it('emits swap event when Swap Meal button is clicked', async () => {
    const meal = {
      id: '1',
      mealType: 'breakfast',
      recipe: { name: 'Oatmeal', imageUrl: '/test.jpg' }
    }

    const wrapper = mount(MealCard, {
      props: { meal, mealType: 'breakfast' }
    })

    await wrapper.find('button:first-of-type').trigger('click')

    expect(wrapper.emitted('swap')).toBeTruthy()
    expect(wrapper.emitted('swap')[0]).toEqual(['1'])
  })
})
```

---

## 🔄 Dépendances

### Dépendances Externes
- ✅ Design System configuré (Tailwind)
- ✅ Base de données avec schéma meal_plans et recipes
- ✅ Images de recettes disponibles dans `/public/images/recipes/`

### Dépendances Internes
- [ ] Issue #2 (Settings) - Optionnelle mais recommandée pour filtrer selon allergies
- [ ] Composant BottomNavigation (partagé avec autres pages)

---

## ⚡ Performance

### Optimisations Prévues
1. **Lazy loading des images** via Nuxt Image
2. **Cache API** : Mise en cache des repas quotidiens (5 min)
3. **Debounce** sur les actions swap/cook (éviter clics multiples)
4. **Prefetch** : Pré-charger les images des repas du lendemain

### Monitoring
- Temps de réponse API : < 100ms
- Temps de chargement page : < 500ms
- Core Web Vitals (LCP < 2.5s)

---

## ♿ Accessibilité

### Checklist
- [x] Textes alternatifs sur toutes les images
- [x] Contraste texte/fond > 4.5:1
- [x] Navigation au clavier (Tab, Enter, Espace)
- [x] Labels ARIA sur boutons d'action
- [x] Focus visible sur éléments interactifs
- [x] Structure sémantique HTML5

---

## 📝 Critères de Validation

### Mobile (Daily Digest)
- [ ] L'en-tête affiche le logo et les icônes
- [ ] La date du jour est affichée en orange
- [ ] Les 3 cartes de repas (Breakfast, Lunch, Dinner) sont visibles
- [ ] Les images des plats se chargent correctement
- [ ] Les boutons "Swap Meal" et "Cook Now" sont fonctionnels
- [ ] Le défilement est fluide
- [ ] Les placeholders s'affichent si pas de repas planifié

### Desktop (Weekly Plan)
- [ ] Le calendrier mensuel s'affiche avec le jour actuel en surbrillance
- [ ] Le tableau hebdomadaire affiche les repas de la semaine
- [ ] Les boutons "Quick Actions" sont présents et stylisés
- [ ] La section "Upcoming Meals" affiche les prochains repas
- [ ] Navigation entre les mois fonctionnelle
- [ ] Responsive: adapte layout selon taille écran

### API
- [ ] `GET /api/v1/meals/daily` retourne les repas du jour
- [ ] `GET /api/v1/meals/weekly` retourne le plan hebdomadaire
- [ ] `POST /api/v1/meals/swap` échange un repas avec succès
- [ ] `PUT /api/v1/meals/:id/cook` marque le repas comme cuisiné
- [ ] Gestion d'erreur si date invalide ou repas inexistant

---

## 🚀 Déploiement

### Environnement de Dev
```bash
# Terminal 1: Backend
cd server
npm run dev  # Port 3001

# Terminal 2: Frontend
cd client
npm run dev  # Port 3000
```

### Base de Données
Créer les données de test avec les seeds :
```bash
cd server
npm run seed:meals
```

---

## 📋 Checklist Finale

- [ ] **Backend** : Routes, controllers, services, repositories implémentés
- [ ] **Frontend** : Composants, pages, composables créés
- [ ] **Styling** : Tailwind configuré, design system appliqué
- [ ] **Tests** : Tests unitaires et intégration passent
- [ ] **Accessibilité** : Tests ARIA et navigation clavier
- [ ] **Performance** : Temps de chargement < 500ms
- [ ] **Documentation** : README mis à jour avec instructions

---

## 📚 Ressources

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vue 3 Composition API](https://vuejs.org/api/composition-api-setup.html)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

---

**Estimation totale:** 5-8 jours
**Priorité:** Haute (fondation de l'application)
**Risques:** Complexité du responsive design mobile/desktop
