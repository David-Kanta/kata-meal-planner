# Schéma de Base de Données - MealPlanner (SQLite)

## Vue d'ensemble

Ce document décrit le schéma de base de données **SQLite** nécessaire pour implémenter toutes les fonctionnalités du projet MealPlanner (Issues #1 à #4).

> **Note** : Ce schéma est optimisé pour SQLite. Les types de données et certaines fonctionnalités ont été adaptés depuis PostgreSQL.

## Diagramme Entité-Relations

```
┌─────────────────┐         ┌──────────────────────┐         ┌─────────────────┐
│     Users       │────1:1──│  UserPreferences     │         │   Categories    │
│                 │         │                      │         │                 │
│ • id            │         │ • id                 │         │ • id            │
│ • email         │         │ • user_id (FK)       │         │ • name          │
│ • name          │         │ • dietary_type       │         │ • display_order │
│ • profile_pic   │         │ • meals_per_day      │         └─────────────────┘
│ • created_at    │         │ • meal_plan_length   │                  │
│ • updated_at    │         │ • include_leftovers  │                  │
└─────────────────┘         │ • auto_grocery_list  │                  │
        │                   │ • created_at         │                  │
        │                   │ • updated_at         │                  │
        │                   └──────────────────────┘                  │
        │                            │                                │
        │                            │                                │
        │                   ┌────────┴───────────┐                   │
        │                   │                    │                    │
        │          ┌────────▼──────────┐  ┌──────▼──────────┐        │
        │          │ UserAllergies     │  │ UserExcluded    │        │
        │          │                   │  │ Ingredients     │        │
        │          │ • id              │  │                 │        │
        │          │ • user_pref_id(FK)│  │ • id            │        │
        │          │ • ingredient_id(FK)│  │ • user_pref_id  │        │
        │          └───────────────────┘  │ • ingredient_id │        │
        │                                 └─────────────────┘        │
        │                                                             │
        │                   ┌──────────────────────┐                 │
        ├──────────1:N─────▶│    MealPlans         │                 │
        │                   │                      │                 │
        │                   │ • id                 │                 │
        │                   │ • user_id (FK)       │                 │
        │                   │ • start_date         │                 │
        │                   │ • end_date           │                 │
        │                   │ • is_active          │                 │
        │                   │ • created_at         │                 │
        │                   │ • updated_at         │                 │
        │                   └──────────────────────┘                 │
        │                            │                                │
        │                            │                                │
        │                            │1:N                             │
        │                            │                                │
        │                   ┌────────▼──────────┐                    │
        │                   │  PlannedMeals     │                    │
        │                   │                   │                    │
        │                   │ • id              │                    │
        │                   │ • meal_plan_id(FK)│                    │
        │                   │ • recipe_id (FK)  │─────┐              │
        │                   │ • meal_date       │     │              │
        │                   │ • meal_type       │     │              │
        │                   │   (breakfast/     │     │              │
        │                   │    lunch/dinner)  │     │              │
        │                   │ • is_cooked       │     │              │
        │                   │ • created_at      │     │              │
        │                   └───────────────────┘     │              │
        │                                             │              │
        │                                             │N:1           │
        │                   ┌─────────────────────────▼──┐           │
        │                   │       Recipes              │           │
        │                   │                            │           │
        │                   │ • id                       │           │
        │                   │ • name                     │           │
        │                   │ • description              │           │
        │                   │ • image_url                │           │
        │                   │ • prep_time_minutes        │           │
        │                   │ • cook_time_minutes        │           │
        │                   │ • total_time_minutes       │           │
        │                   │ • servings                 │           │
        │                   │ • instructions (JSON TEXT) │           │
        │                   │ • difficulty               │           │
        │                   │ • created_at               │           │
        │                   │ • updated_at               │           │
        │                   └────────────────────────────┘           │
        │                            │                               │
        │                            │N:M                            │
        │                            │                               │
        │                   ┌────────▼──────────┐                   │
        │                   │  RecipeIngredients│                   │
        │                   │                   │                   │
        │                   │ • id              │                   │
        │                   │ • recipe_id (FK)  │                   │
        │                   │ • ingredient_id(FK)│───────┐          │
        │                   │ • quantity        │       │          │
        │                   │ • unit            │       │          │
        │                   │ • optional        │       │N:1       │
        │                   └───────────────────┘       │          │
        │                            │                  │          │
        │                            │                  │          │
        │                   ┌────────▼──────────┐  ┌────▼────────────┐
        │                   │   RecipeTags      │  │  Ingredients    │
        │                   │                   │  │                 │
        │                   │ • id              │  │ • id            │
        │                   │ • recipe_id (FK)  │  │ • name          │
        │                   │ • tag_id (FK)     │  │ • category_id(FK)│──────┘
        │                   └───────────────────┘  │ • unit_type     │
        │                            │             │ • created_at    │
        │                            │N:1          └─────────────────┘
        │                            │
        │                   ┌────────▼──────────┐
        │                   │      Tags         │
        │                   │                   │
        │                   │ • id              │
        │                   │ • name            │
        │                   │ • type            │
        │                   │   (dietary/time/  │
        │                   │    category/meal) │
        │                   │ • display_order   │
        │                   └───────────────────┘
        │
        │
        ├──────────1:N─────▶┌──────────────────────┐
        │                   │   ShoppingLists      │
        │                   │                      │
        │                   │ • id                 │
        │                   │ • user_id (FK)       │
        │                   │ • meal_plan_id (FK)  │
        │                   │ • created_at         │
        │                   │ • updated_at         │
        │                   └──────────────────────┘
        │                            │
        │                            │1:N
        │                            │
        │                   ┌────────▼──────────┐
        │                   │ ShoppingListItems │
        │                   │                   │
        │                   │ • id              │
        │                   │ • shopping_list_id│
        │                   │ • ingredient_id(FK)│
        │                   │ • quantity        │
        │                   │ • unit            │
        │                   │ • is_checked      │
        │                   │ • is_manual       │
        │                   │ • created_at      │
        │                   └───────────────────┘
```

---

## Différences SQLite vs PostgreSQL

| Aspect | PostgreSQL | SQLite | Adaptation |
|--------|-----------|--------|------------|
| **Clés primaires** | UUID | INTEGER | `INTEGER PRIMARY KEY AUTOINCREMENT` |
| **JSON** | JSONB | TEXT | Stocker JSON en TEXT, parser côté app |
| **Arrays** | ARRAY[] | TEXT | Stocker en JSON TEXT ou table de liaison |
| **Boolean** | BOOLEAN | INTEGER | `INTEGER CHECK(col IN (0,1))` |
| **Date/Time** | TIMESTAMP | TEXT | Format ISO 8601 : `'2025-11-06 12:00:00'` |
| **Contraintes** | Supportées | Limitées | Pas de clés étrangères activées par défaut |

---

## Script de Configuration SQLite

Avant toute chose, activer les clés étrangères (désactivées par défaut dans SQLite) :

```sql
-- À exécuter à chaque connexion
PRAGMA foreign_keys = ON;
```

---

## Tables Détaillées

### 1. Users (Utilisateurs)

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    profile_picture_url TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_users_email ON users(email);
```

**Usage** : Issue #1, #2, #3, #4 - Authentification et personnalisation

---

### 2. UserPreferences (Préférences utilisateur)

```sql
CREATE TABLE user_preferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    dietary_type TEXT CHECK(dietary_type IN (
        'omnivore', 'vegetarian', 'vegan', 'pescatarian',
        'keto', 'paleo', 'low_carb', 'mediterranean'
    )),
    meals_per_day INTEGER DEFAULT 3 CHECK(meals_per_day IN (2, 3, 4)),
    meal_plan_length_weeks INTEGER DEFAULT 1,
    include_leftovers INTEGER DEFAULT 0 CHECK(include_leftovers IN (0, 1)),
    auto_generate_grocery_list INTEGER DEFAULT 1 CHECK(auto_generate_grocery_list IN (0, 1)),
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_preferences_user ON user_preferences(user_id);
```

**Usage** : Issue #2 - Écran Settings

---

### 3. Categories (Catégories d'ingrédients)

```sql
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    display_order INTEGER DEFAULT 0,
    icon TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_categories_display_order ON categories(display_order);
```

**Usage** : Issue #3 - Organisation de la Shopping List

---

### 4. Ingredients (Ingrédients)

```sql
CREATE TABLE ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    category_id INTEGER,
    unit_type TEXT CHECK(unit_type IN ('weight', 'volume', 'count', 'bunch')),
    common_allergen INTEGER DEFAULT 0 CHECK(common_allergen IN (0, 1)),
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX idx_ingredients_category ON ingredients(category_id);
CREATE INDEX idx_ingredients_name ON ingredients(name);
CREATE INDEX idx_ingredients_allergen ON ingredients(common_allergen);
```

**Usage** : Issue #2, #3, #4 - Gestion des ingrédients et allergies

---

### 5. UserAllergies (Allergies utilisateur)

```sql
CREATE TABLE user_allergies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_preference_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    severity TEXT DEFAULT 'moderate' CHECK(severity IN ('mild', 'moderate', 'severe')),
    FOREIGN KEY (user_preference_id) REFERENCES user_preferences(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE,
    UNIQUE(user_preference_id, ingredient_id)
);

CREATE INDEX idx_user_allergies_pref ON user_allergies(user_preference_id);
CREATE INDEX idx_user_allergies_ingredient ON user_allergies(ingredient_id);
```

**Usage** : Issue #2 - Sélection des allergies

---

### 6. UserExcludedIngredients (Ingrédients exclus)

```sql
CREATE TABLE user_excluded_ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_preference_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    reason TEXT,
    FOREIGN KEY (user_preference_id) REFERENCES user_preferences(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE,
    UNIQUE(user_preference_id, ingredient_id)
);

CREATE INDEX idx_user_excluded_pref ON user_excluded_ingredients(user_preference_id);
CREATE INDEX idx_user_excluded_ingredient ON user_excluded_ingredients(ingredient_id);
```

**Usage** : Issue #2 - Section "Exclude Ingredients"

---

### 7. Recipes (Recettes)

```sql
CREATE TABLE recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    prep_time_minutes INTEGER,
    cook_time_minutes INTEGER,
    total_time_minutes INTEGER,
    servings INTEGER DEFAULT 4,
    instructions TEXT,  -- JSON stored as TEXT: [{"step": 1, "instruction": "..."}]
    difficulty TEXT CHECK(difficulty IN ('easy', 'medium', 'hard')),
    calories_per_serving INTEGER,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_recipes_name ON recipes(name);
CREATE INDEX idx_recipes_total_time ON recipes(total_time_minutes);
CREATE INDEX idx_recipes_difficulty ON recipes(difficulty);
```

**Usage** : Issue #1, #4 - Affichage et découverte de recettes

**Note** : Le champ `instructions` stocke du JSON en tant que TEXT. Exemple :
```json
[
  {"step": 1, "instruction": "Preheat oven to 180°C"},
  {"step": 2, "instruction": "Mix ingredients in a bowl"}
]
```

---

### 8. RecipeIngredients (Ingrédients des recettes)

```sql
CREATE TABLE recipe_ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    quantity REAL NOT NULL CHECK(quantity > 0),
    unit TEXT NOT NULL,
    optional INTEGER DEFAULT 0 CHECK(optional IN (0, 1)),
    preparation_note TEXT,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE,
    UNIQUE(recipe_id, ingredient_id)
);

CREATE INDEX idx_recipe_ingredients_recipe ON recipe_ingredients(recipe_id);
CREATE INDEX idx_recipe_ingredients_ingredient ON recipe_ingredients(ingredient_id);
```

**Usage** : Issue #1, #3, #4 - Composition des recettes et génération de liste de courses

---

### 9. Tags (Tags de recettes)

```sql
CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('dietary', 'time', 'category', 'meal')),
    display_name TEXT,
    display_order INTEGER DEFAULT 0,
    color TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_tags_type ON tags(type);
CREATE INDEX idx_tags_name ON tags(name);
```

**Exemples de tags** :
- **Dietary** : `vegetarian`, `vegan`, `gluten_free`, `dairy_free`
- **Time** : `quick_easy`, `under_30_min`
- **Category** : `low_carb`, `keto`, `family_friendly`, `desserts`
- **Meal** : `breakfast`, `lunch`, `dinner`, `snack`

**Usage** : Issue #4 - Filtrage de recettes

---

### 10. RecipeTags (Liaison Recettes-Tags)

```sql
CREATE TABLE recipe_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE(recipe_id, tag_id)
);

CREATE INDEX idx_recipe_tags_recipe ON recipe_tags(recipe_id);
CREATE INDEX idx_recipe_tags_tag ON recipe_tags(tag_id);
```

**Usage** : Issue #4 - Système de filtrage

---

### 11. MealPlans (Plans de repas)

```sql
CREATE TABLE meal_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    is_active INTEGER DEFAULT 1 CHECK(is_active IN (0, 1)),
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CHECK(date(end_date) >= date(start_date))
);

CREATE INDEX idx_meal_plans_user ON meal_plans(user_id);
CREATE INDEX idx_meal_plans_dates ON meal_plans(start_date, end_date);
CREATE INDEX idx_meal_plans_active ON meal_plans(user_id, is_active);
```

**Usage** : Issue #1 - Planification hebdomadaire (desktop)

---

### 12. PlannedMeals (Repas planifiés)

```sql
CREATE TABLE planned_meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    meal_plan_id INTEGER NOT NULL,
    recipe_id INTEGER NOT NULL,
    meal_date TEXT NOT NULL,
    meal_type TEXT NOT NULL CHECK(meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
    is_cooked INTEGER DEFAULT 0 CHECK(is_cooked IN (0, 1)),
    cooked_at TEXT,
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (meal_plan_id) REFERENCES meal_plans(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    UNIQUE(meal_plan_id, meal_date, meal_type)
);

CREATE INDEX idx_planned_meals_plan ON planned_meals(meal_plan_id);
CREATE INDEX idx_planned_meals_date ON planned_meals(meal_date);
CREATE INDEX idx_planned_meals_recipe ON planned_meals(recipe_id);
CREATE INDEX idx_planned_meals_plan_date_type ON planned_meals(meal_plan_id, meal_date, meal_type);
```

**Usage** : Issue #1 - Daily Digest et This Week's Meal Plan

---

### 13. ShoppingLists (Listes de courses)

```sql
CREATE TABLE shopping_lists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    meal_plan_id INTEGER,
    name TEXT DEFAULT 'Shopping List',
    is_active INTEGER DEFAULT 1 CHECK(is_active IN (0, 1)),
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (meal_plan_id) REFERENCES meal_plans(id) ON DELETE SET NULL
);

CREATE INDEX idx_shopping_lists_user ON shopping_lists(user_id);
CREATE INDEX idx_shopping_lists_meal_plan ON shopping_lists(meal_plan_id);
CREATE INDEX idx_shopping_lists_active ON shopping_lists(user_id, is_active);
```

**Usage** : Issue #3 - Gestion de la liste de courses

---

### 14. ShoppingListItems (Articles de la liste de courses)

```sql
CREATE TABLE shopping_list_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shopping_list_id INTEGER NOT NULL,
    ingredient_id INTEGER,
    custom_name TEXT,
    quantity REAL NOT NULL CHECK(quantity > 0),
    unit TEXT NOT NULL,
    is_checked INTEGER DEFAULT 0 CHECK(is_checked IN (0, 1)),
    is_manual INTEGER DEFAULT 0 CHECK(is_manual IN (0, 1)),
    checked_at TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (shopping_list_id) REFERENCES shopping_lists(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

CREATE INDEX idx_shopping_list_items_list ON shopping_list_items(shopping_list_id);
CREATE INDEX idx_shopping_list_items_ingredient ON shopping_list_items(ingredient_id);
CREATE INDEX idx_shopping_list_items_checked ON shopping_list_items(shopping_list_id, is_checked);
```

**Usage** : Issue #3 - Items de la Shopping List avec cases à cocher

---

## Vues Utiles

### Vue : Recettes avec leurs tags

```sql
CREATE VIEW recipes_with_tags AS
SELECT
    r.id,
    r.name,
    r.description,
    r.image_url,
    r.total_time_minutes,
    r.servings,
    r.difficulty,
    GROUP_CONCAT(DISTINCT t.name) as tags,
    GROUP_CONCAT(DISTINCT t.type) as tag_types
FROM recipes r
LEFT JOIN recipe_tags rt ON r.id = rt.recipe_id
LEFT JOIN tags t ON rt.tag_id = t.id
GROUP BY r.id, r.name, r.description, r.image_url, r.total_time_minutes, r.servings, r.difficulty;
```

### Vue : Liste de courses groupée par catégorie

```sql
CREATE VIEW shopping_list_by_category AS
SELECT
    sli.shopping_list_id,
    c.name as category_name,
    c.display_order,
    COALESCE(i.name, sli.custom_name) as item_name,
    sli.quantity,
    sli.unit,
    sli.is_checked,
    sli.id as item_id
FROM shopping_list_items sli
LEFT JOIN ingredients i ON sli.ingredient_id = i.id
LEFT JOIN categories c ON i.category_id = c.id
ORDER BY c.display_order, item_name;
```

### Vue : Repas planifiés avec détails

```sql
CREATE VIEW planned_meals_details AS
SELECT
    pm.id,
    pm.meal_plan_id,
    pm.meal_date,
    pm.meal_type,
    pm.is_cooked,
    r.id as recipe_id,
    r.name as recipe_name,
    r.description as recipe_description,
    r.image_url as recipe_image,
    r.prep_time_minutes,
    r.cook_time_minutes,
    r.total_time_minutes
FROM planned_meals pm
JOIN recipes r ON pm.recipe_id = r.id;
```

---

## Triggers SQLite

### Trigger : Mise à jour automatique de `updated_at`

```sql
-- Users
CREATE TRIGGER update_users_timestamp
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    UPDATE users SET updated_at = datetime('now') WHERE id = OLD.id;
END;

-- Recipes
CREATE TRIGGER update_recipes_timestamp
AFTER UPDATE ON recipes
FOR EACH ROW
BEGIN
    UPDATE recipes SET updated_at = datetime('now') WHERE id = OLD.id;
END;

-- UserPreferences
CREATE TRIGGER update_user_preferences_timestamp
AFTER UPDATE ON user_preferences
FOR EACH ROW
BEGIN
    UPDATE user_preferences SET updated_at = datetime('now') WHERE id = OLD.id;
END;

-- MealPlans
CREATE TRIGGER update_meal_plans_timestamp
AFTER UPDATE ON meal_plans
FOR EACH ROW
BEGIN
    UPDATE meal_plans SET updated_at = datetime('now') WHERE id = OLD.id;
END;

-- PlannedMeals
CREATE TRIGGER update_planned_meals_timestamp
AFTER UPDATE ON planned_meals
FOR EACH ROW
BEGIN
    UPDATE planned_meals SET updated_at = datetime('now') WHERE id = OLD.id;
END;

-- ShoppingLists
CREATE TRIGGER update_shopping_lists_timestamp
AFTER UPDATE ON shopping_lists
FOR EACH ROW
BEGIN
    UPDATE shopping_lists SET updated_at = datetime('now') WHERE id = OLD.id;
END;

-- ShoppingListItems
CREATE TRIGGER update_shopping_list_items_timestamp
AFTER UPDATE ON shopping_list_items
FOR EACH ROW
BEGIN
    UPDATE shopping_list_items SET updated_at = datetime('now') WHERE id = OLD.id;
END;

-- Ingredients
CREATE TRIGGER update_ingredients_timestamp
AFTER UPDATE ON ingredients
FOR EACH ROW
BEGIN
    UPDATE ingredients SET updated_at = datetime('now') WHERE id = OLD.id;
END;
```

### Trigger : Mettre à jour `checked_at` quand un item est coché

```sql
CREATE TRIGGER update_shopping_item_checked_at
AFTER UPDATE OF is_checked ON shopping_list_items
FOR EACH ROW
WHEN NEW.is_checked = 1 AND OLD.is_checked = 0
BEGIN
    UPDATE shopping_list_items SET checked_at = datetime('now') WHERE id = NEW.id;
END;
```

---

## Requêtes Principales par Issue

### Issue #1 : Home Page

#### Daily Digest (Mobile) - Repas du jour

```sql
-- Récupérer les repas planifiés pour aujourd'hui
SELECT
    pm.meal_type,
    r.id,
    r.name,
    r.image_url,
    r.total_time_minutes
FROM planned_meals pm
JOIN recipes r ON pm.recipe_id = r.id
JOIN meal_plans mp ON pm.meal_plan_id = mp.id
WHERE mp.user_id = ?
  AND mp.is_active = 1
  AND date(pm.meal_date) = date('now')
ORDER BY
    CASE pm.meal_type
        WHEN 'breakfast' THEN 1
        WHEN 'lunch' THEN 2
        WHEN 'dinner' THEN 3
        ELSE 4
    END;
```

#### This Week's Meal Plan (Desktop)

```sql
-- Récupérer tous les repas de la semaine
SELECT
    pm.meal_date,
    pm.meal_type,
    r.id,
    r.name,
    r.image_url
FROM planned_meals pm
JOIN recipes r ON pm.recipe_id = r.id
JOIN meal_plans mp ON pm.meal_plan_id = mp.id
WHERE mp.user_id = ?
  AND mp.is_active = 1
  AND date(pm.meal_date) >= date('now', 'weekday 0', '-6 days')
  AND date(pm.meal_date) <= date('now', 'weekday 0')
ORDER BY pm.meal_date, pm.meal_type;
```

#### Upcoming Meals

```sql
-- Récupérer les prochains repas à venir
SELECT
    r.name,
    r.image_url,
    pm.meal_date,
    pm.meal_type
FROM planned_meals pm
JOIN recipes r ON pm.recipe_id = r.id
JOIN meal_plans mp ON pm.meal_plan_id = mp.id
WHERE mp.user_id = ?
  AND mp.is_active = 1
  AND (date(pm.meal_date) > date('now') OR
       (date(pm.meal_date) = date('now') AND pm.is_cooked = 0))
ORDER BY pm.meal_date, pm.meal_type
LIMIT 5;
```

---

### Issue #2 : Settings

#### Récupérer les préférences utilisateur

```sql
SELECT
    up.*,
    GROUP_CONCAT(DISTINCT i_allergy.name) as allergies,
    GROUP_CONCAT(DISTINCT i_excluded.name) as excluded_ingredients
FROM user_preferences up
LEFT JOIN user_allergies ua ON up.id = ua.user_preference_id
LEFT JOIN ingredients i_allergy ON ua.ingredient_id = i_allergy.id
LEFT JOIN user_excluded_ingredients uei ON up.id = uei.user_preference_id
LEFT JOIN ingredients i_excluded ON uei.ingredient_id = i_excluded.id
WHERE up.user_id = ?
GROUP BY up.id;
```

#### Sauvegarder les préférences (INSERT OR REPLACE)

```sql
-- SQLite utilise INSERT OR REPLACE pour upsert
INSERT OR REPLACE INTO user_preferences (
    user_id,
    dietary_type,
    meals_per_day,
    meal_plan_length_weeks,
    include_leftovers,
    auto_generate_grocery_list
)
VALUES (?, ?, ?, ?, ?, ?);
```

---

### Issue #3 : Shopping List

#### Récupérer la liste de courses groupée par catégorie

```sql
SELECT
    c.name as category_name,
    c.display_order,
    COALESCE(i.name, sli.custom_name) as item_name,
    sli.quantity,
    sli.unit,
    sli.is_checked,
    sli.id as item_id
FROM shopping_lists sl
JOIN shopping_list_items sli ON sl.id = sli.shopping_list_id
LEFT JOIN ingredients i ON sli.ingredient_id = i.id
LEFT JOIN categories c ON i.category_id = c.id
WHERE sl.user_id = ?
  AND sl.is_active = 1
ORDER BY
    CASE WHEN c.display_order IS NULL THEN 999 ELSE c.display_order END,
    item_name;
```

#### Générer automatiquement la liste de courses

```sql
-- Agréger tous les ingrédients nécessaires pour les repas planifiés
INSERT INTO shopping_list_items (shopping_list_id, ingredient_id, quantity, unit, is_manual)
SELECT
    ? as shopping_list_id,
    ri.ingredient_id,
    SUM(ri.quantity) as quantity,
    ri.unit,
    0 as is_manual
FROM planned_meals pm
JOIN recipes r ON pm.recipe_id = r.id
JOIN recipe_ingredients ri ON r.id = ri.recipe_id
JOIN meal_plans mp ON pm.meal_plan_id = mp.id
WHERE mp.id = ?
  AND pm.is_cooked = 0
GROUP BY ri.ingredient_id, ri.unit;
```

---

### Issue #4 : Recipe Discovery

#### Rechercher et filtrer les recettes

```sql
SELECT DISTINCT
    r.id,
    r.name,
    r.description,
    r.image_url,
    r.total_time_minutes,
    r.difficulty
FROM recipes r
LEFT JOIN recipe_tags rt ON r.id = rt.recipe_id
LEFT JOIN tags t ON rt.tag_id = t.id
WHERE
    -- Recherche par texte
    (r.name LIKE '%' || ? || '%' OR
     r.description LIKE '%' || ? || '%' OR
     ? IS NULL)

    -- Filtrage par tags (exemple pour un tag)
    AND (t.name = ? OR ? IS NULL)

    -- Exclure les recettes avec des ingrédients exclus par l'utilisateur
    AND NOT EXISTS (
        SELECT 1 FROM recipe_ingredients ri
        JOIN user_excluded_ingredients uei ON ri.ingredient_id = uei.ingredient_id
        JOIN user_preferences up ON uei.user_preference_id = up.id
        WHERE ri.recipe_id = r.id AND up.user_id = ?
    )

    -- Exclure les recettes avec des allergènes
    AND NOT EXISTS (
        SELECT 1 FROM recipe_ingredients ri
        JOIN user_allergies ua ON ri.ingredient_id = ua.ingredient_id
        JOIN user_preferences up ON ua.user_preference_id = up.id
        WHERE ri.recipe_id = r.id AND up.user_id = ?
    )

ORDER BY r.created_at DESC
LIMIT ? OFFSET ?;
```

#### Récupérer les tags disponibles pour les filtres

```sql
SELECT
    id,
    name,
    display_name,
    type,
    display_order
FROM tags
WHERE type IN ('dietary', 'time', 'category', 'meal')
ORDER BY type, display_order;
```

---

## Données de Référence à Précharger

### Catégories (Categories)

```sql
INSERT INTO categories (name, display_order, icon) VALUES
('Produce', 1, '🥬'),
('Dairy', 2, '🥛'),
('Meat', 3, '🥩'),
('Seafood', 4, '🐟'),
('Pantry', 5, '🏺'),
('Bakery', 6, '🍞'),
('Frozen', 7, '🧊'),
('Beverages', 8, '☕');
```

### Tags

```sql
INSERT INTO tags (name, type, display_name, display_order) VALUES
-- Dietary tags
('vegetarian', 'dietary', 'Vegetarian', 1),
('vegan', 'dietary', 'Vegan', 2),
('gluten_free', 'dietary', 'Gluten-Free', 3),
('dairy_free', 'dietary', 'Dairy-Free', 4),

-- Time tags
('quick_easy', 'time', 'Quick & Easy', 1),
('under_30_min', 'time', 'Under 30 Minutes', 2),

-- Category tags
('low_carb', 'category', 'Low Carb', 1),
('keto', 'category', 'Keto', 2),
('family_friendly', 'category', 'Family-Friendly', 3),
('desserts', 'category', 'Desserts', 4),

-- Meal tags
('breakfast', 'meal', 'Breakfast', 1),
('lunch', 'meal', 'Lunch', 2),
('dinner', 'meal', 'Dinner', 3),
('snack', 'meal', 'Snack', 4);
```

### Utilisateur par défaut (utilisateur unique)

```sql
INSERT INTO users (id, email, name) VALUES
(1, 'user@mealplanner.local', 'Default User');

INSERT INTO user_preferences (user_id, dietary_type, meals_per_day) VALUES
(1, 'omnivore', 3);
```

---

## Script de Migration Complet

```sql
-- Enable foreign keys
PRAGMA foreign_keys = ON;

-- Create all tables in order (respecting dependencies)
-- 1. Tables without dependencies
-- ... (toutes les CREATE TABLE ci-dessus)

-- 2. Create indexes
-- ... (tous les CREATE INDEX ci-dessus)

-- 3. Create triggers
-- ... (tous les CREATE TRIGGER ci-dessus)

-- 4. Create views
-- ... (tous les CREATE VIEW ci-dessus)

-- 5. Insert seed data
-- ... (categories, tags, default user)
```

---

## Gestion des Migrations

### Structure des migrations

```
server/src/db/migrations/
  ├── 001_initial_schema.sql
  ├── 002_add_recipe_calories.sql
  └── 003_add_user_timezone.sql
```

### Script de migration simple (JavaScript)

```javascript
// db/migrate.js
const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')
const path = require('path')

const db = new sqlite3.Database('./data/mealplanner.db')

const migrationsDir = path.join(__dirname, 'migrations')
const migrationFiles = fs.readdirSync(migrationsDir).sort()

db.serialize(() => {
  // Enable foreign keys
  db.run('PRAGMA foreign_keys = ON')

  // Create migrations table if not exists
  db.run(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT UNIQUE NOT NULL,
      executed_at TEXT DEFAULT (datetime('now'))
    )
  `)

  migrationFiles.forEach(file => {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8')

    db.get('SELECT * FROM migrations WHERE filename = ?', [file], (err, row) => {
      if (!row) {
        db.exec(sql, (err) => {
          if (err) {
            console.error(`Error executing ${file}:`, err.message)
          } else {
            db.run('INSERT INTO migrations (filename) VALUES (?)', [file])
            console.log(`✅ Executed migration: ${file}`)
          }
        })
      }
    })
  })
})
```

---

## Évolutions Futures

### 1. Système de notation et favoris

```sql
CREATE TABLE recipe_ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    recipe_id INTEGER NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    review TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    UNIQUE(user_id, recipe_id)
);

CREATE TABLE user_favorite_recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    recipe_id INTEGER NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    UNIQUE(user_id, recipe_id)
);
```

### 2. Système de notifications

```sql
CREATE TABLE notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('meal_reminder', 'shopping_list', 'new_recipe')),
    title TEXT,
    message TEXT,
    is_read INTEGER DEFAULT 0 CHECK(is_read IN (0, 1)),
    related_entity_type TEXT,
    related_entity_id INTEGER,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
```

---

## Notes Techniques SQLite

### Limitations SQLite

1. **Pas de type BOOLEAN natif** → Utiliser INTEGER avec CHECK(col IN (0,1))
2. **Pas de type DATE/TIMESTAMP natif** → Utiliser TEXT avec format ISO 8601
3. **Pas d'arrays** → Utiliser JSON en TEXT ou tables de liaison
4. **Clés étrangères désactivées par défaut** → Toujours exécuter `PRAGMA foreign_keys = ON`
5. **Pas de fonction ARRAY_AGG** → Utiliser GROUP_CONCAT

### Fonctions de Date SQLite

```sql
-- Date du jour
date('now')  -- '2025-11-06'

-- Datetime avec heure
datetime('now')  -- '2025-11-06 12:34:56'

-- Ajouter/soustraire des jours
date('now', '+7 days')
date('now', '-1 month')

-- Début de semaine (lundi)
date('now', 'weekday 0', '-6 days')

-- Fin de semaine (dimanche)
date('now', 'weekday 0')

-- Comparaisons
WHERE date(meal_date) = date('now')
WHERE date(meal_date) >= date('now', '-7 days')
```

### Gestion du JSON en SQLite

```javascript
// Côté backend : Parser le JSON
const recipe = await db.get('SELECT * FROM recipes WHERE id = ?', [id])
recipe.instructions = JSON.parse(recipe.instructions)

// Côté backend : Stringify avant insertion
const instructionsJSON = JSON.stringify([
  { step: 1, instruction: "Preheat oven" },
  { step: 2, instruction: "Mix ingredients" }
])
await db.run(
  'INSERT INTO recipes (name, instructions) VALUES (?, ?)',
  [name, instructionsJSON]
)
```

### Performance SQLite

```sql
-- Analyser les performances
EXPLAIN QUERY PLAN
SELECT * FROM recipes WHERE name LIKE '%pasta%';

-- Vacuum pour optimiser la DB
VACUUM;

-- Analyser pour optimiser les index
ANALYZE;
```

---

## Conclusion

Ce schéma de base de données SQLite couvre l'ensemble des fonctionnalités décrites dans les Issues #1 à #4 :

✅ **Issue #1** : MealPlans, PlannedMeals, Recipes
✅ **Issue #2** : UserPreferences, UserAllergies, UserExcludedIngredients
✅ **Issue #3** : ShoppingLists, ShoppingListItems, Categories
✅ **Issue #4** : Recipes, Tags, RecipeTags, recherche et filtrage

Le schéma est conçu pour être :
- **Compatible SQLite** : Types de données adaptés
- **Performant** : Index optimisés pour les requêtes fréquentes
- **Flexible** : Facile d'ajouter de nouvelles fonctionnalités
- **Maintenable** : Structure claire et bien documentée
- **Scalable** : Migration possible vers PostgreSQL/MySQL si nécessaire

**Prêt pour le développement ! 🚀**
