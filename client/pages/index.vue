<script setup lang="ts">
const { dailyMeals, weeklyPlan, upcomingMeals, loading, error, fetchDailyMeals, fetchWeeklyMeals, fetchUpcomingMeals, swapMeal, markAsCooked } = useMeals()
const mealStore = useMealStore()

// Charger les données au montage
onMounted(async () => {
  await fetchDailyMeals()
  await fetchUpcomingMeals(3)
})

// Test swap meal
const handleSwap = async (mealId: string) => {
  try {
    await swapMeal(mealId)
    console.log('✅ Meal swapped successfully!')
  } catch (e) {
    console.error('❌ Swap failed:', e)
  }
}

// Test mark as cooked
const handleMarkCooked = async (mealId: string) => {
  try {
    await markAsCooked(mealId)
    console.log('✅ Meal marked as cooked!')
  } catch (e) {
    console.error('❌ Mark as cooked failed:', e)
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 pb-20 md:pb-8">
    <AppHeader :show-navigation="true" />
    <BottomNavigation />

    <div class="pt-24 px-8 pb-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-primary mb-8">
          🍽️ MealPlanner - API Test
        </h1>

      <!-- Error Display -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-card mb-6">
        ❌ {{ error }}
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-card mb-6">
        ⏳ Chargement en cours...
      </div>

      <!-- Daily Meals -->
      <div class="bg-white rounded-card shadow-card p-6 mb-6">
        <h2 class="text-2xl font-semibold mb-4">📅 Repas du jour</h2>

        <div v-if="dailyMeals">
          <p class="text-neutral-600 mb-4">Date: {{ dailyMeals.date }}</p>
          <div class="text-sm text-neutral-500 mb-4">
            Store - Meals today: {{ mealStore.todaysMealCount }} / Has meals: {{ mealStore.hasMealsForToday }}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MealCard
              :meal="dailyMeals.breakfast"
              meal-type="breakfast"
              @swap="handleSwap"
              @cook="handleMarkCooked"
            />
            <MealCard
              :meal="dailyMeals.lunch"
              meal-type="lunch"
              @swap="handleSwap"
              @cook="handleMarkCooked"
            />
            <MealCard
              :meal="dailyMeals.dinner"
              meal-type="dinner"
              @swap="handleSwap"
              @cook="handleMarkCooked"
            />
          </div>
        </div>
        <div v-else class="text-neutral-400">
          Aucune donnée chargée
        </div>
      </div>

      <!-- Upcoming Meals -->
      <div class="bg-white rounded-card shadow-card p-6">
        <h2 class="text-2xl font-semibold mb-4">⏭️ Prochains repas</h2>

        <div v-if="upcomingMeals.length > 0" class="space-y-3">
          <div
            v-for="meal in upcomingMeals"
            :key="meal.id"
            class="border border-neutral-200 rounded-card p-3"
          >
            <div class="flex justify-between items-start">
              <div>
                <p class="font-medium">{{ meal.recipe.name }}</p>
                <p class="text-xs text-neutral-500">{{ meal.date }} - {{ meal.mealType }}</p>
              </div>
              <span class="text-xs px-2 py-1 bg-neutral-100 rounded">
                {{ meal.recipe.prepTimeMinutes + meal.recipe.cookTimeMinutes }}min
              </span>
            </div>
          </div>
        </div>
        <div v-else class="text-neutral-400">
          Aucun repas à venir
        </div>
      </div>

      <!-- DailyDigest Component Test (Mobile) -->
      <div class="mt-6">
        <h2 class="text-2xl font-semibold mb-4">📱 DailyDigest (Mobile View)</h2>
        <DailyDigest
          :meals="dailyMeals"
          :loading="loading"
          @swap="handleSwap"
          @cook="handleMarkCooked"
        />
      </div>

      <!-- Calendar Test -->
      <div class="mt-6">
        <h2 class="text-2xl font-semibold mb-4">📆 Calendrier (Desktop)</h2>
        <MonthCalendar
          @select-date="(date: Date) => {
            console.log('Date selected:', date)
            mealStore.setCurrentDate(date.toISOString().split('T')[0])
            fetchDailyMeals(date.toISOString().split('T')[0])
          }"
        />
      </div>

      <!-- WeeklyMealPlan Component Test (Desktop) -->
      <div class="mt-6">
        <h2 class="text-2xl font-semibold mb-4">🗓️ WeeklyMealPlan (Desktop View)</h2>
        <WeeklyMealPlan :plan="weeklyPlan" :loading="loading" />
      </div>

      <!-- UpcomingMeals & QuickActions Test (Desktop Sidebar) -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <UpcomingMeals :meals="upcomingMeals" :loading="loading" />
        <QuickActions
          @add-meal="console.log('Add meal')"
          @regenerate-week="console.log('Regenerate week')"
          @view-shopping-list="console.log('View shopping list')"
        />
      </div>

      <!-- Test Actions -->
      <div class="bg-white rounded-card shadow-card p-6 mt-6">
        <h2 class="text-2xl font-semibold mb-4">🧪 Actions de test</h2>
        <div class="flex gap-3">
          <button
            @click="fetchDailyMeals()"
            class="px-4 py-2 bg-primary text-white rounded-button hover:bg-primary/90"
          >
            🔄 Recharger Daily
          </button>
          <button
            @click="fetchWeeklyMeals()"
            class="px-4 py-2 bg-primary-light text-neutral-900 rounded-button hover:bg-primary-light/80"
          >
            📅 Charger Weekly
          </button>
          <button
            @click="fetchUpcomingMeals(5)"
            class="px-4 py-2 border-2 border-primary text-primary rounded-button hover:bg-primary/10"
          >
            ⏭️ Charger Upcoming
          </button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
