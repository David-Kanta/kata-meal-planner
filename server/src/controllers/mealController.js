const mealService = require('../services/mealService')

exports.getDailyMeals = async (req, res, next) => {
  try {
    const { date } = req.query
    const targetDate = date || new Date().toISOString().split('T')[0]

    const meals = await mealService.getDailyMeals(targetDate)

    res.json({
      success: true,
      data: meals
    })
  } catch (error) {
    next(error)
  }
}

exports.getWeeklyMeals = async (req, res, next) => {
  try {
    const { startDate } = req.query
    const weeklyPlan = await mealService.getWeeklyMeals(startDate)

    res.json({
      success: true,
      data: weeklyPlan
    })
  } catch (error) {
    next(error)
  }
}

exports.getUpcomingMeals = async (req, res, next) => {
  try {
    const { limit = 5 } = req.query
    const upcomingMeals = await mealService.getUpcomingMeals(parseInt(limit))

    res.json({
      success: true,
      data: upcomingMeals
    })
  } catch (error) {
    next(error)
  }
}

exports.swapMeal = async (req, res, next) => {
  try {
    const { mealId } = req.body
    const newMeal = await mealService.swapMeal(mealId)

    res.json({
      success: true,
      data: newMeal
    })
  } catch (error) {
    next(error)
  }
}

exports.markAsCooked = async (req, res, next) => {
  try {
    const { id } = req.params
    await mealService.markAsCooked(id)

    res.json({
      success: true,
      message: 'Meal marked as cooked'
    })
  } catch (error) {
    next(error)
  }
}
