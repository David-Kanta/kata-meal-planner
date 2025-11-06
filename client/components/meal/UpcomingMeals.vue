<script setup lang="ts">
import type { Meal } from '~/types/meal'

const props = defineProps<{
  meals: Meal[]
  loading?: boolean
}>()

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

const mealTypeEmojis = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙'
}
</script>

<template>
  <div class="bg-white rounded-card shadow-card p-6">
    <h3 class="text-lg font-semibold text-neutral-900 mb-4">
      ⏭️ Upcoming Meals
    </h3>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-6">
      <div class="text-2xl mb-2">⏳</div>
      <p class="text-sm text-neutral-600">Chargement...</p>
    </div>

    <!-- Meals List -->
    <div v-else-if="meals.length > 0" class="space-y-3">
      <div
        v-for="meal in meals"
        :key="meal.id"
        class="border border-neutral-200 rounded-card p-3 hover:bg-neutral-50 transition-colors cursor-pointer"
      >
        <div class="flex items-start gap-3">
          <div class="text-2xl">
            {{ mealTypeEmojis[meal.mealType] }}
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="font-medium text-sm text-neutral-900 truncate">
              {{ meal.recipe.name }}
            </h4>
            <p class="text-xs text-neutral-500 mt-1">
              {{ formatDate(meal.date) }} · {{ meal.mealType }}
            </p>
            <div class="flex gap-2 text-xs text-neutral-500 mt-1">
              <span>⏱️ {{ meal.recipe.prepTimeMinutes + meal.recipe.cookTimeMinutes }}min</span>
            </div>
          </div>
        </div>
      </div>

      <!-- View All Button -->
      <button class="w-full mt-4 py-2 text-sm font-medium text-primary hover:underline">
        View All →
      </button>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-6">
      <div class="text-2xl mb-2">📭</div>
      <p class="text-sm text-neutral-600">Aucun repas à venir</p>
    </div>
  </div>
</template>
