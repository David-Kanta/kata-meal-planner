#!/bin/bash

# Script de test des endpoints API MealPlanner

BASE_URL="http://localhost:3000"
API_URL="$BASE_URL/api/v1/meals"

echo "🧪 Test des endpoints API MealPlanner"
echo "======================================"
echo ""

# Test 1: GET /api/v1/meals/daily (sans paramètre)
echo "1️⃣  GET /api/v1/meals/daily (date du jour)"
curl -s "$API_URL/daily" | python3 -m json.tool
echo ""
echo ""

# Test 2: GET /api/v1/meals/daily (avec date)
echo "2️⃣  GET /api/v1/meals/daily?date=2025-11-10"
curl -s "$API_URL/daily?date=2025-11-10" | python3 -m json.tool
echo ""
echo ""

# Test 3: GET /api/v1/meals/weekly
echo "3️⃣  GET /api/v1/meals/weekly"
curl -s "$API_URL/weekly" | python3 -m json.tool
echo ""
echo ""

# Test 4: GET /api/v1/meals/upcoming
echo "4️⃣  GET /api/v1/meals/upcoming"
curl -s "$API_URL/upcoming" | python3 -m json.tool
echo ""
echo ""

# Test 5: GET /api/v1/meals/upcoming?limit=3
echo "5️⃣  GET /api/v1/meals/upcoming?limit=3"
curl -s "$API_URL/upcoming?limit=3" | python3 -m json.tool
echo ""
echo ""

# Test 6: POST /api/v1/meals/swap
echo "6️⃣  POST /api/v1/meals/swap"
curl -s -X POST "$API_URL/swap" \
  -H "Content-Type: application/json" \
  -d '{"mealId":"meal-123"}' | python3 -m json.tool
echo ""
echo ""

# Test 7: PUT /api/v1/meals/:id/cook
echo "7️⃣  PUT /api/v1/meals/meal-456/cook"
curl -s -X PUT "$API_URL/meal-456/cook" | python3 -m json.tool
echo ""
echo ""

echo "✅ Tests terminés !"
