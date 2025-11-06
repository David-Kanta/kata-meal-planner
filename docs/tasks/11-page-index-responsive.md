# Tâche 11 : Page Index (Responsive)

**Phase:** 5
**Durée estimée:** 1 jour
**Dépendances:** Tâches 06-10 (Tous les composants)
**Issue:** #1 - Home Page

---

## 📋 Objectifs

Assembler tous les composants pour créer la page d'accueil responsive avec vue mobile (Daily Digest) et vue desktop (Weekly Plan).

---

## ✅ Actions à réaliser

### Page Index

**Fichier:** `client/pages/index.vue`

- [ ] Créer le fichier `index.vue`
- [ ] Importer tous les composants nécessaires
- [ ] Utiliser le composable `useMeals`
- [ ] Utiliser le store `useMealStore` (optionnel)

#### Setup & Data Loading

- [ ] Définir `isMobile: ref(false)`
- [ ] Dans `onMounted` :
  - Détecter mobile/desktop : `window.innerWidth < 768`
  - Charger les données appropriées (daily ou weekly)
  - Ajouter un listener resize pour le responsive

#### Handlers

- [ ] Créer `handleSwap(mealId)` qui appelle `swapMeal()`
- [ ] Créer `handleCook(mealId)` qui appelle `markAsCooked()`
- [ ] Créer `handleDateSelect(date)` pour le calendrier (optionnel)

#### Template

- [ ] Structure globale avec `min-h-screen bg-neutral-50`
- [ ] AppHeader fixe en haut
- [ ] Vue conditionnelle mobile (`v-if="isMobile"`) :
  - Padding top pour éviter le header fixe
  - Padding bottom pour la bottom navigation
  - DailyDigest avec les handlers
- [ ] Vue conditionnelle desktop (`v-else`) :
  - Layout en grille 12 colonnes
  - Colonne 1 (4 cols) : MonthCalendar + QuickActions
  - Colonne 2 (5 cols) : WeeklyMealPlan
  - Colonne 3 (3 cols) : UpcomingMeals
- [ ] BottomNavigation (mobile uniquement)

**Code de référence:**

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

const handleDateSelect = (date: Date) => {
  // Optionnel : charger les repas de cette date
  console.log('Date selected:', date)
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

## ✓ Critères de validation

### Vue Mobile
- [ ] L'AppHeader s'affiche sans navigation
- [ ] Le DailyDigest affiche les 3 repas du jour
- [ ] Les boutons Swap et Cook fonctionnent
- [ ] La BottomNavigation est fixée en bas
- [ ] Le scroll fonctionne correctement
- [ ] Pas de contenu masqué par le header/footer

### Vue Desktop
- [ ] L'AppHeader affiche la navigation complète
- [ ] Le layout en 3 colonnes s'affiche correctement
- [ ] Le MonthCalendar fonctionne
- [ ] Le WeeklyMealPlan affiche la semaine
- [ ] L'UpcomingMeals affiche les prochains repas
- [ ] Les QuickActions sont visibles
- [ ] Pas de BottomNavigation sur desktop

### Responsive
- [ ] Le passage mobile ↔ desktop fonctionne (resize)
- [ ] Les données sont rechargées si nécessaire
- [ ] Pas de glitch visuel lors du changement
- [ ] Le breakpoint est à 768px (md)

### Performance
- [ ] Les données sont chargées au montage
- [ ] Le loading state s'affiche pendant le chargement
- [ ] Les erreurs sont gérées gracieusement

---

## 📚 Ressources

- [Vue Lifecycle Hooks](https://vuejs.org/api/composition-api-lifecycle.html)
- [Tailwind Grid System](https://tailwindcss.com/docs/grid-template-columns)
- [Responsive Design with Tailwind](https://tailwindcss.com/docs/responsive-design)
