<script setup lang="ts">
const props = defineProps<{
  date: string // ISO format
}>()

const dayOfWeek = computed(() => {
  const d = new Date(props.date)
  return d.toLocaleDateString('en-US', { weekday: 'long' })
})

const formattedDate = computed(() => {
  const d = new Date(props.date)
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
})
</script>

<template>
  <div class="text-center py-6">
    <p class="text-sm text-neutral-600 font-medium uppercase tracking-wide mb-1">
      {{ dayOfWeek }}
    </p>
    <h1 class="text-3xl font-bold text-primary">
      {{ formattedDate }}
    </h1>
  </div>
</template>
