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

const mealTypeEmojis = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙'
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
    <h3 class="text-lg font-semibold px-4 pt-4 pb-2 text-neutral-900">
      <span class="mr-2">{{ mealTypeEmojis[mealType] }}</span>
      {{ mealTypeLabels[mealType] }}
    </h3>

    <div v-if="meal">
      <!-- Image -->
      <img
        :src="meal.recipe.imageUrl"
        :alt="meal.recipe.name"
        class="w-full h-48 object-cover"
        @error="($event.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Meal+Image'"
      />

      <!-- Content -->
      <div class="p-4">
        <h4 class="text-base font-medium text-neutral-900 mb-1">
          {{ meal.recipe.name }}
        </h4>
        <p class="text-sm text-neutral-600 mb-4 line-clamp-2">
          {{ meal.recipe.description }}
        </p>

        <!-- Time Info -->
        <div class="flex gap-3 text-xs text-neutral-500 mb-4">
          <div class="flex items-center gap-1">
            <span>⏱️</span>
            <span>Prep: {{ meal.recipe.prepTimeMinutes }}min</span>
          </div>
          <div class="flex items-center gap-1">
            <span>🔥</span>
            <span>Cook: {{ meal.recipe.cookTimeMinutes }}min</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <button
            @click="handleSwap"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-primary-light text-primary rounded-button hover:bg-primary-light/10 transition-colors"
          >
            <span>🔄</span>
            <span class="font-medium">Swap</span>
          </button>

          <button
            @click="handleCook"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-button hover:bg-primary/90 transition-colors"
          >
            <span>👨‍🍳</span>
            <span class="font-medium">Cook</span>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="p-8 text-center text-neutral-500">
      <div class="text-4xl mb-2">🍽️</div>
      <p class="mb-4">Aucun repas planifié</p>
      <button class="text-primary hover:underline font-medium">
        + Ajouter un repas
      </button>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
