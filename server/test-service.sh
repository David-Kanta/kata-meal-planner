#!/bin/bash

# Script de test du Service Layer avec données mockées

BASE_URL="http://localhost:3000"
API_URL="$BASE_URL/api/v1/meals"

echo "🧪 Test du Service Layer MealPlanner"
echo "====================================="
echo ""
echo "Les logs [Mock] dans le terminal indiquent les appels aux repositories"
echo ""

# Test 1: GET /api/v1/meals/daily
echo "1️⃣  Test getDailyMeals - Date du jour"
echo "   Devrait appeler mealRepository.findByDate()"
echo "   Et formater les repas avec breakfast/lunch/dinner"
echo ""
curl -s "$API_URL/daily" | python3 -m json.tool
echo ""
echo ""

# Test 2: GET /api/v1/meals/weekly
echo "2️⃣  Test getWeeklyMeals - Plan hebdomadaire"
echo "   Devrait calculer le lundi de la semaine"
echo "   Appeler mealRepository.findByWeek()"
echo "   Et construire 7 jours (Monday à Sunday)"
echo ""
curl -s "$API_URL/weekly" | python3 -m json.tool
echo ""
echo ""

# Test 3: GET /api/v1/meals/upcoming
echo "3️⃣  Test getUpcomingMeals - Prochains repas"
echo "   Devrait appeler mealRepository.findUpcoming()"
echo ""
curl -s "$API_URL/upcoming?limit=3" | python3 -m json.tool
echo ""
echo ""

# Test 4: POST /api/v1/meals/swap
echo "4️⃣  Test swapMeal - Échanger un repas"
echo "   Devrait:"
echo "   1. Récupérer le repas actuel (findById)"
echo "   2. Obtenir une recette alternative (findRandomByMealType)"
echo "   3. Mettre à jour le repas (update)"
echo ""
curl -s -X POST "$API_URL/swap" \
  -H "Content-Type: application/json" \
  -d '{"mealId":"meal-123"}' | python3 -m json.tool
echo ""
echo ""

# Test 5: PUT /api/v1/meals/:id/cook
echo "5️⃣  Test markAsCooked - Marquer comme cuisiné"
echo "   Devrait appeler mealRepository.update()"
echo "   Avec cooked: true et cooked_at: Date"
echo ""
curl -s -X PUT "$API_URL/meal-456/cook" | python3 -m json.tool
echo ""
echo ""

echo "✅ Tests terminés !"
echo ""
echo "Vérifiez dans les logs du serveur les lignes [Mock] qui montrent"
echo "les appels aux repositories avec leurs paramètres."
