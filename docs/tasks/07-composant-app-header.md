# Tâche 07 : Composant AppHeader

**Phase:** 4
**Durée estimée:** 0.5 jour
**Dépendances:** Tâche 01 (Design System)
**Issue:** #1 - Home Page

---

## 📋 Objectifs

Créer le composant header de l'application avec logo, navigation et actions.

---

## ✅ Actions à réaliser

### Composant AppHeader

**Fichier:** `client/components/common/AppHeader.vue`

- [ ] Créer le fichier `AppHeader.vue`
- [ ] Définir les props :
  - `showNavigation?: boolean` (optionnel, pour afficher/masquer la nav)

- [ ] Définir les items de navigation dans un tableau :
  - Home (`/`)
  - Recipes (`/recipes`)
  - Grocery List (`/shopping-list`)
  - Settings (`/settings`)

- [ ] Créer le template avec :
  - Header fixe en haut avec border
  - Logo + nom "MealPrep" à gauche
  - Navigation desktop (masquée sur mobile)
  - Actions à droite (notifications + profil)

- [ ] Appliquer les styles Tailwind :
  - `fixed top-0 w-full`
  - `bg-white border-b border-neutral-200`
  - `h-16` pour la hauteur
  - Navigation cachée sur mobile : `hidden md:flex`
  - Hover states pour les liens

**Code de référence:**

```vue
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
</script>

<template>
  <header class="fixed top-0 w-full bg-white border-b border-neutral-200 z-50">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <img src="/icons/logo.svg" alt="MealPrep Logo" class="w-8 h-8" />
        <span class="text-xl font-bold">MealPrep</span>
      </div>

      <!-- Navigation Desktop -->
      <nav v-if="showNavigation" class="hidden md:flex gap-6">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          class="text-neutral-900 hover:text-primary transition"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Right Actions -->
      <div class="flex items-center gap-3">
        <button class="p-2 hover:bg-neutral-50 rounded-full">
          <span class="sr-only">Notifications</span>
          🔔
        </button>
        <button class="p-2 hover:bg-neutral-50 rounded-full">
          <span class="sr-only">Profile</span>
          👤
        </button>
      </div>
    </div>
  </header>
</template>
```

---

## ✓ Critères de validation

- [ ] Le header est fixé en haut de la page
- [ ] Le logo et le nom "MealPrep" sont affichés
- [ ] La navigation s'affiche uniquement sur desktop quand `showNavigation=true`
- [ ] Les liens de navigation fonctionnent avec NuxtLink
- [ ] Les boutons d'action (notifications, profil) ont un effet hover
- [ ] Le header a un z-index élevé pour rester au-dessus du contenu
- [ ] L'accessibilité est respectée (sr-only pour les icônes)
- [ ] Le composant est responsive (navigation cachée sur mobile)

---

## 📚 Ressources

- [Tailwind Flexbox](https://tailwindcss.com/docs/flex)
- [NuxtLink Component](https://nuxt.com/docs/api/components/nuxt-link)
- [Accessibility Best Practices](https://www.w3.org/WAI/WCAG21/quickref/)
