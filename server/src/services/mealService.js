const mealRepository = require('../repositories/mealRepository')
const recipeRepository = require('../repositories/recipeRepository')

// ===== Main Service Functions =====

exports.getDailyMeals = async (date) => {
  const meals = await mealRepository.findByDate(date)

  return {
    date,
    breakfast: formatMeal(meals.find(m => m.meal_type === 'breakfast')),
    lunch: formatMeal(meals.find(m => m.meal_type === 'lunch')),
    dinner: formatMeal(meals.find(m => m.meal_type === 'dinner'))
  }
}

exports.getWeeklyMeals = async (startDate) => {
  const start = startDate ? new Date(startDate) : getStartOfWeek(new Date())
  const meals = await mealRepository.findByWeek(start)

  // Formater les données par jour
  const weeklyPlan = buildWeeklyPlan(start, meals)

  return weeklyPlan
}

exports.getUpcomingMeals = async (limit) => {
  const now = new Date()
  const meals = await mealRepository.findUpcoming(now, limit)

  return meals.map(meal => formatMeal(meal))
}

exports.swapMeal = async (mealId) => {
  // 1. Récupérer le repas actuel
  const currentMeal = await mealRepository.findById(mealId)

  if (!currentMeal) {
    throw new Error(`Meal with id ${mealId} not found`)
  }

  // 2. Obtenir une recette alternative du même type
  const alternativeRecipe = await recipeRepository.findRandomByMealType(
    currentMeal.meal_type
  )

  // 3. Mettre à jour le repas
  const updatedMeal = await mealRepository.update(mealId, {
    recipe_id: alternativeRecipe.id
  })

  return formatMeal(updatedMeal)
}

exports.markAsCooked = async (mealId) => {
  const result = await mealRepository.update(mealId, {
    cooked: true,
    cooked_at: new Date()
  })

  return formatMeal(result)
}

// ===== Helper Functions =====

/**
 * Retourne le lundi de la semaine pour une date donnée
 * @param {Date} date
 * @returns {Date} Le lundi de la semaine
 */
function getStartOfWeek(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Lundi
  return new Date(d.setDate(diff))
}

/**
 * Construit un plan hebdomadaire avec 7 jours (lundi à dimanche)
 * @param {Date} startDate
 * @param {Array} meals
 * @returns {Object} Plan hebdomadaire avec startDate, endDate et days[]
 */
function buildWeeklyPlan(startDate, meals) {
  const days = []
  const start = new Date(startDate)

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(start)
    currentDate.setDate(start.getDate() + i)
    const dateStr = currentDate.toISOString().split('T')[0]

    const dayMeals = meals.filter(m => m.date === dateStr)

    days.push({
      day: currentDate.toLocaleDateString('en-US', { weekday: 'long' }),
      date: dateStr,
      meals: {
        date: dateStr,
        breakfast: formatMeal(dayMeals.find(m => m.meal_type === 'breakfast')),
        lunch: formatMeal(dayMeals.find(m => m.meal_type === 'lunch')),
        dinner: formatMeal(dayMeals.find(m => m.meal_type === 'dinner'))
      }
    })
  }

  const endDate = new Date(start)
  endDate.setDate(start.getDate() + 6)

  return {
    startDate: start.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    days
  }
}

/**
 * Formate un repas du format repository au format API
 * @param {Object|undefined} meal
 * @returns {Object|null} Repas formaté ou null
 */
function formatMeal(meal) {
  if (!meal) return null

  return {
    id: meal.id,
    date: meal.date,
    mealType: meal.meal_type,
    cooked: meal.cooked || false,
    cookedAt: meal.cooked_at || null,
    recipe: {
      id: meal.recipe_id,
      name: meal.recipe_name,
      description: meal.recipe_description,
      imageUrl: meal.recipe_image_url,
      prepTimeMinutes: meal.prep_time_minutes,
      cookTimeMinutes: meal.cook_time_minutes
    }
  }
}
