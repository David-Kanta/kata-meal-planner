# Kata Meal Planner

A full-stack meal planning application built with Angular 20 frontend and ASP.NET Core 8 backend.

## Tech Stack

- **Frontend**: Angular 20 with Tailwind CSS
- **Backend**: ASP.NET Core 8 Web API
- **Database**: PostgreSQL 16 (via Docker)
- **Testing**: Playwright (E2E), xUnit + Testcontainers (Backend)

## Prerequisites

- Node.js v20.x+ (v24.6.0 tested)
- .NET SDK v8.0+ (v10.0.100-preview tested)
- Docker Desktop (for PostgreSQL)
- Git

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Conrardy/kata-meal-planner.git
cd kata-meal-planner
```

### 2. Start PostgreSQL Database

```bash
docker compose up -d postgres
```

Verify the container is running:

```bash
docker ps --filter "name=mealplanner-postgres"
```

### 3. Start Backend

```bash
cd backend
dotnet run
```

Backend API will be available at `http://localhost:5000`

### 4. Start Frontend

In a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend will be available at `http://localhost:4200`

### 5. Run Tests

**Backend Tests:**
```bash
cd backend.Tests
dotnet test
```

**Frontend E2E Tests:**
```bash
cd frontend
npx playwright test
```

## Project Structure

```
kata-meal-planner/
├── frontend/          # Angular 20 application
├── backend/           # ASP.NET Core 8 Web API
├── backend.Tests/     # Backend unit and integration tests
├── docs/             # Documentation
│   ├── SETUP_GUIDE.md    # Detailed setup guide
│   ├── DEVIATIONS.md      # Deviations from setup guide
│   └── plans/            # Implementation plans
└── docker-compose.yml # PostgreSQL container configuration
```

## API Endpoints

- `GET /api/health` - Health check endpoint

## Configuration

### Database Connection

Backend connection string is configured in `backend/appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=mealplanner_dev;Username=mealplanner;Password=mealplanner_dev_password"
  }
}
```

### Frontend API URL

Frontend API URL is configured in `frontend/src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

## Development

### Full Stack Development

For full-stack development with E2E tests, both servers must be running. Playwright E2E tests are configured to automatically start both servers.

### Database Migrations

When ready to add database migrations:

```bash
cd backend
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## Documentation

- [SETUP_GUIDE.md](docs/SETUP_GUIDE.md) - Detailed setup instructions
- [DEVIATIONS.md](docs/DEVIATIONS.md) - Deviations from setup guide
- [Tactical Work Graph](docs/plans/tactical-work-graph.md) - Implementation phases

## License

[Add your license here]
