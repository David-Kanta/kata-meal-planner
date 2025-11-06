# MealPlanner - Frontend Client

Client Nuxt.js 3 pour l'application MealPlanner.

## 🚀 Démarrage

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Le serveur de développement démarre sur **http://localhost:3001**

### Build Production

```bash
npm run build
npm run preview
```

## 🎨 Design System

### Couleurs

- **Primary**: `#FF8C00` (Orange)
  - Usage: `bg-primary`, `text-primary`
- **Primary Light**: `#FFD700` (Jaune doré)
  - Usage: `bg-primary-light`, `text-primary-light`
- **Neutral**: De `neutral-50` à `neutral-900`
  - Usage: `bg-neutral-100`, `text-neutral-700`, etc.

### Border Radius

- **Card**: `12px`
  - Usage: `rounded-card`
- **Button**: `20px`
  - Usage: `rounded-button`

### Shadows

- **Card**: `0 2px 8px rgba(0, 0, 0, 0.08)`
  - Usage: `shadow-card`

## 📁 Structure

```
client/
├── assets/          # Assets CSS, images
│   └── css/
│       └── main.css # Fichier principal Tailwind
├── components/      # Composants Vue réutilisables
├── composables/     # Composables Vue
├── layouts/         # Layouts Nuxt
├── pages/           # Pages de l'application
├── plugins/         # Plugins Nuxt
├── public/          # Assets statiques
├── stores/          # Stores Pinia
├── types/           # Types TypeScript
│   └── meal.ts      # Types pour meals et recipes
├── app.vue          # Composant racine
├── nuxt.config.ts   # Configuration Nuxt
└── tailwind.config.ts # Configuration Tailwind
```

## 📦 Stack Technique

- **Framework**: Nuxt.js 3.11.2
- **Vue**: 3.4.21
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Language**: TypeScript

## 🎯 Tâches Complétées

- [x] Initialisation du projet Nuxt.js 3
- [x] Configuration Tailwind CSS avec tokens de design
- [x] Création des types TypeScript (Recipe, Meal, DailyMeals, WeeklyMealPlan)
- [x] Structure de dossiers de base
- [x] Page de test pour validation
- [x] Composable `useMeals` pour les appels API
- [x] Store Pinia pour la gestion d'état
- [x] Connexion frontend-backend opérationnelle

## 📝 Types TypeScript

Les types suivants sont disponibles dans `types/meal.ts`:

- `Recipe`: Représente une recette
- `Meal`: Représente un repas planifié
- `DailyMeals`: Repas d'une journée (breakfast, lunch, dinner)
- `WeeklyMealPlan`: Plan hebdomadaire complet

## 🔌 Composables & State Management

### Composable `useMeals`

```typescript
const {
  dailyMeals,
  weeklyPlan,
  upcomingMeals,
  loading,
  error,
  fetchDailyMeals,
  fetchWeeklyMeals,
  fetchUpcomingMeals,
  swapMeal,
  markAsCooked
} = useMeals()
```

### Store Pinia

```typescript
const mealStore = useMealStore()

// State
mealStore.currentDate
mealStore.dailyMeals
mealStore.weeklyPlan

// Getters
mealStore.hasMealsForToday
mealStore.todaysMealCount

// Actions
mealStore.setCurrentDate(date)
mealStore.setDailyMeals(meals)
```

## 🔧 Configuration

### Tailwind CSS

Le fichier `tailwind.config.ts` contient tous les tokens de design personnalisés.

### TypeScript

Configuration stricte activée dans `nuxt.config.ts`.

## 🌐 Variables d'Environnement

Créer un fichier `.env` à la racine :

```env
# API Backend URL
API_BASE_URL=http://localhost:3001
```

## 📚 Prochaines Étapes

Voir le fichier [docs/tasks/README.md](../docs/tasks/README.md) pour la liste complète des tâches.
