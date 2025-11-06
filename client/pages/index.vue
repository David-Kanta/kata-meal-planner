<script setup lang="ts">
const {
  fetchDailyMeals,
  fetchWeeklyMeals,
  fetchUpcomingMeals,
  dailyMeals,
  weeklyPlan,
  upcomingMeals,
  loading,
  error,
  swapMeal,
  markAsCooked
} = useMeals()

const mealStore = useMealStore()
const isMobile = ref(false)

// Détection et chargement initial
onMounted(async () => {
  // Détection mobile/desktop
  isMobile.value = window.innerWidth < 768

  // Charger les données appropriées
  if (isMobile.value) {
    await fetchDailyMeals()
  } else {
    await fetchWeeklyMeals()
    await fetchUpcomingMeals(5)
  }

  // Listener pour le responsive
  const handleResize = () => {
    const wasMobile = isMobile.value
    isMobile.value = window.innerWidth < 768

    // Si on change de vue, recharger les données appropriées
    if (wasMobile !== isMobile.value) {
      if (isMobile.value) {
        fetchDailyMeals()
      } else {
        fetchWeeklyMeals()
        fetchUpcomingMeals(5)
      }
    }
  }

  window.addEventListener('resize', handleResize)

  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})

// Handlers
const handleSwap = async (mealId: string) => {
  try {
    await swapMeal(mealId)
    // Recharger les données après swap
    if (isMobile.value) {
      await fetchDailyMeals()
    } else {
      await fetchWeeklyMeals()
    }
  } catch (e) {
    console.error('Swap failed:', e)
  }
}

const handleCook = async (mealId: string) => {
  try {
    await markAsCooked(mealId)
    // Recharger les données après cook
    if (isMobile.value) {
      await fetchDailyMeals()
    } else {
      await fetchWeeklyMeals()
    }
  } catch (e) {
    console.error('Mark as cooked failed:', e)
  }
}

const handleDateSelect = async (date: Date) => {
  const dateStr = date.toISOString().split('T')[0]
  mealStore.setCurrentDate(dateStr)
  await fetchDailyMeals(dateStr)
}

const handleQuickAction = (action: string) => {
  console.log('Quick action:', action)
  // TODO: Implémenter les actions rapides
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50">
    <AppHeader :show-navigation="!isMobile" />

    <!-- Error Display (Global) -->
    <div
      v-if="error"
      class="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 max-w-md w-full mx-4"
    >
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-card shadow-lg">
        <div class="flex items-center gap-2">
          <span class="text-xl">⚠️</span>
          <span class="font-medium">{{ error }}</span>
        </div>
      </div>
    </div>

    <!-- Mobile View: Daily Digest -->
    <div v-if="isMobile" class="pt-20 pb-24 px-4">
      <DailyDigest
        :meals="dailyMeals"
        :loading="loading"
        @swap="handleSwap"
        @cook="handleCook"
      />
    </div>

    <!-- Desktop View: Weekly Plan -->
    <div v-else class="pt-20 pb-8">
      <div class="container mx-auto px-6 py-8">
        <div class="grid grid-cols-12 gap-6">
          <!-- Left Column: Calendar & Quick Actions -->
          <div class="col-span-3 space-y-6">
            <MonthCalendar @select-date="handleDateSelect" />
            <QuickActions
              @add-meal="handleQuickAction('add')"
              @regenerate-week="handleQuickAction('regenerate')"
              @view-shopping-list="handleQuickAction('shopping')"
            />
          </div>

          <!-- Center Column: Weekly Plan -->
          <div class="col-span-6">
            <WeeklyMealPlan
              :plan="weeklyPlan"
              :loading="loading"
            />
          </div>

          <!-- Right Column: Upcoming Meals -->
          <div class="col-span-3">
            <UpcomingMeals
              :meals="upcomingMeals"
              :loading="loading"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation (Mobile only) -->
    <BottomNavigation v-if="isMobile" />
  </div>
</template>
