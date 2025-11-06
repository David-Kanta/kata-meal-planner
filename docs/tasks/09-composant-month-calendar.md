# Tâche 09 : Composant MonthCalendar (Desktop)

**Phase:** 4
**Durée estimée:** 1 jour
**Dépendances:** Tâche 01 (Design System)
**Issue:** #1 - Home Page

---

## 📋 Objectifs

Créer le composant calendrier mensuel pour la vue desktop.

---

## ✅ Actions à réaliser

### Composant MonthCalendar

**Fichier:** `client/components/meal/MonthCalendar.vue`

- [ ] Créer le fichier `MonthCalendar.vue`

- [ ] Définir les refs :
  - `currentMonth: ref(new Date())` (mois actuellement affiché)
  - `selectedDate: ref(new Date())` (date sélectionnée)

- [ ] Définir l'événement émis :
  - `selectDate: [date: Date]`

- [ ] Créer les computed :
  - `monthName` : retourne le nom du mois et l'année (ex: "November 2025")
  - `daysInMonth` : calcule tous les jours à afficher (avec jours du mois précédent pour compléter)

- [ ] Créer les fonctions :
  - `isToday(date)` : vérifie si une date est aujourd'hui
  - `isSelected(date)` : vérifie si une date est sélectionnée
  - `previousMonth()` : navigue vers le mois précédent
  - `nextMonth()` : navigue vers le mois suivant
  - `selectDate(date)` : sélectionne une date et émet l'événement

- [ ] Créer le template avec :
  - Header avec navigation (< Mois/Année >)
  - Ligne des jours de la semaine (S, M, T, W, T, F, S)
  - Grille calendrier 7x6 avec les dates
  - Styles conditionnels pour aujourd'hui et date sélectionnée

**Code de référence:**

```vue
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

  const days = []

  // Jours du mois précédent
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
        class="p-2 hover:bg-neutral-50 rounded-full"
      >
        ‹
      </button>

      <h2 class="text-lg font-semibold">{{ monthName }}</h2>

      <button
        @click="nextMonth"
        class="p-2 hover:bg-neutral-50 rounded-full"
      >
        ›
      </button>
    </div>

    <!-- Days of week -->
    <div class="grid grid-cols-7 gap-2 mb-2">
      <div
        v-for="day in ['S', 'M', 'T', 'W', 'T', 'F', 'S']"
        :key="day"
        class="text-center text-sm font-medium text-neutral-500"
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
          'aspect-square flex items-center justify-center rounded-full text-sm',
          day.isCurrentMonth ? 'text-neutral-900' : 'text-neutral-300',
          isToday(day.date) && 'bg-primary text-white font-bold',
          isSelected(day.date) && !isToday(day.date) && 'ring-2 ring-primary',
          'hover:bg-neutral-50 transition'
        ]"
      >
        {{ day.date.getDate() }}
      </button>
    </div>
  </div>
</template>
```

---

## ✓ Critères de validation

- [ ] Le calendrier affiche le mois et l'année actuels
- [ ] Les boutons de navigation (< >) changent de mois
- [ ] La grille affiche tous les jours du mois
- [ ] Les jours du mois précédent sont affichés en gris
- [ ] Aujourd'hui est surligné avec `bg-primary`
- [ ] La date sélectionnée a un ring autour
- [ ] Cliquer sur une date émet l'événement `selectDate`
- [ ] Le calendrier commence le lundi (première colonne)
- [ ] Les effets hover fonctionnent
- [ ] Le composant est visuellement propre et aligné

---

## 📚 Ressources

- [JavaScript Date API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Vue Computed Properties](https://vuejs.org/guide/essentials/computed.html)
- [Tailwind Grid](https://tailwindcss.com/docs/grid-template-columns)
