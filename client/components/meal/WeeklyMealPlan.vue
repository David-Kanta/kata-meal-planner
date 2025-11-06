<script setup lang="ts">
import type { WeeklyMealPlan } from '~/types/meal'

const props = defineProps<{
  plan: WeeklyMealPlan | null
  loading?: boolean
}>()

const mealTypes = ['breakfast', 'lunch', 'dinner'] as const

const getMealForDay = (dayIndex: number, mealType: string) => {
  if (!props.plan) return null
  const day = props.plan.days[dayIndex]
  if (!day) return null
  return day.meals[mealType as keyof typeof day.meals]
}
</script>

<template>
  <div class="bg-white rounded-card shadow-card p-6">
    <h2 class="text-2xl font-bold text-neutral-900 mb-6">
      📅 This Week's Meal Plan
    </h2>

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
            <th class="border border-neutral-200 p-3 bg-neutral-50 text-left font-semibold text-sm">
              Meal
            </th>
            <th
              v-for="day in plan.days"
              :key="day.date"
              class="border border-neutral-200 p-3 bg-neutral-50 text-center font-semibold text-sm"
            >
              <div>{{ day.day }}</div>
              <div class="text-xs text-neutral-500 font-normal">
                {{ new Date(day.date).getDate() }}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mealType in mealTypes" :key="mealType">
            <td class="border border-neutral-200 p-3 font-medium text-sm capitalize bg-neutral-50">
              {{ mealType }}
            </td>
            <td
              v-for="(day, dayIndex) in plan.days"
              :key="day.date"
              class="border border-neutral-200 p-3 text-sm hover:bg-neutral-50 transition-colors"
            >
              <div v-if="getMealForDay(dayIndex, mealType)" class="text-center">
                <p class="font-medium text-neutral-900">
                  {{ getMealForDay(dayIndex, mealType)?.recipe.name }}
                </p>
                <p class="text-xs text-neutral-500 mt-1">
                  {{ getMealForDay(dayIndex, mealType)?.recipe.prepTimeMinutes + getMealForDay(dayIndex, mealType)?.recipe.cookTimeMinutes }}min
                </p>
              </div>
              <div v-else class="text-center text-neutral-400 text-xs">
                -
              </div>
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
