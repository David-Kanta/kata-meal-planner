# Tâche 01 : Setup Initial & Design System

**Phase:** 1
**Durée estimée:** 1 jour
**Dépendances:** Aucune
**Issue:** #1 - Home Page

---

## 📋 Objectifs

Configurer les tokens de design et les types TypeScript de base pour l'application.

---

## ✅ Actions à réaliser

### 1. Configuration Tailwind & Design Tokens

**Fichier:** `client/tailwind.config.ts`

- [ ] Ajouter les couleurs personnalisées :
  - `primary.DEFAULT`: `#FF8C00`
  - `primary.light`: `#FFD700`
  - `neutral.50`: `#FAFAFA`
  - `neutral.900`: `#000000`
- [ ] Configurer les border-radius personnalisés :
  - `card`: `12px`
  - `button`: `20px`
- [ ] Ajouter le box-shadow personnalisé :
  - `card`: `0 2px 8px rgba(0, 0, 0, 0.08)`

**Code de référence:**

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF8C00',
          light: '#FFD700',
        },
        neutral: {
          50: '#FAFAFA',
          900: '#000000',
        }
      },
      borderRadius: {
        card: '12px',
        button: '20px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.08)',
      }
    }
  }
}
```

---

### 2. Types TypeScript

**Fichier:** `client/types/meal.ts`

- [ ] Créer l'interface `Recipe` avec :
  - `id: string`
  - `name: string`
  - `description: string`
  - `imageUrl: string`
  - `prepTimeMinutes: number`
  - `cookTimeMinutes: number`

- [ ] Créer l'interface `Meal` avec :
  - `id: string`
  - `date: string`
  - `mealType: 'breakfast' | 'lunch' | 'dinner'`
  - `recipe: Recipe`

- [ ] Créer l'interface `DailyMeals` avec :
  - `date: string`
  - `breakfast: Meal | null`
  - `lunch: Meal | null`
  - `dinner: Meal | null`

- [ ] Créer l'interface `WeeklyMealPlan` avec :
  - `startDate: string`
  - `endDate: string`
  - `days: Array<{ day: string, date: string, meals: DailyMeals }>`

**Code de référence:**

```typescript
export interface Recipe {
  id: string
  name: string
  description: string
  imageUrl: string
  prepTimeMinutes: number
  cookTimeMinutes: number
}

export interface Meal {
  id: string
  date: string
  mealType: 'breakfast' | 'lunch' | 'dinner'
  recipe: Recipe
}

export interface DailyMeals {
  date: string
  breakfast: Meal | null
  lunch: Meal | null
  dinner: Meal | null
}

export interface WeeklyMealPlan {
  startDate: string
  endDate: string
  days: Array<{
    day: string
    date: string
    meals: DailyMeals
  }>
}
```

---

## ✓ Critères de validation

- [ ] Les couleurs personnalisées sont accessibles via Tailwind (ex: `bg-primary`, `text-primary-light`)
- [ ] Les border-radius personnalisés fonctionnent (ex: `rounded-card`, `rounded-button`)
- [ ] Les types TypeScript sont importables sans erreur
- [ ] Aucune erreur de compilation TypeScript
- [ ] Les tokens de design respectent la charte graphique

---

## 📚 Ressources

- [Tailwind CSS Configuration](https://tailwindcss.com/docs/configuration)
- [TypeScript Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
