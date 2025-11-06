# Tâche 13 : Tests Frontend

**Phase:** 6
**Durée estimée:** 1 jour
**Dépendances:** Tâches 07-11 (Frontend complet)
**Issue:** #1 - Home Page

---

## 📋 Objectifs

Créer les tests unitaires pour les composants Vue et le composable `useMeals`.

---

## ✅ Actions à réaliser

### 1. Tests du Composant MealCard

**Fichier:** `client/components/meal/MealCard.test.ts`

- [ ] Installer les dépendances de test si nécessaire :
  - `@vue/test-utils`
  - `vitest` (recommandé pour Nuxt 3)

- [ ] Créer le fichier de test

#### Tests à implémenter

- [ ] Test : affiche les informations du repas correctement
  - Monter le composant avec des données mock
  - Vérifier que le nom de la recette est affiché
  - Vérifier que l'image a le bon `src`
  - Vérifier que le titre du type de repas est correct

- [ ] Test : émet l'événement `swap` quand on clique sur "Swap Meal"
  - Cliquer sur le premier bouton
  - Vérifier que l'événement `swap` est émis
  - Vérifier que l'ID du repas est passé

- [ ] Test : émet l'événement `cook` quand on clique sur "Cook Now"
  - Cliquer sur le second bouton
  - Vérifier que l'événement `cook` est émis

- [ ] Test : affiche l'état vide quand meal === null
  - Monter avec `meal: null`
  - Vérifier que le message "Aucun repas planifié" s'affiche

**Code de référence:**

```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import MealCard from './MealCard.vue'

describe('MealCard', () => {
  const mockMeal = {
    id: '1',
    date: '2025-11-06',
    mealType: 'breakfast',
    recipe: {
      id: 'r1',
      name: 'Oatmeal with Berries',
      description: 'Healthy breakfast',
      imageUrl: '/images/oatmeal.jpg',
      prepTimeMinutes: 5,
      cookTimeMinutes: 10
    }
  }

  it('renders meal information correctly', () => {
    const wrapper = mount(MealCard, {
      props: { meal: mockMeal, mealType: 'breakfast' }
    })

    expect(wrapper.text()).toContain('Oatmeal with Berries')
    expect(wrapper.text()).toContain('Breakfast')
    expect(wrapper.find('img').attributes('src')).toBe('/images/oatmeal.jpg')
  })

  it('emits swap event when Swap Meal button is clicked', async () => {
    const wrapper = mount(MealCard, {
      props: { meal: mockMeal, mealType: 'breakfast' }
    })

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')

    expect(wrapper.emitted('swap')).toBeTruthy()
    expect(wrapper.emitted('swap')![0]).toEqual(['1'])
  })

  it('emits cook event when Cook Now button is clicked', async () => {
    const wrapper = mount(MealCard, {
      props: { meal: mockMeal, mealType: 'breakfast' }
    })

    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')

    expect(wrapper.emitted('cook')).toBeTruthy()
    expect(wrapper.emitted('cook')![0]).toEqual(['1'])
  })

  it('displays empty state when meal is null', () => {
    const wrapper = mount(MealCard, {
      props: { meal: null, mealType: 'breakfast' }
    })

    expect(wrapper.text()).toContain('Aucun repas planifié')
  })
})
```

---

### 2. Tests du Composable useMeals

**Fichier:** `client/composables/useMeals.test.ts`

- [ ] Créer le fichier de test
- [ ] Mocker les appels `$fetch`

#### Tests à implémenter

- [ ] Test : `fetchDailyMeals` charge les données correctement
  - Mocker la réponse de l'API
  - Appeler `fetchDailyMeals()`
  - Vérifier que `dailyMeals.value` est mis à jour
  - Vérifier que `loading` passe à `false`

- [ ] Test : `fetchDailyMeals` gère les erreurs
  - Mocker une erreur API
  - Appeler `fetchDailyMeals()`
  - Vérifier que `error.value` contient un message

- [ ] Test : `swapMeal` appelle l'API et rafraîchit les données
  - Mocker l'endpoint `/swap`
  - Mocker l'endpoint `/daily`
  - Appeler `swapMeal('meal-123')`
  - Vérifier que les deux endpoints sont appelés

---

### 3. Tests du Composant MonthCalendar

**Fichier:** `client/components/meal/MonthCalendar.test.ts`

#### Tests à implémenter

- [ ] Test : affiche le mois actuel par défaut
  - Vérifier que le titre contient le mois et l'année actuels

- [ ] Test : navigue vers le mois précédent
  - Cliquer sur le bouton "<"
  - Vérifier que le mois a changé

- [ ] Test : navigue vers le mois suivant
  - Cliquer sur le bouton ">"
  - Vérifier que le mois a changé

- [ ] Test : émet l'événement selectDate quand on clique sur une date
  - Cliquer sur une date
  - Vérifier que l'événement est émis avec la bonne date

- [ ] Test : surligne la date du jour
  - Vérifier que la date du jour a la classe `bg-primary`

---

### 4. Configuration des Tests

**Fichier:** `client/vitest.config.ts`

- [ ] Configurer Vitest pour Vue/Nuxt
- [ ] Configurer les aliases (@, ~, etc.)
- [ ] Configurer l'environnement jsdom

**Fichier:** `client/package.json`

- [ ] Ajouter le script : `"test": "vitest"`
- [ ] Ajouter le script : `"test:ui": "vitest --ui"` (optionnel)

---

## ✓ Critères de validation

- [ ] Tous les tests passent (green)
- [ ] Les composants principaux sont testés (MealCard, MonthCalendar)
- [ ] Le composable useMeals est testé
- [ ] Les événements et props sont testés
- [ ] Les états (loading, error, empty) sont testés
- [ ] La couverture de code est > 70%
- [ ] Les tests peuvent être exécutés avec `npm test`

---

## 📚 Ressources

- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Composables](https://vuejs.org/guide/scaling-up/testing.html#testing-composables)
