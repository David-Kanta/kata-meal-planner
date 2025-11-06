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

const route = useRoute()

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <header class="fixed top-0 w-full bg-white border-b border-neutral-200 z-50">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 hover:opacity-80 transition">
        <img src="/icons/logo.svg" alt="MealPrep Logo" class="w-8 h-8" />
        <span class="text-xl font-bold text-neutral-900">MealPrep</span>
      </NuxtLink>

      <!-- Navigation Desktop -->
      <nav v-if="showNavigation" class="hidden md:flex gap-6">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'text-neutral-700 hover:text-primary transition-colors font-medium',
            isActive(item.path) && 'text-primary'
          ]"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Right Actions -->
      <div class="flex items-center gap-3">
        <button
          class="p-2 hover:bg-neutral-50 rounded-full transition-colors"
          aria-label="Notifications"
        >
          <span class="text-xl">🔔</span>
          <span class="sr-only">Notifications</span>
        </button>
        <button
          class="p-2 hover:bg-neutral-50 rounded-full transition-colors"
          aria-label="Profile"
        >
          <span class="text-xl">👤</span>
          <span class="sr-only">Profile</span>
        </button>
      </div>
    </div>
  </header>
</template>
