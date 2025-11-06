const fs = require('fs')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const { v4: uuidv4 } = require('uuid')

// Installer uuid si nécessaire : npm install uuid

const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, '../../../data/mealplanner.db')

console.log('🌱 Seed de la base de données...')

const db = new sqlite3.Database(DB_PATH)

// Données de seed
const recipes = [
  // Breakfast
  { id: uuidv4(), name: 'Oatmeal with Berries', description: 'Healthy breakfast with oats and fresh berries', image_url: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&h=300&fit=crop', prep_time_minutes: 5, cook_time_minutes: 10, meal_type: 'breakfast' },
  { id: uuidv4(), name: 'Scrambled Eggs with Toast', description: 'Classic breakfast with protein', image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop', prep_time_minutes: 5, cook_time_minutes: 10, meal_type: 'breakfast' },
  { id: uuidv4(), name: 'Pancakes', description: 'Fluffy American pancakes', image_url: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop', prep_time_minutes: 10, cook_time_minutes: 15, meal_type: 'breakfast' },
  { id: uuidv4(), name: 'Avocado Toast', description: 'Trendy and healthy breakfast', image_url: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop', prep_time_minutes: 5, cook_time_minutes: 5, meal_type: 'breakfast' },

  // Lunch
  { id: uuidv4(), name: 'Caesar Salad', description: 'Fresh caesar salad with chicken', image_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop', prep_time_minutes: 15, cook_time_minutes: 0, meal_type: 'lunch' },
  { id: uuidv4(), name: 'Grilled Chicken Sandwich', description: 'Healthy lunch option', image_url: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop', prep_time_minutes: 10, cook_time_minutes: 15, meal_type: 'lunch' },
  { id: uuidv4(), name: 'Quinoa Bowl', description: 'Nutritious bowl with vegetables', image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', prep_time_minutes: 15, cook_time_minutes: 20, meal_type: 'lunch' },
  { id: uuidv4(), name: 'Tuna Wrap', description: 'Quick and easy wrap', image_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop', prep_time_minutes: 10, cook_time_minutes: 0, meal_type: 'lunch' },

  // Dinner
  { id: uuidv4(), name: 'Spaghetti Bolognese', description: 'Italian classic pasta', image_url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop', prep_time_minutes: 15, cook_time_minutes: 30, meal_type: 'dinner' },
  { id: uuidv4(), name: 'Grilled Salmon with Vegetables', description: 'Healthy omega-3 rich dinner', image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop', prep_time_minutes: 10, cook_time_minutes: 20, meal_type: 'dinner' },
  { id: uuidv4(), name: 'Chicken Stir-Fry', description: 'Asian-inspired quick dinner', image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop', prep_time_minutes: 15, cook_time_minutes: 15, meal_type: 'dinner' },
  { id: uuidv4(), name: 'Vegetable Curry', description: 'Flavorful vegetarian option', image_url: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop', prep_time_minutes: 20, cook_time_minutes: 30, meal_type: 'dinner' }
]

// Générer des meal plans pour les 7 prochains jours
const mealPlans = []
const today = new Date()

for (let i = 0; i < 7; i++) {
  const date = new Date(today)
  date.setDate(today.getDate() + i)
  const dateStr = date.toISOString().split('T')[0]

  // Breakfast
  const breakfastRecipe = recipes.filter(r => r.meal_type === 'breakfast')[i % 4]
  mealPlans.push({
    id: uuidv4(),
    date: dateStr,
    meal_type: 'breakfast',
    recipe_id: breakfastRecipe.id,
    cooked: 0
  })

  // Lunch
  const lunchRecipe = recipes.filter(r => r.meal_type === 'lunch')[i % 4]
  mealPlans.push({
    id: uuidv4(),
    date: dateStr,
    meal_type: 'lunch',
    recipe_id: lunchRecipe.id,
    cooked: 0
  })

  // Dinner
  const dinnerRecipe = recipes.filter(r => r.meal_type === 'dinner')[i % 4]
  mealPlans.push({
    id: uuidv4(),
    date: dateStr,
    meal_type: 'dinner',
    recipe_id: dinnerRecipe.id,
    cooked: 0
  })
}

// Insérer les recettes
db.serialize(() => {
  // Clear existing data
  db.run('DELETE FROM meal_plans')
  db.run('DELETE FROM recipes')

  // Insert recipes
  const insertRecipe = db.prepare(`
    INSERT INTO recipes (id, name, description, image_url, prep_time_minutes, cook_time_minutes, meal_type)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  recipes.forEach(recipe => {
    insertRecipe.run(
      recipe.id,
      recipe.name,
      recipe.description,
      recipe.image_url,
      recipe.prep_time_minutes,
      recipe.cook_time_minutes,
      recipe.meal_type
    )
  })

  insertRecipe.finalize()
  console.log(`✅ ${recipes.length} recettes insérées`)

  // Insert meal plans
  const insertMealPlan = db.prepare(`
    INSERT INTO meal_plans (id, date, meal_type, recipe_id, cooked)
    VALUES (?, ?, ?, ?, ?)
  `)

  mealPlans.forEach(plan => {
    insertMealPlan.run(
      plan.id,
      plan.date,
      plan.meal_type,
      plan.recipe_id,
      plan.cooked
    )
  })

  insertMealPlan.finalize()
  console.log(`✅ ${mealPlans.length} meal plans insérés (7 jours)`)

  // Verify
  db.get('SELECT COUNT(*) as count FROM recipes', [], (err, row) => {
    if (!err) console.log(`📊 Total recipes: ${row.count}`)
  })

  db.get('SELECT COUNT(*) as count FROM meal_plans', [], (err, row) => {
    if (!err) console.log(`📊 Total meal plans: ${row.count}`)
  })

  db.close(() => {
    console.log('✅ Seed terminé!')
  })
})
