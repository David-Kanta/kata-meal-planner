<script setup lang="ts">
import type { DailyMeals } from '~/types/meal'

const props = defineProps<{
  meals: DailyMeals | null
  loading?: boolean
}>()

const emit = defineEmits<{
  swap: [mealId: string]
  cook: [mealId: string]
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- Section Title: Daily Digest -->
    <div class="text-center">
      <h1 class="text-2xl font-bold text-neutral-900 mb-2">Daily Digest</h1>
      <DateDisplay v-if="meals" :date="meals.date" />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="text-center">
        <div class="text-4xl mb-2">⏳</div>
        <p class="text-neutral-600">Chargement des repas...</p>
      </div>
    </div>

    <!-- Meal Cards -->
    <div v-else-if="meals" class="space-y-3">
      <MealCard
        :meal="meals.breakfast"
        meal-type="breakfast"
        @swap="emit('swap', $event)"
        @cook="emit('cook', $event)"
      />
      <MealCard
        :meal="meals.lunch"
        meal-type="lunch"
        @swap="emit('swap', $event)"
        @cook="emit('cook', $event)"
      />
      <MealCard
        :meal="meals.dinner"
        meal-type="dinner"
        @swap="emit('swap', $event)"
        @cook="emit('cook', $event)"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="text-4xl mb-2">📭</div>
      <p class="text-neutral-600">Aucun repas disponible</p>
    </div>
  </div>
</template>
