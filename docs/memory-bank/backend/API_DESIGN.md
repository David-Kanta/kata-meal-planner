# API Design - REST Endpoints Structure

## Overview

This document defines the REST API contract structure for the Meal Planner application. The API follows RESTful principles with resource-based URLs, standard HTTP methods, and JSON request/response formats.

## Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: TBD (HTTPS will be configured)

## API Versioning

- **Current Version**: v1 (implicit, no version prefix)
- **Future**: `/api/v2/` when breaking changes are introduced

## Resource Naming Conventions

- Use plural nouns for resource names: `/api/recipes`, `/api/meal-plans`
- Use kebab-case for multi-word resources: `/api/meal-plans`, `/api/shopping-lists`
- Use nested resources for related entities: `/api/meal-plans/{id}/meals`

## Standard HTTP Methods

- **GET**: Retrieve resource(s)
- **POST**: Create new resource
- **PUT**: Replace entire resource (idempotent)
- **PATCH**: Partial update of resource
- **DELETE**: Remove resource

## Standard Status Codes

- **200 OK**: Successful GET, PUT, PATCH requests
- **201 Created**: Successful POST request
- **204 No Content**: Successful DELETE request
- **400 Bad Request**: Invalid request data
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

## Common Query Parameters

### Pagination
- `page`: Page number (default: 1)
- `pageSize`: Items per page (default: 20, max: 100)

### Filtering
- `filter`: Filter criteria (resource-specific)
- `sort`: Sort field and direction (e.g., `name:asc`, `createdAt:desc`)

### Examples
```
GET /api/recipes?page=1&pageSize=10&sort=name:asc&filter=mealType:breakfast
```

## Endpoint Structure

### 1. Health & System

#### GET /api/health
Health check endpoint (already implemented)
- **Response**: `{ "status": "healthy", "timestamp": "2024-..." }`
- **Status**: 200 OK

---

### 2. Recipes

#### GET /api/recipes
Get list of recipes with optional filtering
- **Query Parameters**:
  - `mealType`: Filter by meal type (breakfast, lunch, dinner, snack)
  - `dietaryPreference`: Filter by dietary preference (vegetarian, vegan, keto, etc.)
  - `allergies`: Exclude recipes with specified allergies (comma-separated)
  - `search`: Search in recipe name and description
  - `page`, `pageSize`: Pagination
  - `sort`: Sort field (name, createdAt, prepTime)
- **Response**: `{ "items": [...], "totalCount": 100, "page": 1, "pageSize": 20 }`
- **Status**: 200 OK

#### GET /api/recipes/{id}
Get single recipe by ID
- **Response**: `{ "id": "...", "name": "...", "description": "...", ... }`
- **Status**: 200 OK, 404 Not Found

#### POST /api/recipes
Create new recipe
- **Request Body**: `{ "name": "...", "description": "...", "mealType": "...", ... }`
- **Response**: `{ "id": "...", ... }` (created recipe)
- **Status**: 201 Created, 400 Bad Request

#### PUT /api/recipes/{id}
Replace entire recipe
- **Request Body**: `{ "name": "...", ... }` (full recipe object)
- **Response**: `{ "id": "...", ... }` (updated recipe)
- **Status**: 200 OK, 404 Not Found, 400 Bad Request

#### PATCH /api/recipes/{id}
Partially update recipe
- **Request Body**: `{ "name": "..." }` (partial recipe object)
- **Response**: `{ "id": "...", ... }` (updated recipe)
- **Status**: 200 OK, 404 Not Found, 400 Bad Request

#### DELETE /api/recipes/{id}
Delete recipe
- **Response**: No content
- **Status**: 204 No Content, 404 Not Found

---

### 3. Meal Plans

#### GET /api/meal-plans
Get list of meal plans
- **Query Parameters**:
  - `startDate`: Filter by start date (ISO 8601)
  - `endDate`: Filter by end date (ISO 8601)
  - `page`, `pageSize`: Pagination
- **Response**: `{ "items": [...], "totalCount": 10, "page": 1, "pageSize": 20 }`
- **Status**: 200 OK

#### GET /api/meal-plans/{id}
Get single meal plan by ID
- **Response**: `{ "id": "...", "startDate": "...", "endDate": "...", "meals": [...] }`
- **Status**: 200 OK, 404 Not Found

#### GET /api/meal-plans/current
Get current active meal plan
- **Response**: `{ "id": "...", "startDate": "...", "endDate": "...", "meals": [...] }`
- **Status**: 200 OK, 404 Not Found

#### POST /api/meal-plans
Create new meal plan
- **Request Body**: `{ "startDate": "...", "endDate": "...", "meals": [...] }`
- **Response**: `{ "id": "...", ... }` (created meal plan)
- **Status**: 201 Created, 400 Bad Request

#### PUT /api/meal-plans/{id}
Replace entire meal plan
- **Request Body**: `{ "startDate": "...", "endDate": "...", "meals": [...] }`
- **Response**: `{ "id": "...", ... }` (updated meal plan)
- **Status**: 200 OK, 404 Not Found, 400 Bad Request

#### DELETE /api/meal-plans/{id}
Delete meal plan
- **Response**: No content
- **Status**: 204 No Content, 404 Not Found

#### POST /api/meal-plans/{id}/meals
Add meal to meal plan
- **Request Body**: `{ "date": "...", "mealType": "...", "recipeId": "..." }`
- **Response**: `{ "id": "...", ... }` (created meal)
- **Status**: 201 Created, 400 Bad Request, 404 Not Found

#### DELETE /api/meal-plans/{planId}/meals/{mealId}
Remove meal from meal plan
- **Response**: No content
- **Status**: 204 No Content, 404 Not Found

#### PUT /api/meal-plans/{planId}/meals/{mealId}/swap
Swap meal with another recipe
- **Request Body**: `{ "recipeId": "..." }`
- **Response**: `{ "id": "...", ... }` (updated meal)
- **Status**: 200 OK, 404 Not Found, 400 Bad Request

---

### 4. Shopping Lists

#### GET /api/shopping-lists
Get list of shopping lists
- **Query Parameters**:
  - `mealPlanId`: Filter by meal plan ID
  - `page`, `pageSize`: Pagination
- **Response**: `{ "items": [...], "totalCount": 5, "page": 1, "pageSize": 20 }`
- **Status**: 200 OK

#### GET /api/shopping-lists/{id}
Get single shopping list by ID
- **Response**: `{ "id": "...", "mealPlanId": "...", "items": [...], "organizedByCategory": {...} }`
- **Status**: 200 OK, 404 Not Found

#### GET /api/shopping-lists/current
Get current active shopping list
- **Response**: `{ "id": "...", "mealPlanId": "...", "items": [...] }`
- **Status**: 200 OK, 404 Not Found

#### POST /api/shopping-lists
Generate shopping list from meal plan
- **Request Body**: `{ "mealPlanId": "..." }`
- **Response**: `{ "id": "...", ... }` (generated shopping list)
- **Status**: 201 Created, 400 Bad Request, 404 Not Found

#### PATCH /api/shopping-lists/{id}/items/{itemId}
Update shopping list item (mark as purchased, update quantity)
- **Request Body**: `{ "purchased": true }` or `{ "quantity": 2 }`
- **Response**: `{ "id": "...", ... }` (updated item)
- **Status**: 200 OK, 404 Not Found, 400 Bad Request

#### DELETE /api/shopping-lists/{id}
Delete shopping list
- **Response**: No content
- **Status**: 204 No Content, 404 Not Found

---

### 5. Settings / User Preferences

#### GET /api/settings
Get user settings/preferences
- **Response**: `{ "dietaryPreference": "...", "allergies": [...], "mealsPerDay": 3, ... }`
- **Status**: 200 OK

#### PUT /api/settings
Update user settings
- **Request Body**: `{ "dietaryPreference": "...", "allergies": [...], "mealsPerDay": 3, ... }`
- **Response**: `{ "dietaryPreference": "...", ... }` (updated settings)
- **Status**: 200 OK, 400 Bad Request

---

## Request/Response Formats

### Standard Request Headers
```
Content-Type: application/json
Accept: application/json
```

### Standard Response Headers
```
Content-Type: application/json
```

### Error Response Format
```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Recipe with ID '123' was not found.",
    "details": {}
  }
}
```

### Pagination Response Format
```json
{
  "items": [...],
  "totalCount": 100,
  "page": 1,
  "pageSize": 20,
  "totalPages": 5
}
```

## Implementation Notes

- All endpoints will be implemented in ASP.NET Core controllers
- Controllers will be located in `backend/Controllers/`
- Request/response DTOs will be defined as needed
- Validation will be handled using Data Annotations or FluentValidation
- Swagger/OpenAPI documentation will be auto-generated from controllers

## Future Considerations

- Authentication/Authorization endpoints (when user management is added)
- Recipe import/export endpoints
- Meal plan templates/sharing
- Recipe favorites/bookmarks
- Ingredient management endpoints

