<script setup lang="ts">
const emit = defineEmits<{
  addMeal: []
  regenerateWeek: []
  viewShoppingList: []
}>()

const actions = [
  {
    icon: '➕',
    label: 'Add Recipe',
    event: 'addMeal',
    color: 'border-2 border-primary-light text-primary hover:bg-primary-light/10'
  },
  {
    icon: '📅',
    label: 'Create Meal Plan',
    event: 'regenerateWeek',
    color: 'border-2 border-primary-light text-primary hover:bg-primary-light/10'
  },
  {
    icon: '📋',
    label: 'Generate Grocery List',
    event: 'viewShoppingList',
    color: 'border-2 border-primary-light text-primary hover:bg-primary-light/10'
  }
]
</script>

<template>
  <div class="bg-white rounded-card shadow-card p-6">
    <h3 class="text-lg font-semibold text-neutral-900 mb-4">
      ⚡ Quick Actions
    </h3>

    <div class="space-y-3">
      <button
        v-for="action in actions"
        :key="action.event"
        @click="emit(action.event as any)"
        :class="[
          'w-full flex items-center justify-center gap-3 px-4 py-3 rounded-button font-medium transition-all',
          action.color
        ]"
      >
        <span class="text-xl">{{ action.icon }}</span>
        <span>{{ action.label }}</span>
      </button>
    </div>
  </div>
</template>
