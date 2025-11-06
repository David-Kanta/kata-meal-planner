<script setup lang="ts">
const route = useRoute()

const navItems = [
  { label: 'Home', path: '/', icon: '🏠' },
  { label: 'Recipes', path: '/recipes', icon: '📖' },
  { label: 'Grocery', path: '/shopping-list', icon: '🛒' },
  { label: 'Settings', path: '/settings', icon: '⚙️' }
]

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-50">
    <div class="grid grid-cols-4 h-16">
      <NuxtLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        :class="[
          'flex flex-col items-center justify-center gap-1 transition-colors',
          isActive(item.path) ? 'text-primary' : 'text-neutral-500 hover:text-neutral-700'
        ]"
      >
        <span class="text-xl">{{ item.icon }}</span>
        <span class="text-xs font-medium">{{ item.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>
