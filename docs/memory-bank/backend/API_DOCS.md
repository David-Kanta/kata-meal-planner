# API Documentation

## Authentication & Authorization

- **Authentication**: Not implemented yet (deferred for MVP)
- **Authorization**: Not implemented yet
- **Session Management**: Not implemented yet

## Endpoints

- Endpoints file: @backend/Controllers/ - Controller-based API structure
- Base URL: `http://localhost:5000/api` - Development server
- Versioning: Not implemented yet
- Format: REST - JSON request/response
- Protocol: HTTP - HTTPS to be configured for production

## Request/Response Formats

- Request format: JSON - Content-Type: application/json
- Response format: JSON - Standard ASP.NET Core JSON serialization

## Available Endpoints

- **GET /api/health** - Health check endpoint
  - Response: `{ "status": "healthy", "timestamp": "2024-..." }`
  - Status: 200 OK

## CORS Configuration

- **Policy**: AllowAngularApp - Configured in @backend/Program.cs
- **Allowed Origins**: `http://localhost:4200` - Angular dev server
- **Allowed Methods**: All methods
- **Allowed Headers**: All headers
