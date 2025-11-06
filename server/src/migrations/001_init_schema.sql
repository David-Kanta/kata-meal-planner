-- Migration 001: Initial Schema
-- Création des tables recipes et meal_plans

-- Table des recettes
CREATE TABLE IF NOT EXISTS recipes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  prep_time_minutes INTEGER DEFAULT 0,
  cook_time_minutes INTEGER DEFAULT 0,
  meal_type TEXT CHECK(meal_type IN ('breakfast', 'lunch', 'dinner')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des plans de repas
CREATE TABLE IF NOT EXISTS meal_plans (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  meal_type TEXT NOT NULL CHECK(meal_type IN ('breakfast', 'lunch', 'dinner')),
  recipe_id TEXT NOT NULL,
  cooked INTEGER DEFAULT 0,
  cooked_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
  UNIQUE(date, meal_type)
);

-- Index pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_meal_plans_date ON meal_plans(date);
CREATE INDEX IF NOT EXISTS idx_meal_plans_meal_type ON meal_plans(meal_type);
CREATE INDEX IF NOT EXISTS idx_meal_plans_cooked ON meal_plans(cooked);
CREATE INDEX IF NOT EXISTS idx_recipes_meal_type ON recipes(meal_type);
