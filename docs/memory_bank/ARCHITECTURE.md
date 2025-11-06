# Architecture - MealPlanner

## Vue d'ensemble

**MealPlanner** est une application full-stack Node.js construite avec une architecture monorepo séparée en deux parties distinctes : un frontend Nuxt.js et un backend Express.js. L'application utilise SQLite comme base de données locale pour simplifier le développement et le déploiement.

## Architecture Globale

```
┌─────────────────────────────────────────────────────────────────┐
│                          MealPlanner                            │
│                         (Monorepo)                              │
├─────────────────────────────────┬───────────────────────────────┤
│          CLIENT                 │          SERVER               │
│        (Nuxt.js)                │      (Node.js + Express)      │
│                                 │                               │
│  ┌──────────────────────┐      │   ┌──────────────────────┐   │
│  │      Pages           │      │   │    Controllers       │   │
│  │  - Home              │      │   │  - MealController    │   │
│  │  - Recipes           │      │   │  - RecipeController  │   │
│  │  - Settings          │      │   │  - UserController    │   │
│  │  - Shopping List     │      │   │  - ShoppingList...   │   │
│  └──────────────────────┘      │   └──────────────────────┘   │
│            ↓                    │             ↓                 │
│  ┌──────────────────────┐      │   ┌──────────────────────┐   │
│  │     Components       │      │   │      Services        │   │
│  │  - MealCard          │      │   │  - MealService       │   │
│  │  - RecipeCard        │      │   │  - RecipeService     │   │
│  │  - Calendar          │      │   │  - UserService       │   │
│  │  - ShoppingList...   │      │   │  - ShoppingList...   │   │
│  └──────────────────────┘      │   └──────────────────────┘   │
│            ↓                    │             ↓                 │
│  ┌──────────────────────┐      │   ┌──────────────────────┐   │
│  │     Composables      │      │   │    Repositories      │   │
│  │  - useMeals          │      │   │  - MealRepository    │   │
│  │  - useRecipes        │      │   │  - RecipeRepo        │   │
│  │  - useSettings       │      │   │  - UserRepository    │   │
│  └──────────────────────┘      │   └──────────────────────┘   │
│            ↓                    │             ↓                 │
│  ┌──────────────────────┐      │   ┌──────────────────────┐   │
│  │    API Client        │◄─────┼───┤     REST API         │   │
│  │   (fetch/axios)      │ HTTP │   │   /api/v1/...        │   │
│  └──────────────────────┘      │   └──────────────────────┘   │
│                                 │             ↓                 │
│                                 │   ┌──────────────────────┐   │
│                                 │   │    SQLite DB         │   │
│                                 │   │  mealplanner.db      │   │
│                                 │   └──────────────────────┘   │
└─────────────────────────────────┴───────────────────────────────┘
                                  ↓
                        ┌──────────────────┐
                        │  Static Assets   │
                        │   /public        │
                        │  - Images        │
                        │  - Icons         │
                        └──────────────────┘
```

---

## Structure du Projet

```
kata-meal-planner/
├── client/                      # Frontend Nuxt.js
│   ├── .nuxt/                  # Build artifacts (auto-généré)
│   ├── assets/                 # Assets non compilés (SCSS, fonts)
│   ├── components/             # Composants Vue réutilisables
│   │   ├── common/            # Composants génériques (Button, Card, Input)
│   │   ├── meal/              # Composants liés aux repas
│   │   │   ├── MealCard.vue
│   │   │   ├── MealCalendar.vue
│   │   │   └── DailyDigest.vue
│   │   ├── recipe/            # Composants de recettes
│   │   │   ├── RecipeCard.vue
│   │   │   ├── RecipeFilters.vue
│   │   │   └── RecipeSearch.vue
│   │   ├── shopping/          # Liste de courses
│   │   │   ├── ShoppingList.vue
│   │   │   └── ShoppingListItem.vue
│   │   └── settings/          # Paramètres
│   │       ├── DietaryPreferences.vue
│   │       ├── AllergiesSelector.vue
│   │       └── MealSettings.vue
│   ├── composables/            # Composables Vue 3 (logique réutilisable)
│   │   ├── useMeals.ts        # Gestion des repas planifiés
│   │   ├── useRecipes.ts      # Recherche et filtrage de recettes
│   │   ├── useSettings.ts     # Préférences utilisateur
│   │   ├── useShoppingList.ts # Gestion de la liste de courses
│   │   └── useApi.ts          # Client API centralisé
│   ├── layouts/                # Layouts Nuxt
│   │   ├── default.vue        # Layout principal
│   │   └── mobile.vue         # Layout mobile (optionnel)
│   ├── middleware/             # Middleware Nuxt (navigation guards)
│   ├── pages/                  # Pages (routing auto-généré)
│   │   ├── index.vue          # Home (Daily Digest / Weekly Plan)
│   │   ├── recipes/
│   │   │   ├── index.vue      # Liste de recettes (Issue #4)
│   │   │   └── [id].vue       # Détail d'une recette
│   │   ├── shopping-list.vue  # Liste de courses (Issue #3)
│   │   └── settings.vue       # Paramètres (Issue #2)
│   ├── plugins/                # Plugins Nuxt
│   │   └── api.ts             # Configuration API client
│   ├── public/                 # Assets statiques publics
│   │   ├── images/            # Images de recettes (stockage local)
│   │   └── icons/             # Icônes
│   ├── stores/                 # Pinia stores (state management)
│   │   ├── meal.ts            # État des repas planifiés
│   │   ├── recipe.ts          # État des recettes
│   │   ├── settings.ts        # État des préférences
│   │   └── shoppingList.ts    # État de la liste de courses
│   ├── types/                  # Types TypeScript
│   │   ├── meal.ts
│   │   ├── recipe.ts
│   │   └── user.ts
│   ├── utils/                  # Fonctions utilitaires
│   │   ├── date.ts            # Formatage de dates
│   │   ├── format.ts          # Formatage de données
│   │   └── validation.ts      # Validation de formulaires
│   ├── nuxt.config.ts         # Configuration Nuxt
│   ├── tsconfig.json          # Configuration TypeScript
│   └── package.json
│
├── server/                      # Backend Node.js + Express
│   ├── src/
│   │   ├── controllers/        # Contrôleurs (HTTP handlers)
│   │   │   ├── mealController.js
│   │   │   ├── recipeController.js
│   │   │   ├── userController.js
│   │   │   └── shoppingListController.js
│   │   ├── services/           # Services (logique métier)
│   │   │   ├── mealService.js
│   │   │   ├── recipeService.js
│   │   │   ├── userService.js
│   │   │   └── shoppingListService.js
│   │   ├── repositories/       # Repositories (accès données)
│   │   │   ├── mealRepository.js
│   │   │   ├── recipeRepository.js
│   │   │   ├── userRepository.js
│   │   │   └── shoppingListRepository.js
│   │   ├── models/             # Modèles de données (optionnel avec Sequelize)
│   │   │   ├── User.js
│   │   │   ├── Recipe.js
│   │   │   ├── MealPlan.js
│   │   │   └── ShoppingList.js
│   │   ├── routes/             # Routes Express
│   │   │   ├── index.js       # Routes principales
│   │   │   ├── mealRoutes.js
│   │   │   ├── recipeRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   └── shoppingListRoutes.js
│   │   ├── middleware/         # Middleware Express
│   │   │   ├── errorHandler.js
│   │   │   ├── validator.js
│   │   │   └── logger.js
│   │   ├── config/             # Configuration
│   │   │   ├── database.js    # Config SQLite
│   │   │   └── constants.js   # Constantes
│   │   ├── db/                 # Base de données
│   │   │   ├── migrations/    # Scripts de migration
│   │   │   ├── seeds/         # Données de test
│   │   │   └── connection.js  # Connexion SQLite
│   │   ├── utils/              # Utilitaires backend
│   │   │   ├── logger.js
│   │   │   └── validators.js
│   │   └── server.js           # Point d'entrée
│   ├── tests/                  # Tests
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── .env.example            # Variables d'environnement (exemple)
│   ├── package.json
│   └── nodemon.json            # Config Nodemon
│
├── data/                        # Base de données SQLite
│   └── mealplanner.db          # Fichier DB
│
├── docs/                        # Documentation
│   ├── agents/                 # Agents AI
│   ├── issues/                 # Issues GitHub
│   ├── memory_bank/            # Documentation technique
│   │   ├── AGENTS.md
│   │   ├── ARCHITECTURE.md    # Ce fichier
│   │   ├── DATABASE.md
│   │   ├── PROJECT_BRIEF.md
│   │   └── STACK.md
│   └── tasks/                  # Plans de tâches
│
├── .gitignore
├── README.md
└── package.json                 # Package.json racine (optionnel, pour scripts globaux)
```

---

## Frontend - Client (Nuxt.js)

### Stack Technique

- **Framework** : Nuxt.js 3 (Vue 3)
- **Langage** : TypeScript
- **State Management** : Pinia
- **Styling** : Tailwind CSS
- **HTTP Client** : Fetch API natif (ou Axios si préféré)
- **Build Tool** : Vite (intégré dans Nuxt 3)

### Architecture Frontend

#### Pages (Routing)

Nuxt utilise le **file-based routing**. Chaque fichier dans `pages/` devient automatiquement une route :

```
pages/index.vue           → /
pages/recipes/index.vue   → /recipes
pages/recipes/[id].vue    → /recipes/:id
pages/shopping-list.vue   → /shopping-list
pages/settings.vue        → /settings
```

#### Composables (Logique réutilisable)

Les composables encapsulent la logique métier et les appels API :

```typescript
// composables/useMeals.ts
export const useMeals = () => {
  const meals = ref([])
  const loading = ref(false)

  const fetchDailyMeals = async (date: string) => {
    loading.value = true
    try {
      const response = await $fetch('/api/v1/meals/daily', {
        params: { date }
      })
      meals.value = response.data
    } finally {
      loading.value = false
    }
  }

  return { meals, loading, fetchDailyMeals }
}
```

#### Stores Pinia (State Management)

Pinia gère l'état global partagé entre composants :

```typescript
// stores/meal.ts
export const useMealStore = defineStore('meal', {
  state: () => ({
    currentMealPlan: null,
    plannedMeals: []
  }),

  actions: {
    async fetchMealPlan() {
      // Logique de récupération
    }
  },

  getters: {
    mealsForToday: (state) => {
      // Calcul des repas du jour
    }
  }
})
```

#### Composants

Composants Vue 3 avec `<script setup>` :

```vue
<!-- components/meal/MealCard.vue -->
<script setup lang="ts">
defineProps<{
  meal: Meal
}>()

const emit = defineEmits<{
  swap: [mealId: string]
  cook: [mealId: string]
}>()
</script>

<template>
  <div class="meal-card">
    <img :src="meal.recipe.imageUrl" :alt="meal.recipe.name" />
    <h3>{{ meal.recipe.name }}</h3>
    <div class="actions">
      <button @click="emit('swap', meal.id)">Swap Meal</button>
      <button @click="emit('cook', meal.id)">Cook Now</button>
    </div>
  </div>
</template>
```

---

## Backend - Server (Node.js + Express)

### Stack Technique

- **Runtime** : Node.js (v18+)
- **Framework** : Express.js
- **Base de données** : SQLite 3
- **ORM** : Sequelize (ou queries SQL natives)
- **Langage** : JavaScript (ES6+) ou TypeScript
- **Validation** : Joi ou Zod
- **Logging** : Winston ou Pino

### Architecture en Couches

L'architecture backend suit le pattern **Controller → Service → Repository** pour une séparation claire des responsabilités.

```
HTTP Request
     ↓
┌─────────────────────┐
│   Controllers       │ ← Gestion HTTP (req/res, validation, status codes)
└─────────────────────┘
     ↓
┌─────────────────────┐
│    Services         │ ← Logique métier (business logic)
└─────────────────────┘
     ↓
┌─────────────────────┐
│   Repositories      │ ← Accès données (SQL, ORM)
└─────────────────────┘
     ↓
┌─────────────────────┐
│   SQLite Database   │
└─────────────────────┘
```

#### 1. Controllers (Couche HTTP)

Gèrent les requêtes HTTP, la validation des entrées et les réponses.

```javascript
// controllers/recipeController.js
const recipeService = require('../services/recipeService')

exports.getAllRecipes = async (req, res, next) => {
  try {
    const { search, tags, limit, offset } = req.query

    const recipes = await recipeService.searchRecipes({
      search,
      tags: tags?.split(','),
      limit: parseInt(limit) || 20,
      offset: parseInt(offset) || 0
    })

    res.json({
      success: true,
      data: recipes
    })
  } catch (error) {
    next(error)
  }
}

exports.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id)

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      })
    }

    res.json({
      success: true,
      data: recipe
    })
  } catch (error) {
    next(error)
  }
}
```

#### 2. Services (Couche Métier)

Contiennent la logique métier, orchestrent les repositories, appliquent les règles business.

```javascript
// services/recipeService.js
const recipeRepository = require('../repositories/recipeRepository')
const userRepository = require('../repositories/userRepository')

exports.searchRecipes = async (filters) => {
  const { search, tags, limit, offset, userId } = filters

  // Récupérer les recettes
  let recipes = await recipeRepository.findAll({
    search,
    tags,
    limit,
    offset
  })

  // Si userId fourni, exclure les recettes avec allergènes
  if (userId) {
    const userAllergies = await userRepository.getUserAllergies(userId)
    recipes = recipes.filter(recipe =>
      !recipe.ingredients.some(ing =>
        userAllergies.includes(ing.id)
      )
    )
  }

  return recipes
}

exports.getRecipeById = async (recipeId) => {
  return await recipeRepository.findById(recipeId)
}
```

#### 3. Repositories (Couche Données)

Responsables des opérations CRUD et des requêtes SQL.

```javascript
// repositories/recipeRepository.js
const db = require('../config/database')

exports.findAll = async (filters) => {
  const { search, tags, limit, offset } = filters

  let query = `
    SELECT DISTINCT r.*
    FROM recipes r
    LEFT JOIN recipe_tags rt ON r.id = rt.recipe_id
    LEFT JOIN tags t ON rt.tag_id = t.id
    WHERE 1=1
  `

  const params = []

  if (search) {
    query += ` AND (r.name LIKE ? OR r.description LIKE ?)`
    params.push(`%${search}%`, `%${search}%`)
  }

  if (tags && tags.length > 0) {
    const placeholders = tags.map(() => '?').join(',')
    query += ` AND t.name IN (${placeholders})`
    params.push(...tags)
  }

  query += ` LIMIT ? OFFSET ?`
  params.push(limit, offset)

  return await db.all(query, params)
}

exports.findById = async (id) => {
  return await db.get('SELECT * FROM recipes WHERE id = ?', [id])
}
```

### Routes API

Structure RESTful des endpoints :

```javascript
// routes/index.js
const express = require('express')
const router = express.Router()

const mealRoutes = require('./mealRoutes')
const recipeRoutes = require('./recipeRoutes')
const userRoutes = require('./userRoutes')
const shoppingListRoutes = require('./shoppingListRoutes')

router.use('/meals', mealRoutes)
router.use('/recipes', recipeRoutes)
router.use('/users', userRoutes)
router.use('/shopping-lists', shoppingListRoutes)

module.exports = router
```

```javascript
// routes/recipeRoutes.js
const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipeController')

router.get('/', recipeController.getAllRecipes)
router.get('/:id', recipeController.getRecipeById)
router.post('/', recipeController.createRecipe)
router.put('/:id', recipeController.updateRecipe)
router.delete('/:id', recipeController.deleteRecipe)

module.exports = router
```

---

## API REST - Endpoints Principaux

### Base URL

```
http://localhost:3001/api/v1
```

### Endpoints par Feature

#### Issue #1 : Home Page (Meal Plans)

```
GET    /meals/daily?date=2025-11-06         # Repas du jour (Daily Digest)
GET    /meals/weekly?startDate=2025-11-04   # Repas de la semaine
GET    /meals/upcoming?limit=5              # Prochains repas
POST   /meals/swap                          # Échanger un repas
PUT    /meals/:id/cook                      # Marquer comme cuisiné
```

#### Issue #2 : Settings (User Preferences)

```
GET    /users/preferences                   # Récupérer les préférences
PUT    /users/preferences                   # Mettre à jour les préférences
GET    /users/allergies                     # Liste des allergies
POST   /users/allergies                     # Ajouter une allergie
DELETE /users/allergies/:id                 # Supprimer une allergie
GET    /users/excluded-ingredients          # Ingrédients exclus
POST   /users/excluded-ingredients          # Exclure un ingrédient
```

#### Issue #3 : Shopping List

```
GET    /shopping-lists                      # Liste de courses active
POST   /shopping-lists/generate             # Générer depuis meal plan
POST   /shopping-lists/items                # Ajouter un article manuel
PUT    /shopping-lists/items/:id/check      # Cocher/décocher un article
DELETE /shopping-lists/items/:id            # Supprimer un article
GET    /shopping-lists/print                # Format imprimable
```

#### Issue #4 : Recipe Discovery

```
GET    /recipes?search=pasta&tags=vegetarian,quick_easy&limit=20
GET    /recipes/:id                         # Détail d'une recette
GET    /recipes/:id/ingredients             # Ingrédients d'une recette
GET    /tags                                # Liste des tags disponibles
POST   /recipes                             # Créer une recette (admin)
```

### Format de Réponse Standard

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
```

### Gestion des Erreurs

```json
{
  "success": false,
  "error": {
    "code": "RECIPE_NOT_FOUND",
    "message": "Recipe with ID 123 not found",
    "details": {}
  }
}
```

---

## Base de Données - SQLite

### Configuration

```javascript
// config/database.js
const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const dbPath = path.resolve(__dirname, '../../data/mealplanner.db')

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message)
  } else {
    console.log('Connected to SQLite database')
  }
})

module.exports = db
```

### Migrations

Scripts SQL pour créer/modifier le schéma :

```javascript
// db/migrations/001_initial_schema.sql
-- Voir DATABASE.md pour le schéma complet adapté à SQLite
```

### Seeds (Données de Test)

```javascript
// db/seeds/001_sample_recipes.js
const db = require('../config/database')

const sampleRecipes = [
  {
    name: 'Oatmeal with Berries',
    description: 'Healthy breakfast with fresh berries',
    prep_time_minutes: 5,
    cook_time_minutes: 10,
    // ...
  }
]

exports.seed = async () => {
  // Insérer les recettes de test
}
```

---

## Communication Client ↔ Server

### API Client (Frontend)

```typescript
// composables/useApi.ts
export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  const apiFetch = async (endpoint: string, options = {}) => {
    return await $fetch(endpoint, {
      baseURL,
      ...options
    })
  }

  return { apiFetch }
}
```

### Configuration Nuxt

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001/api/v1'
    }
  },

  // Proxy API calls en dev (éviter CORS)
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
```

---

## Gestion des Assets Statiques

### Images de Recettes

**Stockage local** dans `client/public/images/recipes/` :

```
client/public/images/recipes/
  ├── oatmeal-berries.jpg
  ├── spaghetti-bolognese.jpg
  └── caesar-salad.jpg
```

URL d'accès : `http://localhost:3000/images/recipes/oatmeal-berries.jpg`

### CDN pour Assets Statiques (Production)

En production, servir les assets via un CDN :

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    cdnURL: process.env.CDN_URL || 'http://localhost:3000'
  }
})
```

Options CDN :
- **Cloudflare CDN** (gratuit)
- **Vercel Edge Network** (si déployé sur Vercel)
- **Nginx + Cache** (auto-hébergé)

---

## Patterns et Conventions

### Nommage

- **Fichiers** : camelCase pour JS/TS, PascalCase pour composants Vue
- **API Routes** : kebab-case (`/meal-plans`, `/shopping-lists`)
- **Base de données** : snake_case (`user_preferences`, `meal_plans`)
- **Variables** : camelCase en JS/TS

### Structure de Code

```javascript
// Ordre d'import standard
// 1. Modules externes
const express = require('express')
const path = require('path')

// 2. Modules internes
const recipeService = require('../services/recipeService')
const { validateRecipe } = require('../utils/validators')

// 3. Configuration
const config = require('../config/constants')
```

### Gestion des Erreurs

```javascript
// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack)

  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  })
}
```

### Validation des Données

```javascript
// utils/validators.js
const Joi = require('joi')

exports.validateRecipe = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(255),
    description: Joi.string().max(1000),
    prep_time_minutes: Joi.number().integer().min(0),
    servings: Joi.number().integer().min(1).default(4)
  })

  return schema.validate(data)
}
```

---

## Environnement de Développement

### Variables d'Environnement

```env
# server/.env
NODE_ENV=development
PORT=3001
DATABASE_PATH=../data/mealplanner.db

# Logging
LOG_LEVEL=debug

# CORS
CORS_ORIGIN=http://localhost:3000
```

```env
# client/.env
NUXT_PUBLIC_API_BASE=http://localhost:3001/api/v1
```

### Scripts NPM

```json
{
  "scripts": {
    "dev:client": "cd client && npm run dev",
    "dev:server": "cd server && npm run dev",
    "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
    "build:client": "cd client && npm run build",
    "build:server": "cd server && npm run build",
    "start:client": "cd client && npm run start",
    "start:server": "cd server && npm run start"
  }
}
```

### Ports

- **Client (Nuxt)** : `http://localhost:3000`
- **Server (Express)** : `http://localhost:3001`

---

## Flux de Données par Issue

### Issue #1 : Home Page (Daily Digest)

```
1. User → Visite /
2. pages/index.vue → Appelle composable useMeals()
3. useMeals() → Fait $fetch('/api/v1/meals/daily')
4. Server → Route /meals/daily → mealController.getDailyMeals()
5. mealController → mealService.getDailyMeals()
6. mealService → mealRepository.findByDate()
7. mealRepository → Query SQLite
8. Response → JSON renvoyé au client
9. Nuxt → Affiche les MealCard components
```

### Issue #4 : Recipe Discovery

```
1. User → Visite /recipes, applique filtres
2. pages/recipes/index.vue → useRecipes().search()
3. useRecipes() → $fetch('/api/v1/recipes?tags=vegetarian')
4. Server → recipeController.getAllRecipes()
5. recipeController → recipeService.searchRecipes()
6. recipeService → recipeRepository.findAll() + filtre allergies
7. recipeRepository → Query SQLite avec JOINs
8. Response → Liste de recettes filtrées
9. Nuxt → Affiche RecipeCard pour chaque recette
```

---

## Sécurité

### Protection CSRF (optionnel pour v1)

Pas nécessaire pour un utilisateur unique, mais peut être ajouté plus tard.

### Validation des Entrées

- Validation côté client (Nuxt forms)
- Validation côté serveur (Joi/Zod obligatoire)

### Sanitization SQL

- Utiliser des **paramètres préparés** pour toutes les queries
- Jamais de concaténation de strings SQL

```javascript
// ✅ Bon
db.get('SELECT * FROM recipes WHERE id = ?', [id])

// ❌ Mauvais (SQL Injection possible)
db.get(`SELECT * FROM recipes WHERE id = ${id}`)
```

### Headers de Sécurité

```javascript
const helmet = require('helmet')
app.use(helmet())
```

---

## Performance

### Frontend

- **Lazy Loading** : Charger les composants à la demande
- **Image Optimization** : Nuxt Image pour optimiser les images
- **Code Splitting** : Automatique avec Nuxt
- **Caching** : Cache HTTP pour assets statiques

### Backend

- **Index DB** : Index sur colonnes fréquemment requêtées (voir DATABASE.md)
- **Connection Pooling** : SQLite limite à 1 connexion, mais suffisant pour usage mono-utilisateur
- **Pagination** : Toujours limiter les résultats (LIMIT/OFFSET)
- **Compression** : Gzip pour réponses JSON

```javascript
const compression = require('compression')
app.use(compression())
```

---

## Testing

### Frontend (Client)

- **Unit Tests** : Vitest pour composables et utils
- **Component Tests** : @nuxt/test-utils
- **E2E Tests** : Playwright ou Cypress

### Backend (Server)

- **Unit Tests** : Jest pour services et repositories
- **Integration Tests** : Supertest pour API endpoints
- **DB Tests** : SQLite en mémoire pour tests rapides

```javascript
// tests/integration/recipeController.test.js
const request = require('supertest')
const app = require('../../src/server')

describe('GET /api/v1/recipes', () => {
  it('should return list of recipes', async () => {
    const response = await request(app)
      .get('/api/v1/recipes')
      .expect(200)

    expect(response.body.success).toBe(true)
    expect(response.body.data).toBeInstanceOf(Array)
  })
})
```

---

## Monitoring & Logging

### Logging

```javascript
// utils/logger.js
const winston = require('winston')

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
})

module.exports = logger
```

### Middleware de Logging

```javascript
// middleware/logger.js
const logger = require('../utils/logger')

module.exports = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    query: req.query,
    body: req.body,
    ip: req.ip
  })
  next()
}
```

---

## Évolutions Futures

### Phase 1 (Actuelle)
- ✅ Utilisateur unique (pas d'auth)
- ✅ Stockage local
- ✅ SQLite
- ✅ Pas de déploiement

### Phase 2 (Future)
- 🔄 Multi-utilisateurs + authentification JWT
- 🔄 Upload d'images vers cloud (S3, Cloudinary)
- 🔄 Migration vers PostgreSQL
- 🔄 CI/CD + déploiement automatisé

### Phase 3 (Long terme)
- 🔄 API GraphQL en complément du REST
- 🔄 Notifications push (PWA)
- 🔄 Partage de recettes entre utilisateurs
- 🔄 Application mobile (React Native / Flutter)

---

## Résumé des Choix Architecturaux

| Aspect | Choix | Justification |
|--------|-------|---------------|
| **Structure** | Monorepo (client + server séparés) | Organisation claire, partage facilité |
| **Frontend** | Nuxt.js 3 | SSR, routing auto, écosystème Vue |
| **Backend** | Express.js | Simple, mature, flexible |
| **Architecture** | Couches (Controller/Service/Repository) | Séparation des responsabilités, testable |
| **Base de données** | SQLite | Légère, pas de serveur, parfaite pour dev |
| **API** | REST | Standard, simple, bien supporté |
| **State Management** | Pinia | Officiel Vue 3, TypeScript-friendly |
| **Styling** | Tailwind CSS | Rapide, utility-first, moderne |
| **Auth** | Aucune (v1) | Simplification pour utilisateur unique |
| **Stockage Images** | Local | Simple, pas de coûts, suffisant pour v1 |

---

## Conclusion

Cette architecture offre :

✅ **Simplicité** : Pas de complexité inutile pour la v1
✅ **Scalabilité** : Facile d'ajouter multi-utilisateurs plus tard
✅ **Maintenabilité** : Séparation claire des couches
✅ **Performance** : SQLite rapide pour usage local
✅ **Developer Experience** : Nuxt + TypeScript pour productivité

Le projet est prêt à être développé selon les Issues #1 à #4 ! 🚀
