<script setup lang="ts">
const currentMonth = ref(new Date())
const selectedDate = ref(new Date())

const emit = defineEmits<{
  selectDate: [date: Date]
}>()

const monthName = computed(() => {
  return currentMonth.value.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
})

const daysInMonth = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const days: Array<{ date: Date; isCurrentMonth: boolean }> = []

  // Jours du mois précédent pour compléter la première semaine
  // La semaine commence le lundi (1), donc on ajuste
  const firstDayOfWeek = firstDay.getDay()
  const prevMonthDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

  for (let i = prevMonthDays; i > 0; i--) {
    const d = new Date(year, month, -i + 1)
    days.push({ date: d, isCurrentMonth: false })
  }

  // Jours du mois actuel
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const d = new Date(year, month, i)
    days.push({ date: d, isCurrentMonth: true })
  }

  // Jours du mois suivant pour compléter la grille (optionnel)
  const remainingDays = 42 - days.length // 6 semaines * 7 jours
  for (let i = 1; i <= remainingDays; i++) {
    const d = new Date(year, month + 1, i)
    days.push({ date: d, isCurrentMonth: false })
  }

  return days
})

const isToday = (date: Date) => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const isSelected = (date: Date) => {
  return date.toDateString() === selectedDate.value.toDateString()
}

const previousMonth = () => {
  currentMonth.value = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() - 1
  )
}

const nextMonth = () => {
  currentMonth.value = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() + 1
  )
}

const selectDate = (date: Date) => {
  selectedDate.value = date
  emit('selectDate', date)
}
</script>

<template>
  <div class="bg-white rounded-card shadow-card p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <button
        @click="previousMonth"
        class="p-2 hover:bg-neutral-100 rounded-full transition-colors"
        aria-label="Previous month"
      >
        <span class="text-2xl text-neutral-700">‹</span>
      </button>

      <h2 class="text-lg font-semibold text-neutral-900">{{ monthName }}</h2>

      <button
        @click="nextMonth"
        class="p-2 hover:bg-neutral-100 rounded-full transition-colors"
        aria-label="Next month"
      >
        <span class="text-2xl text-neutral-700">›</span>
      </button>
    </div>

    <!-- Days of week (start Monday) -->
    <div class="grid grid-cols-7 gap-2 mb-2">
      <div
        v-for="day in ['M', 'T', 'W', 'T', 'F', 'S', 'S']"
        :key="day"
        class="text-center text-sm font-semibold text-neutral-500"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar grid -->
    <div class="grid grid-cols-7 gap-2">
      <button
        v-for="(day, index) in daysInMonth"
        :key="index"
        @click="selectDate(day.date)"
        :class="[
          'aspect-square flex items-center justify-center rounded-full text-sm transition-all',
          day.isCurrentMonth ? 'text-neutral-900 hover:bg-neutral-100' : 'text-neutral-300',
          isToday(day.date) && 'bg-primary text-white font-bold hover:bg-primary/90',
          isSelected(day.date) && !isToday(day.date) && 'ring-2 ring-primary ring-offset-1',
        ]"
        :aria-label="`Select ${day.date.toLocaleDateString()}`"
      >
        {{ day.date.getDate() }}
      </button>
    </div>

    <!-- Legend -->
    <div class="flex gap-4 mt-6 text-xs text-neutral-600">
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 rounded-full bg-primary"></div>
        <span>Today</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 rounded-full border-2 border-primary"></div>
        <span>Selected</span>
      </div>
    </div>
  </div>
</template>
