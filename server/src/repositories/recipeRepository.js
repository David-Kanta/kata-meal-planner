const db = require('../config/database')

exports.findRandomByMealType = async (mealType) => {
  const query = `
    SELECT
      id,
      name,
      description,
      image_url,
      prep_time_minutes,
      cook_time_minutes,
      meal_type
    FROM recipes
    WHERE meal_type = ?
    ORDER BY RANDOM()
    LIMIT 1
  `

  return await db.get(query, [mealType])
}

exports.findAll = async () => {
  const query = `
    SELECT
      id,
      name,
      description,
      image_url,
      prep_time_minutes,
      cook_time_minutes,
      meal_type,
      created_at
    FROM recipes
    ORDER BY meal_type, name
  `

  return await db.all(query)
}

exports.findById = async (id) => {
  const query = `
    SELECT
      id,
      name,
      description,
      image_url,
      prep_time_minutes,
      cook_time_minutes,
      meal_type,
      created_at
    FROM recipes
    WHERE id = ?
  `

  return await db.get(query, [id])
}
