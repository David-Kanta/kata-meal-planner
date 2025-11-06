const express = require('express')
const router = express.Router()
const mealController = require('../controllers/mealController')

// Daily Digest - Mobile
router.get('/daily', mealController.getDailyMeals)

// Weekly Plan - Desktop
router.get('/weekly', mealController.getWeeklyMeals)

// Upcoming Meals
router.get('/upcoming', mealController.getUpcomingMeals)

// Swap Meal
router.post('/swap', mealController.swapMeal)

// Cook Now
router.put('/:id/cook', mealController.markAsCooked)

module.exports = router
