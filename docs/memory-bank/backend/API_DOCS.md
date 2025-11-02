# API Documentation

## Authentication & Authorization

- **Authentication**: Not implemented yet (deferred for MVP)
- **Authorization**: Not implemented yet
- **Session Management**: Not implemented yet

## API Design

- **Design Document**: @docs/memory-bank/backend/API_DESIGN.md - Complete REST API contract structure
- **Endpoints file**: @backend/Controllers/ - Controller-based API structure
- **Base URL**: `http://localhost:5000/api` - Development server
- **Versioning**: v1 (implicit, no version prefix)
- **Format**: REST - JSON request/response
- **Protocol**: HTTP - HTTPS to be configured for production

## Request/Response Formats

- **Request format**: JSON - Content-Type: application/json
- **Response format**: JSON - Standard ASP.NET Core JSON serialization
- **Error format**: `{ "error": { "code": "...", "message": "...", "details": {} } }`
- **Pagination format**: `{ "items": [...], "totalCount": 100, "page": 1, "pageSize": 20, "totalPages": 5 }`

## API Resource Structure

The API follows RESTful principles with the following main resource groups:

### 1. Health & System
- **GET /api/health** - Health check endpoint (implemented)
  - Response: `{ "status": "healthy", "timestamp": "2024-..." }`
  - Status: 200 OK

### 2. Recipes
- **GET /api/recipes** - List recipes with filtering/pagination
- **GET /api/recipes/{id}** - Get single recipe
- **POST /api/recipes** - Create recipe
- **PUT /api/recipes/{id}** - Replace recipe
- **PATCH /api/recipes/{id}** - Update recipe partially
- **DELETE /api/recipes/{id}** - Delete recipe

### 3. Meal Plans
- **GET /api/meal-plans** - List meal plans
- **GET /api/meal-plans/{id}** - Get single meal plan
- **GET /api/meal-plans/current** - Get current active meal plan
- **POST /api/meal-plans** - Create meal plan
- **PUT /api/meal-plans/{id}** - Replace meal plan
- **DELETE /api/meal-plans/{id}** - Delete meal plan
- **POST /api/meal-plans/{id}/meals** - Add meal to plan
- **DELETE /api/meal-plans/{planId}/meals/{mealId}** - Remove meal from plan
- **PUT /api/meal-plans/{planId}/meals/{mealId}/swap** - Swap meal with another recipe

### 4. Shopping Lists
- **GET /api/shopping-lists** - List shopping lists
- **GET /api/shopping-lists/{id}** - Get single shopping list
- **GET /api/shopping-lists/current** - Get current active shopping list
- **POST /api/shopping-lists** - Generate shopping list from meal plan
- **PATCH /api/shopping-lists/{id}/items/{itemId}** - Update shopping list item
- **DELETE /api/shopping-lists/{id}** - Delete shopping list

### 5. Settings / User Preferences
- **GET /api/settings** - Get user settings
- **PUT /api/settings** - Update user settings

## Common Query Parameters

- **Pagination**: `page`, `pageSize` (default: page=1, pageSize=20, max: 100)
- **Sorting**: `sort` (e.g., `name:asc`, `createdAt:desc`)
- **Filtering**: Resource-specific filters (see API_DESIGN.md for details)

## CORS Configuration

- **Policy**: AllowAngularApp - Configured in @backend/Program.cs
- **Allowed Origins**: `http://localhost:4200` - Angular dev server
- **Allowed Methods**: All methods
- **Allowed Headers**: All headers

## Implementation Status

- ✅ API contract structure designed (see API_DESIGN.md)
- ✅ Health endpoint implemented
- ⏳ Other endpoints to be implemented as features are developed
