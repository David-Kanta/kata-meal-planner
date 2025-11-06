<script setup lang="ts">
import type { WeeklyMealPlan } from '~/types/meal'

const props = defineProps<{
  plan: WeeklyMealPlan | null
  loading?: boolean
}>()

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const startFormatted = start.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  })

  const endFormatted = end.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return `${startFormatted} – ${endFormatted}`
}
</script>

<template>
  <div class="bg-white rounded-card shadow-card p-6">
    <!-- Header with date range -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-neutral-900">
        This Week's Meal Plan
      </h2>
      <p v-if="plan" class="text-sm text-neutral-600 mt-1">
        {{ formatDateRange(plan.startDate, plan.endDate) }}
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="text-center">
        <div class="text-4xl mb-2">⏳</div>
        <p class="text-neutral-600">Chargement du planning...</p>
      </div>
    </div>

    <!-- Weekly Table -->
    <div v-else-if="plan" class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="border border-neutral-200 p-3 bg-neutral-50 text-left font-semibold text-sm w-32">
              Day
            </th>
            <th class="border border-neutral-200 p-3 bg-neutral-50 text-left font-semibold text-sm">
              Breakfast
            </th>
            <th class="border border-neutral-200 p-3 bg-neutral-50 text-left font-semibold text-sm">
              Lunch
            </th>
            <th class="border border-neutral-200 p-3 bg-neutral-50 text-left font-semibold text-sm">
              Dinner
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(day, dayIndex) in plan.days" :key="day.date" class="hover:bg-neutral-50/50 transition-colors">
            <td class="border border-neutral-200 p-3 font-medium text-sm bg-neutral-50">
              <div>{{ day.day }}</div>
              <div class="text-xs text-neutral-500 font-normal">
                {{ formatDate(day.date) }}
              </div>
            </td>
            <td class="border border-neutral-200 p-3 text-sm">
              <div v-if="day.meals.breakfast">
                <p class="font-medium text-primary">
                  {{ day.meals.breakfast.recipe.name }}
                </p>
              </div>
              <div v-else class="text-neutral-400 text-xs">-</div>
            </td>
            <td class="border border-neutral-200 p-3 text-sm">
              <div v-if="day.meals.lunch">
                <p class="font-medium text-primary">
                  {{ day.meals.lunch.recipe.name }}
                </p>
              </div>
              <div v-else class="text-neutral-400 text-xs">-</div>
            </td>
            <td class="border border-neutral-200 p-3 text-sm">
              <div v-if="day.meals.dinner">
                <p class="font-medium text-primary">
                  {{ day.meals.dinner.recipe.name }}
                </p>
              </div>
              <div v-else class="text-neutral-400 text-xs">-</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="text-4xl mb-2">📭</div>
      <p class="text-neutral-600">Aucun planning disponible</p>
    </div>
  </div>
</template>
