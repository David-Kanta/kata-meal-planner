const db = require('../config/database')

exports.findByDate = async (date) => {
  const query = `
    SELECT
      m.id,
      m.date,
      m.meal_type,
      m.cooked,
      m.cooked_at,
      r.id as recipe_id,
      r.name as recipe_name,
      r.description as recipe_description,
      r.image_url as recipe_image_url,
      r.prep_time_minutes,
      r.cook_time_minutes
    FROM meal_plans m
    INNER JOIN recipes r ON m.recipe_id = r.id
    WHERE m.date = ?
    ORDER BY
      CASE m.meal_type
        WHEN 'breakfast' THEN 1
        WHEN 'lunch' THEN 2
        WHEN 'dinner' THEN 3
      END
  `

  return await db.all(query, [date])
}

exports.findByWeek = async (startDate) => {
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 6)

  const query = `
    SELECT
      m.id,
      m.date,
      m.meal_type,
      m.cooked,
      m.cooked_at,
      r.id as recipe_id,
      r.name as recipe_name,
      r.description as recipe_description,
      r.image_url as recipe_image_url,
      r.prep_time_minutes,
      r.cook_time_minutes
    FROM meal_plans m
    INNER JOIN recipes r ON m.recipe_id = r.id
    WHERE m.date BETWEEN ? AND ?
    ORDER BY m.date, m.meal_type
  `

  return await db.all(query, [
    startDate.toISOString().split('T')[0],
    endDate.toISOString().split('T')[0]
  ])
}

exports.findUpcoming = async (fromDate, limit) => {
  const query = `
    SELECT
      m.id,
      m.date,
      m.meal_type,
      m.cooked,
      m.cooked_at,
      r.id as recipe_id,
      r.name as recipe_name,
      r.description as recipe_description,
      r.image_url as recipe_image_url,
      r.prep_time_minutes,
      r.cook_time_minutes
    FROM meal_plans m
    INNER JOIN recipes r ON m.recipe_id = r.id
    WHERE m.date >= date('now')
    AND m.cooked = 0
    ORDER BY m.date, m.meal_type
    LIMIT ?
  `

  return await db.all(query, [limit])
}

exports.findById = async (id) => {
  const query = `
    SELECT
      m.id,
      m.date,
      m.meal_type,
      m.cooked,
      m.cooked_at,
      m.recipe_id,
      r.name as recipe_name,
      r.description as recipe_description,
      r.image_url as recipe_image_url,
      r.prep_time_minutes,
      r.cook_time_minutes
    FROM meal_plans m
    INNER JOIN recipes r ON m.recipe_id = r.id
    WHERE m.id = ?
  `

  return await db.get(query, [id])
}

exports.update = async (id, data) => {
  const fields = Object.keys(data).map(key => `${key} = ?`).join(', ')
  const values = Object.values(data)

  await db.run(
    `UPDATE meal_plans SET ${fields} WHERE id = ?`,
    [...values, id]
  )

  return await exports.findById(id)
}
