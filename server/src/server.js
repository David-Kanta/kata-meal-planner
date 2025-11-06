const express = require('express')
const cors = require('cors')
require('dotenv').config()

const mealRoutes = require('./routes/mealRoutes')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'MealPlanner API',
    version: '1.0.0',
    endpoints: {
      meals: '/api/v1/meals'
    }
  })
})

app.use('/api/v1/meals', mealRoutes)

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  })
})

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`)
  console.log(`📋 API Meals: http://localhost:${PORT}/api/v1/meals`)
})

module.exports = app
