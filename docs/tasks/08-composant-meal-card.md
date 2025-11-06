# Tâche 08 : Composant MealCard (Mobile)

**Phase:** 4
**Durée estimée:** 1 jour
**Dépendances:** Tâche 01 (Design System), Tâche 06 (Types)
**Issue:** #1 - Home Page

---

## 📋 Objectifs

Créer la carte de repas utilisée dans la vue mobile "Daily Digest".

---

## ✅ Actions à réaliser

### Composant MealCard

**Fichier:** `client/components/meal/MealCard.vue`

- [ ] Créer le fichier `MealCard.vue`
- [ ] Importer le type `Meal` : `import type { Meal } from '~/types/meal'`

- [ ] Définir les props :
  - `meal: Meal | null`
  - `mealType: 'breakfast' | 'lunch' | 'dinner'`

- [ ] Définir les événements émis :
  - `swap: [mealId: string]`
  - `cook: [mealId: string]`

- [ ] Créer un objet de labels pour les types de repas :
  - breakfast → "Breakfast"
  - lunch → "Lunch"
  - dinner → "Dinner"

- [ ] Créer les handlers :
  - `handleSwap()` : émet l'événement `swap` avec le meal.id
  - `handleCook()` : émet l'événement `cook` avec le meal.id

- [ ] Créer le template avec :
  - Titre du type de repas
  - Image du plat (si meal existe)
  - Nom de la recette
  - Deux boutons : "Swap Meal" et "Cook Now"
  - État vide si `meal === null`

- [ ] Appliquer les styles Tailwind :
  - Card blanche avec `rounded-card` et `shadow-card`
  - Bouton Swap : border primary, texte primary
  - Bouton Cook : background primary, texte blanc
  - Boutons avec `rounded-button`

**Code de référence:**

```vue
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
    <h3 class="text-lg font-semibold px-4 pt-4 pb-2">
      {{ mealTypeLabels[mealType] }}
    </h3>

    <div v-if="meal">
      <!-- Image -->
      <img
        :src="meal.recipe.imageUrl"
        :alt="meal.recipe.name"
        class="w-full h-48 object-cover"
      />

      <!-- Content -->
      <div class="p-4">
        <h4 class="text-base font-medium text-neutral-900 mb-4">
          {{ meal.recipe.name }}
        </h4>

        <!-- Actions -->
        <div class="flex gap-3">
          <button
            @click="handleSwap"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-primary-light text-primary rounded-button hover:bg-primary-light/10 transition"
          >
            <span>🔄</span>
            <span>Swap Meal</span>
          </button>

          <button
            @click="handleCook"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-button hover:bg-primary/90 transition"
          >
            <span>👨‍🍳</span>
            <span>Cook Now</span>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="p-8 text-center text-neutral-500">
      <p>Aucun repas planifié</p>
      <button class="mt-4 text-primary hover:underline">
        Ajouter un repas
      </button>
    </div>
  </div>
</template>
```

---

## ✓ Critères de validation

- [ ] Le composant affiche correctement le titre du type de repas
- [ ] L'image de la recette s'affiche avec les bonnes proportions
- [ ] Le nom de la recette est affiché
- [ ] Les boutons "Swap Meal" et "Cook Now" sont stylisés correctement
- [ ] Les événements `swap` et `cook` sont émis avec le bon ID
- [ ] L'état vide s'affiche quand `meal === null`
- [ ] Les boutons ont un effet hover
- [ ] Le composant est responsive et fonctionne sur mobile
- [ ] Les styles suivent le design system (rounded-card, colors, etc.)

---

## 📚 Ressources

- [Vue 3 Props & Emits](https://vuejs.org/guide/components/props.html)
- [Tailwind Flexbox](https://tailwindcss.com/docs/flex)
- [Vue Conditional Rendering](https://vuejs.org/guide/essentials/conditional.html)
